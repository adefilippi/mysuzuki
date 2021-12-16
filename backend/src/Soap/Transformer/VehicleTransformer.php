<?php

namespace App\Soap\Transformer;

use App\Entity\Dealership;
use App\Entity\Vehicle;
use App\Entity\VehicleType;

/**
 * @author svianney <vianney@widop.com>
 */
class VehicleTransformer extends AbstractTransformer
{
    const DEFAULT_NAME = 'MODÈLE NON CONNU';

    private static $mapping = [
        'mileage'            => 'kilometrage',
        'registrationNumber' => 'immatriculation',
        'purchaseDate'       => 'date_achat_vehicule',
    ];

    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return
            Vehicle::class === $class &&
            in_array(
                $context,
                [
                    TransformerContext::USER_CREATE,
                    TransformerContext::VEHICLE_UPDATE,
                    TransformerContext::PULL_USER_VEHICLES
                ]
            )
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function transform($model, $modified = [])
    {
        $modified = array_values(array_intersect_key(self::$mapping, array_flip(array_keys($modified))));

        /** @var Vehicle $model */
        $owner = $model->getOwner();

        return [
            'vehicule'  => [
                'champs_modifies'     => $modified,
                'kilometrage'         => $model->getMileage(),
                'code_vin'            => $model->getVin(),
                'date_achat_vehicule' => $model->getPurchaseDate()->format(DATE_ATOM),
            ],
            'nom'       => $owner->getLastName(),
            'id_client' => $owner->getExternalId(),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($data, $vehicle = null)
    {
        if (null === $vehicle) {
            $vehicle = new Vehicle();
        }

        if (isset($data->date_achat_vehicule)) {
            $vehicle->setPurchaseDate(new \DateTime($data->date_achat_vehicule));
        }

        if (!empty($data->date_premiere_immat)) {
            $vehicle->setRegistrationDate(new \DateTime($data->date_premiere_immat));
        }

        if (isset($data->libelle_court_gamme)) {
            /** @var VehicleType $model */
            $model = $this->registry->getManager()
                ->getRepository(VehicleType::class)
                ->findOneByShortLabel($data->libelle_court_gamme);
        }

        $purchaseDealershipId = isset($data->id_conc_orig_vehicule)
            ? str_replace(' ', 'A', $data->id_conc_orig_vehicule)
            : null
        ;

        if ($purchaseDealershipId) {
            $purchaseDealership = $this->registry->getManager()
                ->getRepository(Dealership::class)
                ->findOneByExternalId($purchaseDealershipId)
            ;
            $vehicle->setPurchaseDealership($purchaseDealership);
        }

        $vehicle->setVin($data->code_vin);
        $vehicle->setMileage($data->kilometrage ?? 0);
        $vehicle->setColor($data->libelle_couleur ?? null);
        $vehicle->setPurchaseType($data->type_achat ?? null);
        $vehicle->setEnergy($data->energie ?? null);
        $vehicle->setOriginalModel($data->libelle_court_gamme ?? null);
        $vehicle->setModel(
            !empty($model) ? $model->getDisplayLabel()
                : (!empty($data->libelle_court_gamme) ? $data->libelle_court_gamme
                : (!empty($data->libelle_gamme) ? $data->libelle_gamme : self::DEFAULT_NAME)
            )
        );
        $vehicle->setRegistrationNumber($data->immatriculation ?? null);

        return $vehicle;
    }
}
