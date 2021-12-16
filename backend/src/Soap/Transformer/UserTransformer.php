<?php

namespace App\Soap\Transformer;

use App\Entity\Dealership;
use App\Entity\Embed\Job;
use App\Entity\User;
use App\Entity\Vehicle;
use Doctrine\Common\Collections\Criteria;
use libphonenumber\PhoneNumberUtil;

/**
 * @author svianney <vianney@widop.com>
 */
class UserTransformer extends AbstractTransformer
{
    private static $mapping = [
        'civ'                               => 'civ1',
        'firstName'                         => 'prenom1',
        'address.additional1'               => 'adresse',
        'address.additional2'               => 'adresse',
        'address.street'                    => 'adresse',
        'address.zipCode'                   => 'adresse',
        'address.city'                      => 'adresse',
        'landlinePhone'                     => 'tel',
        'mobilePhone'                       => 'mobile',
        'email'                             => 'email1',
        'dateOfBirth'                       => 'date_naissance1',
        'optin.email'                       => 'optin_email1',
        'optin.sms'                         => 'optin_SMS',
        'job.organization.naf.label'        => 'libelle_APE',
        'job.organization.naf.code'         => 'APE',
        'job.organization.size'             => 'id_tranche_effectif',
        'job.organization.numberOfVehicles' => 'nombre_vehicules_flotte',
        'job.organization.name'             => 'raison_sociale2',
        'job.organization.siret'            => 'siret',
        'dealership'                        => 'code_ce_decla'
    ];

    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return
            User::class === $class
            && in_array($context,[TransformerContext::USER_CREATE, TransformerContext::USER_UPDATE])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function transform($user, $modified = [])
    {
        $modified = array_values(array_intersect_key(self::$mapping, array_flip(array_keys($modified))));

        /** @var User $user */
        $address = $user->getAddress();
        $job = $user->getJob();
        $organization = $job->getOrganization();
        $naf = $organization->getNaf();
        $dealership = $user->getDealership();

        if (in_array('optin_SMS', $modified) && !in_array('mobile', $modified)) {
            $modified[] = 'mobile';
        }

        if (in_array('optin_email1', $modified) && !in_array('email1', $modified)) {
            $modified[] = 'email1';
        }

        if (in_array('tel', $modified)) {
            $modified[] = 'demarchage_tel';
        }

        if (in_array('mobile', $modified)) {
            $modified[] = 'demarchage_mobile';
        }

        $modified[] = 'optin_fid_email1';

        return [
            'client3'            => [
                'champs_modifies'         => array_unique($modified),
                'id_client'               => $user->getExternalId(),
                'adr3'                    => $address->getAdditional1(),
                'adr4'                    => $address->getStreet(),
                'adr5'                    => $address->getAdditional2(),
                'civ1'                    => $user->getCiv(),
                'nom'                     => $user->getLastName(),
                'prenom1'                 => $user->getFirstName(),
                'code_postal'             => $address->getZipCode(),
                'ville'                   => $address->getCity(),
                'tel'                     => $user->getNationalLandlinePhone(),
                'mobile'                  => $user->getNationalMobilePhone(),
                'email1'                  => $user->getEmail(),
                'date_naissance1'         => $user->getDateOfBirth() ? $user->getDateOfBirth()->format('Y-m-d') : null,
                'demarchage_tel'          => empty($user->getLandlinePhone()) ? '' : true,
                'demarchage_mobile'       => empty($user->getMobilePhone()) ? '' : true,
                'optin_email1'            => $user->getOptin()->isEmail(),
                'optin_email2'            => false,
                'optin_SMS'               => $user->getOptin()->isSms(),
                'libelle_APE'             => $naf->getLabel(),
                'APE'                     => $naf->getCode(),
                'id_tranche_effectif'     => $organization->getSize(),
                'nombre_vehicules_flotte' => $organization->getNumberOfVehicles(),
                'raison_sociale2'         => $organization->getName(),
                'siret'                   => $organization->getSiret(),
                'code_ce_decla'           => empty($dealership) ? '' : $dealership->getExternalId(),
                'optin_fid_email1'        => 1,
            ],
            'source'            => AbstractTransformer::SOURCE_ID,
            'date_modification' => date(DATE_ATOM)
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($data, $user = null)
    {
        if (!$user instanceof User) {
            $user = new User();
        }

        $client = $data->contact2;

        $user->setExternalId($client->id_client);
        $user->setFirstName($client->prenom ?? null);
        $user->setCiv($client->civ ?? null);
        $user->setLastName($client->nom);
        $user->setEmail($client->email);

        $util = PhoneNumberUtil::getInstance();

        if (isset($client->tel)) {
            $user->setLandlinePhone($util->parse($client->tel,'FR'));
        }

        if (isset($client->mobile)) {
            $user->setMobilePhone($util->parse($client->mobile,'FR'));
        }

        if (!empty($client->date_naissance)) {
            $user->setDateOfBirth(new \DateTime($client->date_naissance));
        }

        $address = $user->getAddress();
        $address->setStreet($client->adr4 ?? null);
        $address->setAdditional1($client->adr3 ?? null);
        $address->setAdditional2($client->adr5 ?? null);
        $address->setStreet($client->adr4 ?? null);
        $address->setZipCode($client->code_postal ?? null);
        $address->setCity($client->ville ?? null);

        $this->transformer->reverseTransform(TransformerContext::USER_CREATE, $client, Job::class, $user->getJob());

        $externalId = $client->code_ce_decla ?? $client->Code_CE ?? null;

        if (!empty($externalId)) {
            $dealership = $this->registry
                ->getManager()
                ->getRepository(Dealership::class)
                ->findOneByExternalId($externalId)
            ;
            $user->setDealership($dealership);
        }

        $optin = $user->getOptin();
        $optin->setEmail($client->optin_email ?? false);
        $optin->setSms($client->optin_SMS ?? false);

        $this->syncUserVehicle($user, $data->vehicule_simple);

        return $user;
    }

    /**
     * @param User $user
     * @param $vehicle
     *
     * @return mixed
     */
    private function syncUserVehicle(User $user, $vehicle)
    {
        $userVehicles = $user->getVehicles();

        $userVehicle = $this
            ->registry->getManager()
            ->getRepository(Vehicle::class)
            ->findOneBy(['vin' => $vehicle->code_vin])
        ;

        if ($userVehicle instanceof Vehicle) {
            $criteria = Criteria::create()->where(Criteria::expr()->eq("vin", $vehicle->code_vin));
            $matchingVehicles = $userVehicles->matching($criteria);

            if ($matchingVehicles->count() > 0) {
                $user->removeVehicle($matchingVehicles->first());
            }

            $user->addVehicle($userVehicle);
        } else {
            $criteria = Criteria::create()->where(Criteria::expr()->eq("vin", $vehicle->code_vin));
            $matchingVehicles = $userVehicles->matching($criteria);

            if ($matchingVehicles->count() > 0) {
                $userVehicle = $matchingVehicles->first();
            } else {
                $userVehicle = new Vehicle();
            }
        }

        return $this
            ->transformer
            ->reverseTransform(
                TransformerContext::USER_CREATE,
                $vehicle,
                Vehicle::class,
                $userVehicle
            )
        ;
    }
}
