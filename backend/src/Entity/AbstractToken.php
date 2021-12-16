<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Util\Random;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
abstract class AbstractToken
{
    const TOKEN_TTL = 24 * 60 * 60;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity = "User")
     * @ORM\JoinColumn(onDelete = "CASCADE")
     */
    protected $user;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @ApiProperty(identifier = true)
     */
    protected $token;

    /**
     * @var int
     *
     * @ORM\Column(type = "integer")
     *
     * @Groups({"read"})
     */
    protected $expiresAt;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\NotBlank(message = "token.url.not_blank")
     *
     * @Groups({"token_create"})
     */
    protected $callbackUrl;

    /**
     * @param int $timestamp
     */
    public function setExpiresAt($timestamp)
    {
        $this->expiresAt = $timestamp;
    }

    /**
     * expire token
     */
    public function expire()
    {
        $this->setExpiresAt(time()-1);
    }

    /**
     * @ORM\PrePersist
     */
    public function createExpiresAt()
    {
        $this->setExpiresAt(time() + static::TOKEN_TTL);
    }

    /**
     * @return int
     */
    public function getExpiresAt()
    {
        return $this->expiresAt;
    }

    /**
     * @return int
     */
    public function getExpiresIn()
    {
        if ($this->expiresAt) {
            return $this->expiresAt - time();
        }

        return PHP_INT_MAX;
    }

    /**
     * @return bool
     */
    public function hasExpired()
    {
        if ($this->expiresAt) {
            return time() > $this->expiresAt;
        }

        return false;
    }

    /**
     * @param string $token
     */
    public function setToken($token)
    {
        $this->token = $token;
    }

    /**
     * @ORM\PrePersist
     */
    public function createToken()
    {
        $this->setToken(Random::generateToken());
    }

    /**
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param User $user
     */
    public function setUser(?User $user)
    {
        $this->user = $user;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return string
     */
    public function getCallbackUrl()
    {
        return $this->callbackUrl;
    }

    /**
     * @param string $callbackUrl
     */
    public function setCallbackUrl($callbackUrl)
    {
        $this->callbackUrl = $callbackUrl;
    }
}
