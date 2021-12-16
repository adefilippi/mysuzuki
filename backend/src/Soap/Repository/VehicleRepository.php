<?php

namespace App\Soap\Repository;

use App\Entity\Maintenance;
use App\Entity\Vehicle;
use App\Soap\Transformer\TransformerContext;

/**
 * @author svianney <vianney@widop.com>
 */
class VehicleRepository extends AbstractRepository
{
    /**
     * @param Vehicle $object
     *
     * @return mixed
     */
    public function pullMaintenances(Vehicle $object)
    {
        $result = $this->request(RepositoryMethods::VEHICLE_MAINTENANCES, ['vin' => $object->getVin()]);

//        var_dump($result); die(1);

        $soapMaintenances = $result
            ->GetInformationEntretienVehiculeResult
            ->entretiens
        ;

        if (isset($soapMaintenances->Entretien)) {
            /** @var Maintenance[] $maintenances */
            $maintenances = $this
                ->transformer
                ->reverseTransform(
                    TransformerContext::MAINTENANCE,
                    $soapMaintenances->Entretien,
                    Maintenance::class,
                    $object
                )
            ;

            return $maintenances;
        }

        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function push($object, $modified = [])
    {
        if (empty($modified)) {
            return;
        }

        $requestParams = $this
            ->transformer
            ->transform(
                TransformerContext::VEHICLE_UPDATE,
                $object,
                $modified
            )
        ;

        $this->request(RepositoryMethods::SAVE_VEHICLE, $requestParams);
    }
}
