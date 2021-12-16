<?php

namespace App\Entity\Embed;

use App\Entity\Embed\Naf;
use App\Entity\StaffSize;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Embeddable
 */
class Organization
{
    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\Length(max = 32, maxMessage = "user.organization.name.max_length")
     *
     * @Groups({"read", "update"})
     */
    private $name;

    /**
     * @var int
     *
     * @ORM\Column(type = "integer", nullable = true)
     *
     * @Groups({"read", "update"})
     */
    private $size;

    /**
     * @var int
     *
     * @ORM\Column(type = "integer", nullable = true)
     *
     * @Assert\Length(max = 32, maxMessage = "user.organization.number_vehicles.max_length")
     *
     * @Groups({"read", "update"})
     */
    private $numberOfVehicles;

    /**
     * @var Naf
     *
     * @ORM\Embedded(class = "App\Entity\Embed\Naf")
     *
     * @Groups({"read", "update"})
     */
    private $naf;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true, length = 20)
     *
     * @Assert\Length(max = 14, maxMessage = "user.organization.siret.max_length")
     *
     * @Groups({"read", "update"})
     */
    private $siret;

    /**
     * @var array
     *
     * @ORM\Column(type = "json", nullable = true)
     */
    private $contacts = [];

    public function __construct()
    {
        $this->naf = new Naf();
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return int
     */
    public function getSize() : ?int
    {
        return $this->size;
    }

    /**
     * @param int $size
     */
    public function setSize(int $size = null)
    {
        $this->size = $size;
    }

    /**
     * @return int
     */
    public function getNumberOfVehicles()
    {
        return $this->numberOfVehicles;
    }

    /**
     * @param int $numberOfVehicles
     */
    public function setNumberOfVehicles($numberOfVehicles)
    {
        $this->numberOfVehicles = $numberOfVehicles;
    }

    /**
     * @return Naf
     */
    public function getNaf()
    {
        return $this->naf;
    }

    /**
     * @param Naf $naf
     */
    public function setNaf(Naf $naf)
    {
        $this->naf = $naf;
    }

    /**
     * @return array
     */
    public function getContacts()
    {
        return $this->contacts;
    }

    /**
     * @param array $contacts
     */
    public function setContacts($contacts)
    {
        $this->contacts = $contacts;
    }

    /**
     * @return string
     */
    public function getSiret()
    {
        return $this->siret;
    }

    /**
     * @param string $siret
     */
    public function setSiret($siret)
    {
        $this->siret = $siret;
    }
}
