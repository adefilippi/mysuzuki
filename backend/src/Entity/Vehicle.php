<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Entity\Traits\PushableTrait;
use App\Serializer\Annotation\Files;
use App\Soap\Annotation\SoapRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Entity
 *
 * @ApiResource(
 *     attributes           = {
 *         "normalization_context"   = {"groups" = {"v_read"}},
 *         "denormalization_context" = {"groups" = {"write"}},
 *         "access_control"          = "is_granted('ROLE_USER_NOT_ENABLED')"
 *     },
 *     collectionOperations = {
 *          "get" = {
 *              "route_name"     = "api_vehicles_get_collection",
 *          },
 *     },
 *     itemOperations       = {
 *          "get" = {
 *              "access_control" = "object.getOwner() == user"
 *          },
 *          "put" = {
 *              "route_name"     = "api_vehicles_put_item",
 *              "access_control" = "object.getOwner() == user"
 *          },
 *     },
 *)
 *
 * @Files(imageFields = {"picture", "logo", "accessories"}, fileFields = {"manual", "maintenanceProgram"})
 *
 * @SoapRepository(repositoryClass = "App\Soap\Repository\VehicleRepository")
 *
 * @ORM\HasLifecycleCallbacks
 */
class Vehicle
{
    const TYPE_NEW = 'VN';
    const TYPE_OLD = 'VO';

    use PushableTrait;

    /**
     * @var int
     *
     * @ApiProperty(identifier = false)
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     * @ORM\Column(type = "integer")
     */
    protected $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime")
     */
    private $updatedAt;

    /**
     * @var string
     *
     * @ApiProperty(identifier = true)
     *
     * @ORM\Column(type = "string", unique = true)
     *
     * @Groups({"v_read", "user_create"})
     */
    protected $vin;

    /**
     * @var \DateTime
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "datetime", nullable = true)
     *
     * @Assert\Expression(expression = "value <= this.now()", message = "vehicle.purchase_date.in_future")
     * @Assert\NotBlank(message = "vehicle.purchase_date.not_blank")
     *
     * @Groups({"v_read", "write"})
     */
    protected $purchaseDate;

    /**
     * @var Dealership
     *
     * @ApiProperty
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\Dealership")
     *
     * @Groups({"v_read"})
     */
    protected $purchaseDealership;

    /**
     * @var integer
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "integer")
     *
     * @Assert\Expression(expression = "value <= 1000000", message = "vehicle.mileage.too_big")
     *
     * @Groups({"v_read", "write"})
     */
    protected $mileage = 0;

    /**
     * @var integer
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "integer", nullable = true)
     *
     * @Assert\Expression(expression = "value <= 1000000", message = "vehicle.mileage.too_big")
     *
     * @Groups({"v_read", "write"})
     */
    protected $annualMileage;

    /**
     * @var string
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    protected $color;

    /**
     * @var string
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    protected $purchaseType;

    /**
     * @var string
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    protected $energy;

    /**
     * @var string
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    protected $model;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    protected $originalModel;

    /**
     * @var string
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read", "write"})
     */
    protected $registrationNumber;

    /**
     * @var \DateTime
     *
     * @ApiProperty
     *
     * @ORM\Column(type = "datetime", nullable = true)
     *
     * @Groups({"v_read"})
     */
    protected $registrationDate;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\User", inversedBy = "vehicles")
     * @ORM\JoinColumn(onDelete = "SET NULL")
     *
     * @Groups({"v_read"})
     */
    protected $owner;

    /**
     * @var Maintenance[]|ArrayCollection
     *
     * @ApiSubresource()
     *
     * @ORM\OneToMany(targetEntity = "App\Entity\Maintenance", mappedBy = "vehicle", cascade = {"persist"})
     * @ORM\OrderBy({"date" = "DESC"})
     *
     * @Groups({"v_read"})
     */
    private $maintenances;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     */
    private $maintenancesUpdatedAt;

    /**
     * @var Logo
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\Logo")
     *
     * @Groups({"v_read"})
     */
    private $logo;

    /**
     * @var Picture
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\Picture")
     *
     * @Groups({"v_read"})
     */
    private $picture;

