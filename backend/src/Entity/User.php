<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Embed\Address;
use App\Entity\Embed\Job;
use App\Entity\Embed\Optin;
use App\Entity\Traits\PushableTrait;
use App\Soap\Annotation\SoapRepository;
use App\Validation\Constraints\UniqueUser;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use libphonenumber\PhoneNumber;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Misd\PhoneNumberBundle\Validator\Constraints as PhoneAssert;

/**
 * @ORM\Table(name = "app_user")
 *
 * @ORM\Entity(repositoryClass = "App\Repository\UserRepository")
 *
 * @ORM\HasLifecycleCallbacks
 *
 * @UniqueEntity("email", message = "user.email.unique")
 * @UniqueUser(groups = {"user_create"})
 *
 * @ApiResource(
 *     collectionOperations = {
 *         "post" = {
 *              "access_control"          = "not is_granted('ROLE_USER_NOT_ENABLED')",
 *              "denormalization_context" = {"groups" = {"user_create"}},
 *              "validation_groups"       = {"user_create", "User"}
 *          },
 *     },
 *     itemOperations       = {
 *         "get"  = {
 *              "route_name"              = "api_users_get_item",
 *              "access_control"           = "is_granted('ROLE_USER_NOT_ENABLED')"
 *          },
 *         "put"  = {
 *              "route_name"              = "api_users_put_item",
 *              "access_control"          = "is_granted('ROLE_USER_NOT_ENABLED')",
 *              "denormalization_context" = {"groups" = {"update"}}
 *          },
 *     },
 *     attributes           = {
 *         "normalization_context"        = {"groups" = {"read"}},
 *         "denormalization_context"      = {"groups" = {"write"}}
 *     }
 * )
 *
 * @SoapRepository(repositoryClass = "App\Soap\Repository\UserRepository")
 *
 * @Assert\Expression(
 *     "this.getMobilePhone() !== null or this.getLandlinePhone() !== null",
 *     message = "user.phone.one_or_both",
 *     groups = {"phone"}
 * )
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class User implements UserInterface
{
    use PushableTrait;

    const API_IDENTIFIER = 'current';

    public static $civs = ['M', 'MME', 'STE'];

    /**
     * @var integer
     *
     * @ApiProperty(identifier = false)
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(type = "integer")
     *
     * @Groups({"read"})
     */
    private $externalId;

    /**
     * @var string
     *
     * @ApiProperty(identifier = true)
     */
    private static $apiIdentifier = self::API_IDENTIFIER;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime")
     */
    private $signedUpAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime")
     */
    private $updatedAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     */
    private $vehiclesUpdatedAt;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\NotBlank(message = "user.last_name.not_blank", groups = {"Default", "lastName"})
     *
     * @Groups({"read", "user_create"})
     */
    private $lastName;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\Length(max = 32, maxMessage = "user.first_name.max_length", groups = {"Default", "firstName"})
     *
     * @Groups({"read", "user_create", "update"})
     */
    private $firstName;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     */
    private $password;

    /**
     * @var string
     *
     * @Assert\NotBlank(groups = {"user_create"}, message = "user.password.not_blank")
     *
     * @Groups({"user_create"})
     */
    private $plainPassword;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", unique = true)
     *
     * @Assert\Email(message = "user.email.is_email", groups = {"Default", "email"})
     * @Assert\NotBlank(message = "user.email.not_blank", groups = {"Default", "email"})
     * @Assert\Length(max = 100, maxMessage = "user.email.max_lenth", groups = {"Default", "email"})
     *
     * @Groups({"read", "user_create", "update"})
     */
    private $email;

    /**
     * @var Vehicle[]|ArrayCollection
     *
     * @ORM\OneToMany(targetEntity = "App\Entity\Vehicle", mappedBy = "owner", cascade = {"persist"})
     *
     * @Groups({"read", "user_create", "update"})
     */
    private $vehicles;

    /**
     * @var Dealership
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Dealership")
     *
     * @Groups({"read", "update"})
     */
    private $dealership;

    /**
     * @var bool
     *
     * @ORM\Column(type = "boolean")
     *
     * @Groups({"read"})
     */
    private $enabled = false;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     */
    private $continueSignupEmailDate;

    /**
     * @var Job
     *
     * @ORM\Embedded(class = "App\Entity\Embed\Job")
     *
     * @Assert\Valid
     *
     * @Groups({"read", "update"})
     */
    private $job;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     *
     * @Assert\DateTime(format = "Y-m-d\TH:i:sP", message = "user.date_of_birth.format")
     *
     * @Groups({"read", "update"})
     */
    private $dateOfBirth;

    /**
     * @var Address
     *
     * @ORM\Embedded(class = "App\Entity\Embed\Address")
     *
     * @Assert\Valid(groups = {"Default", "address"})
     *
     * @Groups({"read", "update"})
     */
    private $address;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\Choice(callback = "getCivs", message = "user.civ.choice")
     *
     * @Groups({"read", "update"})
     */
    private $civ;

    /**
     * @var PhoneNumber
     *
     * @ORM\Column(type = "phone_number", nullable = true)
     *
     * @PhoneAssert\PhoneNumber(type = "mobile", message = "user.mobile_phone.format", defaultRegion = "FR", groups = {"Default", "phone"})
     *
     * @Groups({"read", "update"})
     */
    private $mobilePhone;

    /**
     * @var PhoneNumber
     *
     * @ORM\Column(type = "phone_number", nullable = true)
     *
     * @PhoneAssert\PhoneNumber(type = "any", message = "user.landline_phone.format", defaultRegion = "FR", groups = {"Default", "phone"})
     *
     * @Groups({"read", "update"})
     */
    private $landlinePhone; // TODO: Change phone assert to match only fixed_line and voip

    /**
     * @var Optin
     *
     * @ORM\Embedded(class = "App\Entity\Embed\Optin")
     *
     * @Assert\Valid(groups = {"email"})
     *
     * @Groups({"read", "update", "user_create"})
     */
    private $optin;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     *
     * @Groups({"read"})
     */
    private $emailConfirmationSentAt;

    /**
     * @var boolean
     *
     * @ORM\Column(type = "boolean")
     */
    private $migrated = false;

    /**
     * @ORM\OneToMany(targetEntity=Participation::class, mappedBy="user")
     */
    private $participations;

    public function __construct()
    {
        $this->vehicles = new ArrayCollection();
        $this->setAddress(new Address());
        $this->setOptin(new Optin());
        $this->setJob(new Job());
        $this->participations = new ArrayCollection();
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName($lastName)
    {
        $this->lastName = self::convertLastName($lastName);
    }

    /**
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return string
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param string $plainPassword
     */
    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return array
     */
    public function getRoles()
    {
        return ['ROLE_USER'];
    }

    /**
     * @return null|string
     */
    public function getSalt()
    {
        return null;
    }

    public function eraseCredentials()
    {
        $this->setPlainPassword(null);
    }

    /**
     * @return string
     */
    public function getApiIdentifier()
    {
        return self::$apiIdentifier;
    }

    /**
     * @return Vehicle[]|ArrayCollection
     */
    public function getVehicles()
    {
        return $this->vehicles;
    }

    /**
     * @param Vehicle[]|ArrayCollection $vehicles
     */
    public function setVehicles($vehicles)
    {
        foreach ($this->vehicles as $vehicle) {
            if (!in_array($vehicle, $vehicles)) {
                $this->removeVehicle($vehicle);
            }
        }

        foreach ($vehicles as $vehicle) {
            $this->addVehicle($vehicle);
        }
    }

    /**
     * @param Vehicle $vehicle
     */
    public function addVehicle(Vehicle $vehicle)
    {
        if (null === $vehicle->getOwner()) {
            $vehicle->setOwner($this);
        }

        if (!$this->vehicles->contains($vehicle)) {
            $this->vehicles->add($vehicle);
        }
    }

    /**
     * @param Vehicle $vehicle
     */
    public function removeVehicle(Vehicle $vehicle)
    {
        if (null !== $vehicle->getOwner()) {
            $vehicle->setOwner(null);
        }

        $this->vehicles->removeElement($vehicle);
    }

    /**
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * @param string $firstName
     */
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }

    /**
     * @return bool
     */
    public function isEnabled()
    {
        return $this->enabled;
    }

    /**
     * @param bool $enabled
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;
    }

    /**
     * @return \DateTime
     */
    public function getSignedUpAt()
    {
        return $this->signedUpAt;
    }

    /**
     * @ORM\PrePersist
     */
    public function setSignedUpAt()
    {
        $this->signedUpAt = new \DateTime();
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
     * @return \DateTime
     */
    public function getContinueSignupEmailDate()
    {
        return $this->continueSignupEmailDate;
    }

    /**
     * @param \DateTime $continueSignupEmailDate
     */
    public function setContinueSignupEmailDate(\DateTime $continueSignupEmailDate)
    {
        $this->continueSignupEmailDate = $continueSignupEmailDate;
    }

    /**
     * @param string $lastName
     * @return string
     */
    public static function convertLastName($lastName)
    {
        return mb_strtoupper(\URLify::downcode(trim($lastName)));
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
     * @return Job
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * @param Job $job
     */
    public function setJob(Job $job = null)
    {
        $this->job = $job;
        $job->setUser($this);
    }

    /**
     * @return \DateTime
     */
    public function getDateOfBirth()
    {
        return $this->dateOfBirth;
    }

    /**
     * @param \DateTime $dateOfBirth
     */
    public function setDateOfBirth($dateOfBirth)
    {
        $this->dateOfBirth = $dateOfBirth;
    }

    /**
     * @return PhoneNumber
     */
    public function getMobilePhone()
    {
        return $this->mobilePhone;
    }

    /**
     * @param PhoneNumber $mobilePhone
     */
    public function setMobilePhone($mobilePhone)
    {
        $this->mobilePhone = $mobilePhone;
    }

    /**
     * @return string
     */
    public function getNationalMobilePhone()
    {
        $utils = PhoneNumberUtil::getInstance();

        return $this->mobilePhone ?
            str_replace(' ','',$utils->format($this->mobilePhone, PhoneNumberFormat::NATIONAL)) :
            $this->mobilePhone
        ;
    }

    /**
     * @return PhoneNumber
     */
    public function getLandlinePhone()
    {
        return $this->landlinePhone;
    }

    /**
     * @return string
     */
    public function getNationalLandlinePhone()
    {
        $utils = PhoneNumberUtil::getInstance();

        return $this->landlinePhone ?
            str_replace(' ','',$utils->format($this->landlinePhone, PhoneNumberFormat::NATIONAL)) :
            $this->landlinePhone
        ;
    }

    /**
     * @param PhoneNumber $landlinePhone
     */
    public function setLandlinePhone($landlinePhone)
    {
        $this->landlinePhone = $landlinePhone;
    }

    /**
     * @return string
     */
    public function getCiv()
    {
        return $this->civ;
    }

    /**
     * @param string $civ
     */
    public function setCiv($civ)
    {
        $this->civ = $civ;
    }

    /**
     * @return Address
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param Address $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return Optin
     */
    public function getOptin()
    {
        return $this->optin;
    }

    /**
     * @param Optin $optin
     */
    public function setOptin($optin)
    {
        $this->optin = $optin;
    }

    /**
     * @return \DateTime
     */
    public function getVehiclesUpdatedAt()
    {
        return $this->vehiclesUpdatedAt;
    }

    /**
     * @param \DateTime $vehiclesUpdatedAt
     */
    public function setVehiclesUpdatedAt($vehiclesUpdatedAt)
    {
        $this->vehiclesUpdatedAt = $vehiclesUpdatedAt;
    }

    /**
     * @return Dealership
     */
    public function getDealership()
    {
        return $this->dealership;
    }

    /**
     * @param Dealership $dealership
     */
    public function setDealership($dealership)
    {
        $this->dealership = $dealership;
    }

    /**
     * @return array
     */
    public static function getCivs()
    {
        return self::$civs;
    }

    /**
     * @return array
     */
    public static function getCivsLabel()
    {
        return [
            'M'   => 'Monsieur',
            'MME' => 'Madame',
            'STE' => 'Société'
        ];
    }

    /**
     * @return \DateTime
     */
    public function getEmailConfirmationSentAt()
    {
        return $this->emailConfirmationSentAt;
    }

    /**
     * @param \DateTime $emailConfirmationSentAt
     */
    public function setEmailConfirmationSentAt($emailConfirmationSentAt)
    {
        $this->emailConfirmationSentAt = $emailConfirmationSentAt;
    }

    /**
     * @return bool
     */
    public function isMigrated()
    {
        return $this->migrated;
    }

    /**
     * @param bool $migrated
     */
    public function setMigrated($migrated)
    {
        $this->migrated = $migrated;
    }

    /**
     * @return Collection|Participation[]
     */
    public function getParticipations(): Collection
    {
        return $this->participations;
    }

    public function addParticipation(Participation $participation): self
    {
        if (!$this->participations->contains($participation)) {
            $this->participations[] = $participation;
            $participation->setUser($this);
        }

        return $this;
    }

    public function removeParticipation(Participation $participation): self
    {
        if ($this->participations->contains($participation)) {
            $this->participations->removeElement($participation);
            // set the owning side to null (unless already changed)
            if ($participation->getUser() === $this) {
                $participation->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @Groups({"read", "update"})
     */
    public function getMobilePhoneFormatted(): ?string
    {
        $util = PhoneNumberUtil::getInstance();

        return $this->mobilePhone ? $util->format($this->mobilePhone, PhoneNumberFormat::E164) : null;
    }

    /**
     * @Groups({"read", "update"})
     */
    public function getLandlinePhoneFormatted(): ?string
    {
        $util = PhoneNumberUtil::getInstance();

        return $this->landlinePhone ? $util->format($this->landlinePhone, PhoneNumberFormat::E164) : null;
    }
}
