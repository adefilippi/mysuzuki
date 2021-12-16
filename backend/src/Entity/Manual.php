<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass = "App\Repository\VehicleFileRepository")
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class Manual extends VehicleFile
{
}
