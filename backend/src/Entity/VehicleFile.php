<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\Entity(repositoryClass = "App\Repository\VehicleFileRepository")
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class VehicleFile
{
    /**
     * @var integer
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     */
    private $path;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     */
    private $carLabel;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     */
    private $firstDate;

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getPath(): ?string
    {
        return $this->path;
    }

    /**
     * @param string $path
     */
    public function setPath(string $path): void
    {
        $this->path = $path;
    }

    /**
     * @return string
     */
    public function getCarLabel(): ?string
    {
        return $this->carLabel;
    }

    /**
     * @param string $carLabel
     */
    public function setCarLabel(string $carLabel): void
    {
        $this->carLabel = $carLabel;
    }

    /**
     * @return \DateTime
     */
    public function getFirstDate(): ?\DateTime
    {
        return $this->firstDate;
    }

    /**
     * @param \DateTime $firstDate
     */
    public function setFirstDate(\DateTime $firstDate): void
    {
        $this->firstDate = $firstDate;
    }
}
