<?php

namespace App\Soap\Transformer;

use App\Entity\Dealership;
use App\Entity\Maintenance;
use App\Entity\Vehicle;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class MaintenanceTransformer extends AbstractTransformer
{
    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return $class === Maintenance::class && $context === TransformerContext::MAINTENANCE;
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
        if (empty($data)) {
            return [];
        }

        /** @var Maintenance[] $maintenances */
        $maintenances = [];

        foreach ($data as $soapMaintenance) {
            /** @var Maintenance $maintenance */
            $maintenance = $this->getMaintenance($soapMaintenance->id_entretien, $extra);

            $maintenance->setDate(new \DateTime($soapMaintenance->date_entretien));

            $dealershipRepository = $this->registry->getManager()->getRepository(Dealership::class);

            $dealership = $dealershipRepository->findOneBy(['externalId' => $soapMaintenance->code_CE]);

            $maintenance->setPlace($dealership ? $dealership->getName() : null);
            $maintenance->setType($soapMaintenance->type_entretien);
            $maintenance->setVehicle($extra);
            $maintenance->setLocal(false);

            $maintenances[] = $maintenance;
        }

        return $maintenances;
    }

    /**
     * @param int     $externalId
     * @param Vehicle $vehicle
     *
     * @return Maintenance|null|object
     */
    public function getMaintenance(int $externalId, Vehicle $vehicle)
    {
        $maintenance =  $this->registry->getManager()->getRepository(Maintenance::class)->findOneBy(['externalId' => $externalId]);

        if ($maintenance === null) {
            $maintenance = new Maintenance();
            $maintenance->setExternalId($externalId);

            $this->registry->getManager()->persist($maintenance);

            $vehicle->addMaintenance($maintenance);
        }

        return $maintenance;
    }
}
