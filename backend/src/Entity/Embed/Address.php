<?php

namespace App\Entity\Embed;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Embeddable
 */
class Address
{
    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\NotBlank(message="user.address.street.not_blank", groups = {"address"})
     * @Assert\Length(max = 70, maxMessage = "user.address.street.max_length", groups = {"Default", "address"})
     *
     * @Groups({"read", "update", "v_read"})
     */
    private $street;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\Length(max = 70, maxMessage = "user.address.additional1.max_length", groups = {"Default", "address"})
     *
     * @Groups({"read", "update", "v_read"})
     */
    private $additional1;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\Length(max = 70, maxMessage = "user.address.additional2.max_length", groups = {"Default", "address"})
     *
     * @Groups({"read", "update", "v_read"})
     */
    private $additional2;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\NotBlank(message="user.address.zip_code.not_blank", groups = {"address"})
     * @Assert\Length(max = 5, maxMessage = "user.address.zip_code.max_length", groups = {"Default", "address"})
     *
     * @Groups({"read", "update", "v_read"})
     */
    private $zipCode;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Assert\NotBlank(message="user.address.city.not_blank", groups = {"address"})
     * @Assert\Length(max = 32, maxMessage = "user.address.city.max_length", groups = {"Default", "address"})
     *
     * @Groups({"read", "update", "v_read"})
     */
    private $city;

    /**
     * @return string
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * @param string $street
     */
    public function setStreet($street)
    {
        $this->street = $street;
    }

    /**
     * @return string
     */
    public function getAdditional1()
    {
        return $this->additional1;
    }

    /**
     * @param string $additional1
     */
    public function setAdditional1($additional1)
    {
        $this->additional1 = $additional1;
    }

    /**
     * @return string
     */
    public function getAdditional2()
    {
        return $this->additional2;
    }

    /**
     * @param string $additional2
     */
    public function setAdditional2($additional2)
    {
        $this->additional2 = $additional2;
    }

    /**
     * @return string
     */
    public function getZipCode()
    {
        return $this->zipCode;
    }

    /**
     * @param string $zipCode
     */
    public function setZipCode($zipCode)
    {
        $this->zipCode = $zipCode;
    }

    /**
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param string $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }
}