    /**
     * @var MaintenanceProgram
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\MaintenanceProgram")
     *
     * @Groups({"v_read"})
     */
    private $maintenanceProgram;

    /**
     * @var Manual
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\Manual")
     *
     * @Groups({"v_read"})
     */
    private $manual;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     */
    private $filesUpdatedAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $nextImportantDate = null;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $nextImportantDateType = null;

    /**
     * @ORM\ManyToMany(targetEntity = Accessory::class)
     *
     * @Groups({"v_read"})
     */
    private $accessories;

    /**
     * @ORM\ManyToOne(targetEntity = AccessoriesLink::class)
     *
     * @Groups({"v_read"})
     */
    private $accessoriesLink;

    public function __construct()
    {
        $this->maintenances = new ArrayCollection();
        $this->accessories = new ArrayCollection();
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return User
     */
    public function getOwner()
    {
        return $this->owner;
    }

    /**
     * @param User $owner
     */
    public function setOwner(User $owner = null)
    {
        $this->owner = $owner;
    }

    /**
     * @return string
     */
    public function getVin()
    {
        return $this->vin;
    }

    /**
     * @param string $vin
     */
    public function setVin($vin)
    {
        $this->vin = $vin;
    }

    /**
     * @param \DateTime $purchaseDate
     */
    public function setPurchaseDate($purchaseDate)
    {
        $this->purchaseDate = $purchaseDate;
    }

    /**
     * @return \DateTime
     */
    public function getPurchaseDate()
    {
        return $this->purchaseDate;
    }

    /**
     * @param int $mileage
     */
    public function setMileage($mileage)
    {
        $this->mileage = $mileage;
    }

    /**
     * @return int
     */
    public function getMileage()
    {
        return $this->mileage;
    }

    /**
     * @param int $annualMileage
     */
    public function setAnnualMileage($annualMileage)
    {
        $this->annualMileage = $annualMileage;
    }

    /**
     * @return int
     */
    public function getAnnualMileage()
    {
        return $this->annualMileage;
    }

    /**
     * @param string $color
     */
    public function setColor($color)
    {
        $this->color = $color;
    }

    /**
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * @return string
     */
    public function getPurchaseType()
    {
        return $this->purchaseType;
    }

    /**
     * @param string $purchaseType
     */
    public function setPurchaseType($purchaseType)
    {
        $this->purchaseType = $purchaseType;
    }

    /**
     * @return string
     */
    public function getEnergy()
    {
        return $this->energy;
    }

    /**
     * @param string $energy
     */
    public function setEnergy($energy)
    {
        $this->energy = $energy;
    }

    /**
     * @return string
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @param string $model
     */
    public function setModel($model)
    {
        $this->model = $model;
    }

    /**
     * @return string
     */
    public function getRegistrationNumber()
    {
        return $this->registrationNumber;
    }

    /**
     * @param string $registrationNumber
     */
    public function setRegistrationNumber($registrationNumber)
    {
        $this->registrationNumber = $registrationNumber;
    }

    /**
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function setUpdatedAt()
    {
        $this->updatedAt = new \DateTime();
    }

    /**
     * @return Maintenance[]|ArrayCollection
     */
    public function getMaintenances()
    {
        return $this->maintenances;
    }

    /**
     * @param Maintenance[] $maintenances
     */
    public function setMaintenances($maintenances)
    {
        $this->maintenances = $maintenances;
    }

    /**
     * @param Maintenance $maintenance
     */
    public function addMaintenance($maintenance)
    {
        if ($maintenance->getVehicle() === null) {
            $maintenance->setVehicle($this);
        }

        if (!$this->maintenances->contains($maintenance)) {
            $this->maintenances->add($maintenance);
        }
    }

    /**
     * @param Maintenance $maintenance
     */
    public function removeMaintenance($maintenance)
    {
        $this->maintenances->remove($maintenance);
    }

    /**
     * @return \DateTime
     */
    public function getMaintenancesUpdatedAt()
    {
        return $this->maintenancesUpdatedAt;
    }

    public function setMaintenancesUpdatedAt()
    {
        $this->maintenancesUpdatedAt = new \DateTime();
    }

    /**
     * @return string
     */
    public function getLogo()
    {
        if (!empty($this->logo)) {
            return $this->logo->getPath();
        }

        return null;
    }

    /**
     * @param Logo $logo
     */
    public function setLogo($logo)
    {
        $this->logo = $logo;
    }

    /**
     * @return string
     */
    public function getPicture()
    {
        if (!empty($this->picture)) {
            return $this->picture->getPath();
        }

        return null;
    }

    /**
     * @param Picture $picture
     */
    public function setPicture($picture)
    {
        $this->picture = $picture;
    }

    /**
     * @return string
     */
    public function getMaintenanceProgram()
    {
        if (!empty($this->maintenanceProgram)) {
            return $this->maintenanceProgram->getPath();
        }

        return null;
    }

    /**
     * @param MaintenanceProgram $maintenanceProgram
     */
    public function setMaintenanceProgram($maintenanceProgram)
    {
        $this->maintenanceProgram = $maintenanceProgram;
    }

    /**
     * @return string
     */
    public function getManual()
    {
        if (!empty($this->manual)) {
            return $this->manual->getPath();
        }

        return null;
    }

    /**
     * @param Manual $manual
     */
    public function setManual($manual)
    {
        $this->manual = $manual;
    }

    /**
     * @return \DateTime
     */
    public function getFilesUpdatedAt()
    {
        return $this->filesUpdatedAt;
    }

    public function setFilesUpdatedAt()
    {
        $this->filesUpdatedAt = new \DateTime();
    }

    /**
     * @return \DateTime
     */
    public function getRegistrationDate()
    {
        return $this->registrationDate;
    }

    /**
     * @param \DateTime $registrationDate
     */
    public function setRegistrationDate($registrationDate)
    {
        $this->registrationDate = $registrationDate;
    }

    /**
     * @return string
     */
    public function getOriginalModel()
    {
        return $this->originalModel;
    }

    /**
     * @param string $originalModel
     */
    public function setOriginalModel($originalModel)
    {
        $this->originalModel = $originalModel;
    }

    /**
     * @return \DateTime
     */
    public function getNextImportantDate()
    {
        return $this->nextImportantDate;
    }

    /**
     * @param \DateTime $nextImportantDate
     */
    public function setNextImportantDate($nextImportantDate)
    {
        $this->nextImportantDate = $nextImportantDate;
    }

    /**
     * @return string
     */
    public function getNextImportantDateType()
    {
        return $this->nextImportantDateType;
    }

    /**
     * @param string $nextImportantDateType
     */
    public function setNextImportantDateType($nextImportantDateType)
    {
        $this->nextImportantDateType = $nextImportantDateType;
    }

    /**
     * @return Dealership
     */
    public function getPurchaseDealership()
    {
        return $this->purchaseDealership;
    }

    /**
     * @param Dealership $purchaseDealership
     */
    public function setPurchaseDealership($purchaseDealership)
    {
        $this->purchaseDealership = $purchaseDealership;
    }

    /**
     * @return \DateTimeImmutable
     * @throws \Exception
     */
    public function now()
    {
        return new \DateTimeImmutable();
    }

    /**
     * @return Collection|Accessory[]
     */
    public function getAccessories(): iterable
    {
        if (!empty($this->accessories)) {
            return array_map(function ($item) {
                return [
                    'path' => $item->getPath(),
                    'label' => $item->getLabel(),
                ];
            }, $this->accessories->toArray());
        }

        return [];
    }

    public function addAccessory(Accessory $accessory): self
    {
        if (!$this->accessories->contains($accessory)) {
            $this->accessories[] = $accessory;
        }

        return $this;
    }

    public function removeAccessory(Accessory $accessory): self
    {
        if ($this->accessories->contains($accessory)) {
            $this->accessories->removeElement($accessory);
        }

        return $this;
    }

    public function setAccessories(iterable $accessories)
    {
        $this->accessories = $accessories;

        return $this;
    }

    public function getAccessoriesLink(): ?string
    {
        if (!empty($this->accessoriesLink)) {
            return $this->accessoriesLink->getPath();
        }

        return null;
    }

    public function setAccessoriesLink(?AccessoriesLink $accessoriesLink): self
    {
        $this->accessoriesLink = $accessoriesLink;

        return $this;
    }
}
