<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Soap\Annotation\SoapRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity
 *
 * @ApiResource(
 *     collectionOperations = {},
 *     itemOperations = {"get"}
 * )
 *
 * @SoapRepository(repositoryClass = "App\Soap\Repository\VinRepository")
 *
 * @author svianney <vianney@widop.com>
 */
class Vin
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(type = "string")
     */
    protected $id;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     */
    protected $lastName;

    /**
     * @var integer
     *
     * @ORM\Column(type = "integer", nullable = true)
     *
     * @Groups("write")
     */
    protected $clientId;

    /**
     * @param int $id
     * @param string $lastName
     * @param int $clientId
     */
    public function __construct($id, $lastName, $clientId = null)
    {
        $this->id = $id;
        $this->setLastName($lastName);
        $this->setClientId($clientId);
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @return int
     */
    public function getClientId()
    {
        return $this->clientId;
    }

    /**
     * @param int $clientId
     */
    public function setClientId($clientId)
    {
        $this->clientId = $clientId;
    }

    /**
     * @param string $lastName
     */
    public function setLastName($lastName)
    {
        $this->lastName = User::convertLastName($lastName);
    }
}
