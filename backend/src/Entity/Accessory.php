<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass = "App\Repository\EnergyAwareVehicleFileRepository")
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class Accessory extends EnergyAwareVehicleFile
{
    /**
     * @ORM\Column(type = "string")
     */
    private $label;

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(?string $label): self
    {
        $this->label = $label;

        return $this;
    }
}
