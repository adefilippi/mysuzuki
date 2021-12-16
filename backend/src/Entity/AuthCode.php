<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\AuthCode as BaseAuthCode;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Entity
 */
class AuthCode extends BaseAuthCode
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(type = "integer")
     * @ORM\GeneratedValue(strategy = "AUTO")
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
}
