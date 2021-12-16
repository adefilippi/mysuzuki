<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass = "App\Repository\EnergyAwareVehicleFileRepository")
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class AccessoriesLink extends EnergyAwareVehicleFile
{
}
