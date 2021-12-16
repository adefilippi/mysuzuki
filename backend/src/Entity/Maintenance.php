<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 *
 * @ApiResource(
 *      attributes     = {
 *          "pagination_enabled"      = false,
 *          "normalization_context"   = {"groups" = {"m_read"}},
 *          "denormalization_context" = {"groups" = {"write"}},
 *      },
 *      itemOperations = {
 *          "get"    = {
 *              "access_control" = "object.getVehicle().getOwner() == user"
 *          },
 *          "put"    = {
 *              "access_control" = "object.getVehicle().getOwner() == user and object.isLocal() == true",
 *              "denormalization_context" = {"groups" = {"update"}}
 *          },
 *          "delete" = {
 *              "access_control" = "object.getVehicle().getOwner() == user and object.isLocal() == true"
 *          },
 *      },
 *      collectionOperations = {
 *          "get"  = {
 *              "access_control" = "is_granted('ROLE_SUPER_ADMIN')"
 *          },
 *          "post" = {
 *              "access_control" = "is_granted('ROLE_USER')"
 *          },
 *      }
 * )
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class Maintenance
{
    /**
     * @ApiSubresource
     * @var int
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(type = "integer", unique = true, nullable = true)
     */
    private $externalId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     *
     * @Assert\DateTime(format = "Y-m-d\TH:i:sP", message = "maintenance.date.format")
     *
     * @Groups({"m_read", "write", "update"})
     */
    private $date;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\NotBlank(message = "maintenance.type.not_blank")
     *
     * @Groups({"m_read", "write", "update"})
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\NotBlank(message = "maintenance.place.not_blank")
     *
     * @Groups({"m_read", "write", "update"})
     */
    private $place;

    /**
     * @var Vehicle
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\Vehicle", inversedBy = "maintenances")
     *
     * @Assert\NotBlank
     *
     * @Groups({"m_read", "write"})
     */
    private $vehicle;

    /**
     * @var bool
     *
     * @ORM\Column(type = "boolean")
     *
     * @Groups({"m_read"})
     */
    private $local = true;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param \DateTime $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return string
     */
    public function getPlace()
    {
        return $this->place;
    }

    /**
     * @param string $place
     */
    public function setPlace($place)
    {
        $this->place = $place;
    }

    /**
     * @return Vehicle
     */
    public function getVehicle()
    {
        return $this->vehicle;
    }

    /**
     * @param Vehicle $vehicule
     */
    public function setVehicle($vehicle)
    {
        $this->vehicle = $vehicle;
    }

    /**
     * @return int
     */
    public function getExternalId()
    {
        return $this->externalId;
    }

    /**
     * @param int $externalId
     */
    public function setExternalId($externalId)
    {
        $this->externalId = $externalId;
    }

    /**
     * @return bool
     */
    public function isLocal()
    {
        return $this->local;
    }

    /**
     * @param bool $local
     */
    public function setLocal($local)
    {
        $this->local = $local;
    }
}
