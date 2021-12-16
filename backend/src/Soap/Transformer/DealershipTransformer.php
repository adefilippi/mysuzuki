<?php

namespace App\Soap\Transformer;

use App\Entity\Dealership;
use App\Entity\Embed\Address;
use App\Entity\Embed\Coordinates;
use Doctrine\Common\Persistence\ManagerRegistry;
use SoapBundle\Transformer\TransformerManager;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class DealershipTransformer extends AbstractTransformer
{
    /** @var string */
    private $dealershipBaseUrl;

    /**
     * @param TransformerManager $transformer
     * @param ManagerRegistry    $registry
     * @param string             $dealershipBaseUrl
     */
    public function __construct(TransformerManager $transformer, ManagerRegistry $registry, $dealershipBaseUrl)
    {
        parent::__construct($transformer, $registry);
        $this->dealershipBaseUrl = $dealershipBaseUrl;
    }


    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return $class === Dealership::class && $context === TransformerContext::DEALERSHIP;
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
     */
    public function reverseTransform($data, $extra = null)
    {
        $dealership = new Dealership();

        $dealership->setExternalId($data->code_CE);

        $dealership->setClosed(!empty($data->fermer));

        $dealership->setName($data->raison_sociale);

        $dealership->setMoreInformationUrl($this->generateURL($dealership->getExternalId()));

        $address = new Address();
        $address->setStreet(trim($data->adr4) ?? null);
        $address->setAdditional1(trim($data->adr3) ?? null);
        $address->setAdditional2(trim($data->adr5) ?? null);
        $address->setZipCode($data->code_postal ?? null);
        $address->setCity($data->ville ?? null);

        $dealership->setAddress($address);

        $dealership->setPhone($data->telephone ?? null);
        $dealership->setFax($data->fax ?? null);

        $dealership->setEmail($data->email ?? null);

        $coordinates = new Coordinates();
        $coordinates->setLatitude($data->GPS_Latitude ?? null);
        $coordinates->setLongitude($data->GPS_Longitude ?? null);

        $dealership->setCoordinates($coordinates);

        return $dealership;
    }

    /**
     * @param string $externalId
     *
     * @return string
     */
    private function generateURL($externalId)
    {
        return $this->dealershipBaseUrl;
    }
}
