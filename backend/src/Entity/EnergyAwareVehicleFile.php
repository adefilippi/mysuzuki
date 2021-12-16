<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass = "App\Repository\EnergyAwareVehicleFileRepository")
 */
class EnergyAwareVehicleFile extends VehicleFile
{
    /**
     * @ORM\Column(type = "string", length = 255)
     */
    private $energy;


    public function getEnergy(): ?string
    {
        return $this->energy;
    }

    public function setEnergy(?string $energy)
    {
        $this->energy = $energy;

        return $this;
    }
}
