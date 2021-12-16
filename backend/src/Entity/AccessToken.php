<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\AccessToken as BaseAccessToken;
use FOS\OAuthServerBundle\Model\ClientInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Entity
 */
class AccessToken extends BaseAccessToken
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     * @ORM\Column(type = "integer")
     */
    protected $id;

    /**
     * @var Client
     *
     * @ORM\ManyToOne(targetEntity = "Client")
     * @ORM\JoinColumn(nullable = false)
     */
    protected $client;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity = "User")
     * @ORM\JoinColumn(onDelete = "CASCADE")
     */
    protected $user;

    /**
     * @param Client $client
     * @param string $token
     * @param int $expiresAt
     * @param User $user
     * @return static
     */
    public static function create(Client $client, string $token, int $expiresAt, User $user): self {
        return (new self())
            ->setClient($client)
            ->setToken($token)
            ->setExpiresAt($expiresAt)
            ->setUser($user);
    }

    /**
     * @param ClientInterface $client
     * @return $this
     */
    public function setClient(ClientInterface $client): self
    {
        $this->client = $client;
        return $this;
    }

    /**
     * @param string $token
     * @return $this
     */
    public function setToken($token): self
    {
        $this->token = $token;
        return $this;
    }

    /**
     * @param int $timestamp
     * @return $this
     */
    public function setExpiresAt($timestamp): self
    {
        $this->expiresAt = $timestamp;
        return $this;
    }

    /**
     * @param UserInterface $user
     * @return $this|void
     */
    public function setUser(UserInterface $user)
    {
        $this->user = $user;
        return $this;
    }
}
