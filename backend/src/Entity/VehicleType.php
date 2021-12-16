<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class VehicleType {

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
    private $shortLabel;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     */
    private $displayLabel;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getShortLabel(): ?string
    {
        return $this->shortLabel;
    }

    /**
     * @param string $shortLabel
     */
    public function setShortLabel(string $shortLabel): void
    {
        $this->shortLabel = $shortLabel;
    }

    /**
     * @return string
     */
    public function getDisplayLabel(): ?string
    {
        return $this->displayLabel;
    }

    /**
     * @param string $displayLabel
     */
    public function setDisplayLabel(string $displayLabel): void
    {
        $this->displayLabel = $displayLabel;
    }
}
