<?php

namespace App\Soap\Transformer;

use App\Entity\Dealership;
use App\Entity\Embed\CTA;
use App\Entity\Offer;
use App\Entity\AutomaticOffer;
use App\Entity\User;
use App\Enum\CTATypeEnum;
use App\Enum\TargetTypeEnum;
use App\Enum\OfferTypeEnum;
use App\Enum\SpecialOffersEnum;
use App\Serializer\Annotation\Files;
use App\Service\PDFGeneratorService;
use App\Soap\Mapping\OfferMapping;
use ApplicationSonataMediaBundle\Entity\Media;
use DateTime;
use Doctrine\Common\Persistence\ManagerRegistry;
use Exception;
use SoapBundle\Transformer\TransformerManager;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class OfferTransformer extends AbstractTransformer
{
    /** @var OfferMapping */
    private $offerMapping;
    /**@var PDFGeneratorService */
    private $pdfGeneratorService;

    /**
     * @param TransformerManager $transformer
     * @param ManagerRegistry $registry
     * @param OfferMapping $offerMapping
     * @param PDFGeneratorService $pdfGeneratorService
     */
    public function __construct(TransformerManager $transformer, ManagerRegistry $registry, OfferMapping $offerMapping, PDFGeneratorService $pdfGeneratorService)
    {
        parent::__construct($transformer, $registry);
        $this->offerMapping = $offerMapping;
        $this->pdfGeneratorService = $pdfGeneratorService;
    }

    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return $class === Offer::class && $context === TransformerContext::OFFER;
    }

    /**
     * {@inheritdoc}
     */
    public function transform($model, $extra = null)
    {
        return [];
    }

    /**
     * {@inheritdoc}
     * @throws Exception
     */
    public function reverseTransform($data, $extra = null)
    {
        if (empty($data)) {
            return [];
        }

        /** @var AutomaticOffer[] $offers */
        $offers = [];

        foreach ($data as $soapOffer) {
            /** @var AutomaticOffer $offer */
            $offer = $this->getOffer($soapOffer->id_br);

            switch ($soapOffer->libelle) {
                case SpecialOffersEnum::WELCOME_OFFER['label']:
                    $offer->setType(OfferTypeEnum::WELCOME);
                    break;
                case SpecialOffersEnum::AVANTAGE_OFFER['label']:
                    $offer->setType(OfferTypeEnum::AVANTAGE);
                    break;
                default:
                    $offer->setType(OfferTypeEnum::TARGETED);
                    break;
            }

            $offer->setLabel($soapOffer->libelle);

            $userRepository = $this->registry->getManager()->getRepository(User::class);

            /** @var User $user */
            $user = $userRepository->findOneBy(['externalId' => $soapOffer->id_client]);
            $offer->setUser($user);

            if (isset($soapOffer->code_sitedevente)) {
                $dealershipRepository = $this->registry->getManager()->getRepository(Dealership::class);

                /** @var Dealership $dealership */
                $dealership = $dealershipRepository->findOneBy(['externalId' => $soapOffer->code_sitedevente]);

                if (null !== $dealership) {
                    $offer->setDealership($dealership);
                }
            }

            $offer->setValue($soapOffer->valeur);
            $offer->setTargetType(TargetTypeEnum::FILTERED);
            $offer->setEndDate(new DateTime($soapOffer->date_expiration));
            $offer->setStartDate(new DateTime($soapOffer->date_creation));
            $offer->setUseDate(new DateTime($soapOffer->date_utilisation));
            $offer->setReductionType($soapOffer->type_reduction);
            $offer->setBarcode($soapOffer->CAB_BR);
            $this->putMediaAndTitle($offer);
            $this->putFile($offer);

            $offers[] = $offer;
        }
        $this->registry->getManager()->flush();

        return $offers;
    }

    /**
     * @param int $externalId
     *
     * @return AutomaticOffer|null|object
     */
    public function getOffer(int $externalId)
    {
        $offer =  $this->registry->getManager()->getRepository(Offer::class)->findOneBy(['externalId' => $externalId]);

        if ($offer === null) {
            $offer = new AutomaticOffer();
            $offer->setExternalId($externalId);

            $this->registry->getManager()->persist($offer);
        }

        return $offer;
    }

    public function putMediaAndTitle(Offer &$offer)
    {
        $mediaRepository = $this->registry->getRepository(Media::class);

        $offerLabel = $offer->getLabel();
        // Default values
        $title = $offerLabel;
        $mediaFileName = OfferMapping::MEDIA[OfferMapping::DEFAULT_MEDIA_KEY]['picture'];

        // Special offer case
        if (array_key_exists($offer->getType(), SpecialOffersEnum::toArray())) {
            $mediaFileName = SpecialOffersEnum::toArray()[$offer->getType()]['file_name'];
            $title = SpecialOffersEnum::toArray()[$offer->getType()]['label'];
        }
        // Generic cases, search a match
        else {
            foreach (OfferMapping::KEYWORDS as $key => $keywords) {
                foreach ($keywords as $keyword) {
                    $pos = stripos($offerLabel, $keyword);
                    if ($pos === false)
                        continue;

                    $title = OfferMapping::MEDIA[$key]['label'];
                    $mediaFileName = OfferMapping::MEDIA[$key]['picture'];
                    break 2;
                }
            }
        }

        // Apply title and media
        $offer->setTitle($title);
        /** @var Media $media */
        $media = $mediaRepository->findOneBy(['name' => $mediaFileName]);
        $offer->setMedia($media);
    }

    public function putFile(Offer &$offer)
    {
        if (null === $offer->getBarcode() || $offer->getFilePath()) {
            return;
        }
        $pdfName = $this->pdfGeneratorService->createPDF($offer);
        $offer->setFilePath($pdfName);
        $offer->setCta(new CTA(CTATypeEnum::FILE));
    }
}
