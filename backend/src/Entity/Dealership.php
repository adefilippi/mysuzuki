<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;
use App\Entity\Embed\Address;
use App\Entity\Embed\Coordinates;
use App\Soap\Annotation\SoapRepository;
use Doctrine\ORM\Mapping as ORM;
use libphonenumber\PhoneNumber;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @author Thibault Richard <thibault@widop.com>
 *
 * @ORM\Entity(repositoryClass = "App\Repository\DealershipRepository")
 *
 * @ApiResource(
 *     attributes = {
 *          "pagination_enabled"      = false,
 *          "normalization_context"   = {"groups" = {"v_read"}},
 *          "denormalization_context" = {"groups" = {"write"}}
 *     },
 *     collectionOperations = {"get" = { "access_control" = "is_granted('ROLE_USER')"}},
 *     itemOperations       = {"get"},
 * )
 * @ApiFilter(BooleanFilter::class, properties = {"closed"})
 * @ApiFilter(App\Filter\LatitudeLongitudeFilter::class, properties = {"latitude", "longitude", "distance"})
 *
 * @SoapRepository(repositoryClass = "App\Soap\Repository\DealershipRepository")
 */
class Dealership
{
    /**
     * @var int
     *
     * @ApiProperty(identifier = false)
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     * @ORM\Column(type = "integer")
     */
    private $id;

    /**
     * @var string
     *
     * @ApiProperty(identifier = true)
     *
     * @ORM\Column(type = "string", unique = true)
     *
     * @Groups({"v_read"})
     */
    private $externalId;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Groups({"v_read", "offer_read"})
     */
    private $name;

    /**
     * @var Address
     *
     * @ApiProperty
     * @ORM\Embedded(class = "App\Entity\Embed\Address")
     *
     * @Groups({"v_read"})
     */
    private $address;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $phone;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $fax;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $workshopEmail;

    /**
     * @var Coordinates
     *
     * @ApiProperty
     * @ORM\Embedded(class = "App\Entity\Embed\Coordinates")
     *
     * @Groups({"v_read"})
     */
    private $coordinates;

    /**
     * @var boolean
     *
     * @ApiProperty
     * @ORM\Column(type = "boolean")
     *
     * @Groups({"v_read"})
     */
    private $closed;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $moreInformationUrl;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getExternalId()
    {
        return $this->externalId;
    }

    /**
     * @param string $externalId
     */
    public function setExternalId($externalId)
    {
        $this->externalId = $externalId;
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
     * @return string
     */
    public function getFax()
    {
        return $this->fax;
    }

    /**
     * @param string $fax
     */
    public function setFax($fax)
    {
        $this->fax = $fax;
    }

    /**
     * @return string
     */
    public function getMoreInformationUrl()
    {
        return $this->moreInformationUrl;
    }

    /**
     * @param $url string
     */
    public function setMoreInformationUrl($url)
    {
        $this->moreInformationUrl = $url;
    }

    /**
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * @param string $phone
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;
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
     * @return Coordinates
     */
    public function getCoordinates()
    {
        return $this->coordinates;
    }

    /**
     * @param Coordinates $coordinates
     */
    public function setCoordinates($coordinates)
    {
        $this->coordinates = $coordinates;
    }

    /**
     * @return bool
     */
    public function isClosed()
    {
        return $this->closed;
    }

    /**
     * @param bool $closed
     */
    public function setClosed($closed)
    {
        $this->closed = $closed;
    }

    /**
     * @return string
     */
    public function getWorkshopEmail()
    {
        return $this->workshopEmail;
    }

    /**
     * @param string $workshopEmail
     */
    public function setWorkshopEmail($workshopEmail)
    {
        $this->workshopEmail = $workshopEmail;
    }
}
