<?php

namespace App\Soap\Repository;

use App\Entity\User;
use App\Entity\Vehicle;
use App\Soap\Client\DPSWebServiceClient;
use App\Soap\Transformer\TransformerContext;
use Sentry\SentryBundle\SentrySymfonyClient;
use SoapBundle\Events\SoapExceptionEvent;
use SoapBundle\Transformer\TransformerManager;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author svianney <vianney@widop.com>
 */
class UserRepository extends AbstractRepository
{
    /** @var null */
    private $sentry;

    /**
     * @param DPSWebServiceClient $factory
     * @param TransformerManager $transformer
     * @param SentrySymfonyClient $sentry
     */
    public function __construct(DPSWebServiceClient $factory, TransformerManager $transformer, $sentry = null)
    {
        parent::__construct($factory, $transformer);
        $this->sentry = $sentry;
    }

    /**
     * {@inheritdoc}
     */
    public function pull($object)
    {
        $vehicle = $object->getVehicles()->first();

        if (false === $vehicle) {
            $object = $this->pullVehicles($object);
            $vehicle = $object->getVehicles()->first();
        }

        $result = $this->request(RepositoryMethods::CLIENT_VEHICLE2, [
            'id_client' => $object->getExternalId(),
            'Vin' => $vehicle->getVin(),
        ]);

        if (false === $result) {
            throw new NotFoundHttpException();
        }

        $object = $this
            ->transformer
            ->reverseTransform(
                TransformerContext::USER_CREATE,
                $result->GetInfoContactVehicule2Result,
                User::class,
                $object
            );

        return $object;
    }

    /**
     * @param User $object
     *
     * @return User
     */
    public function pullByVinName(User $object)
    {
        $vehicle = $object->getVehicles()->first();
        if (false === $vehicle) {
            throw new \LogicException();
        }
        $result = $this->request(RepositoryMethods::CLIENT_VEHICLE, [
            'vin' => $vehicle->getVin(),
            'nom' => $object->getLastName(),
        ]);
        $object = $this
            ->transformer
            ->reverseTransform(
                TransformerContext::USER_CREATE_ALT,
                $result->getInformationsClientVehiculeResult,
                User::class,
                $object
            );
        if (false === $result) {
            throw new NotFoundHttpException();
        }
        return $object;
    }

    /**
     * @param User $user
     *
     * @return Vehicle[]
     */
    public function pullVehicles(User $user)
    {
        $result = $this->request(RepositoryMethods::VEHICLES_LIST, [
            'id_contact' => $user->getExternalId(),
        ]);

        $user = $this
            ->transformer
            ->reverseTransform(
                TransformerContext::PULL_USER_VEHICLES,
                $result->GetListVehiculeContactResult,
                User::class,
                $user
            );
        return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function push($object, $modified = [])
    {
        /** @var User $object */
        if (empty($modified)) {
            return;
        }
        $requestParams = $this
            ->transformer
            ->transform(
                TransformerContext::USER_CREATE,
                $object,
                $modified
            );

        $this->request(RepositoryMethods::SAVE_CLIENT, $requestParams);


        if ($this->jobHasToBePushed($object, $modified)) {
            $requestParams = $this
                ->transformer
                ->transform(
                    TransformerContext::JOB_UPDATE,
                    $object->getJob(),
                    $modified
                );
            $this->request(RepositoryMethods::UPDATE_CONTACT_ENTREPRISE, $requestParams);
        }
    }

    /**
     * @param      $object
     * @param bool $finalStep
     *
     * @return int
     */
    public function pushRegistrationStep($object, $finalStep = false)
    {
        $method = $finalStep ? RepositoryMethods::USER_REGISTRATION : RepositoryMethods::USER_PRE_REGISTRATION;
        $externalId = $object->getExternalId();
        $result = $this->request(
            $method,
            [
                'id_clientSZM' => $externalId,
                'date_inscription' => date(DATE_ATOM)
            ]
        );
        $code = $finalStep ? $result->Inscription_MysuzukiResult : $result->Preinscription_MysuzukiResult;
        if ((($finalStep && !in_array($code, [0, 2])) || (!$finalStep && $code !== 0)) && $this->sentry) {
            $message = "Error code $code using $method for user $externalId";
            $this->sentry->exception(new \Exception($message, $code));
        }
        return $code;
    }

    private function jobHasToBePushed(User $object, array $modified): bool
    {
        $job = $object->getJob();
        $organization = $job->getOrganization();

        return
            $organization->getName()
            && (
                (isset($modified['job.name']) && !empty($job->getName()))
                || (isset($modified['job.department']) && !empty($job->getDepartment()))
                || (isset($modified['lastName']) && !empty($object->getLastName()))
                || (isset($modified['firstName']) && !empty($object->getFirstName()))
                || (isset($modified['email']) && !empty($object->getEmail()))
                || (isset($modified['landlinePhone']))
            ) || (
                isset($modified['job.organization.name'])
                && empty($organization->getName())
            )
        ;
    }
}
