<?php

namespace App\Soap\Transformer;

use App\Entity\User;
use App\Entity\Vehicle;
use Doctrine\Common\Collections\Criteria;

/**
 * @author svianney <vianney@widop.com>
 */
class UserVehiclesTransformer extends AbstractTransformer
{
    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return User::class === $class && TransformerContext::PULL_USER_VEHICLES === $context;
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
    public function reverseTransform($data, $user = null)
    {
        if ($user === null) {
            $user = new User();
        }

        $user->setVehiclesUpdatedAt(new \DateTime());

        $userVehicles = [];

        foreach ($data->listVehiculeSuzuki->vehicule_Simple as $vehicle) {
            if (!empty($vehicle->date_vente)) {
                continue;
            }

            $userVehicle = $this->getVehicle($vehicle->code_vin, $user);

            $this
                ->transformer
                ->reverseTransform(
                    TransformerContext::PULL_USER_VEHICLES,
                    $vehicle,
                    Vehicle::class,
                    $userVehicle
                )
            ;

            $userVehicles[] = $userVehicle;
        }

        $user->setVehicles($userVehicles);

        return $user;
    }

    /**
     * @param $vin
     * @param User $user
     * @return Vehicle
     */
    private function getVehicle($vin, $user)
    {
        $userVehicles = $user->getVehicles();
        $criteria = Criteria::create()->where(Criteria::expr()->eq("vin", $vin));
        $matchingVehicles = $userVehicles->matching($criteria);

        if ($matchingVehicles->count() > 0) {
            return $matchingVehicles->first();
        }

        $vehicle = $this->registry->getManager()->getRepository(Vehicle::class)->findOneBy(['vin' => $vin]);

        if (!$vehicle instanceof Vehicle) {
            $vehicle = new Vehicle();
            $this->registry->getManager()->persist($vehicle);
        }

        $user->addVehicle($vehicle);

        return $vehicle;
    }
}
