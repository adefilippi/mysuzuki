<?php

namespace App\Controller;

use App\Entity\EmailConfirmationToken;
use App\Entity\Embed\Body;
use App\Entity\Embed\CTA;
use App\Entity\Offer;
use App\Entity\User;
use App\Entity\Vehicle;
use App\Mailer\Mailer;
use App\Manager\VehicleManager;
use App\Soap\Manager\ObjectManager;
use App\Soap\Repository\UserRepository;
use ApplicationSonataMediaBundle\Entity\Media;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @author svianney <vianney@widop.com>
 */
class EmailConfirmationTokenController extends Controller
{
    const FILE_NAME = 'welcome-offer-c1629a2b-b8af-485a-a5f6-5e2b94f041b3.jpg';
    const SONATA_CONTEXT =  'default';
    const SONATA_PROVIDER =  'sonata.media.provider.image';

    /** @var ObjectManager */
    private $soapManager;

    /** @var TranslatorInterface */
    private $translator;

    /** @var string */
    private $fileDir;

    /**
     * @param ObjectManager       $soapManager
     * @param TranslatorInterface $translator
     * @param string              $projectDir
     */
    public function __construct(ObjectManager $soapManager, TranslatorInterface $translator, $fileDir)
    {
        $this->soapManager = $soapManager;
        $this->translator = $translator;
        $this->fileDir = $fileDir;
    }

    /**
     * @Route(
     *     name     = "api_email_confirmation_token_get_item",
     *     path     = "/api/email-confirmation-tokens/{id}.{_format}",
     *     methods  = {"GET"},
     *     defaults = {
     *         "_format"                  = "jsonld",
     *         "_api_resource_class"      = EmailConfirmationToken::class,
     *         "_api_item_operation_name" = "get"
     *     }
     * )
     *
     * @param EmailConfirmationToken $data
     * @param Mailer $mailer
     *
     * @return EmailConfirmationToken
     */
    public function show(EmailConfirmationToken $data, Mailer $mailer)
    {
        if ($data->hasExpired()) {
            throw new BadRequestHttpException("The token has expired");
        }

        $em = $this->getDoctrine()->getManager();
        $data->expire();
        $user = $data->getUser();
        $user->setEnabled(true);
        $em->flush();
        $dateParams = $this->courtesyVisit($user);

        /** @var UserRepository $repo */
        $repo = $this->soapManager->getRepository(User::class);

        $code = $repo->pushRegistrationStep($user, true);

        $mailer->sendEmail(
            'account_activation',
            $user->getEmail(),
            [
                'CIV'        => User::getCivsLabel()[$user->getCiv()],
                'NOM'        => $user->getLastName(),
                'LOGIN'      => $user->getEmail(),
            ],
            [
                'content' => [
                    1 => $dateParams ? $this->renderView(
                        'mail/signup_confirmation_courtesy.html.twig', $dateParams
                    ) : ''
                ]
            ]
        );

        return $data;
    }

    /**
     * @param User $user
     *
     * @return array|null
     */
    private function courtesyVisit(User $user)
    {
        $vehicles = $user->getVehicles();

        foreach ($vehicles as $vehicle) {
            if (
                $vehicle->getPurchaseType() === Vehicle::TYPE_NEW
                && $vehicle->getNextImportantDateType() === VehicleManager::COURTESY
            ) {
                return [
                    'date'  => $vehicle->getNextImportantDate(),
                    'model' => $vehicle->getModel(),
                ];
            }
        }

        return null;
    }
}
