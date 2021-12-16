<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\OAuthServerBundle\Entity\Client as BaseClient;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Entity
 */
class Client extends BaseClient
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
     * @var bool
     *
     * @ORM\Column(type = "boolean")
     */
    protected $public = false;

    /**
     * @inheritDoc
     */
    public function checkSecret($secret)
    {
        return null === $secret ? $this->isPublic() : $secret === $this->secret ;
    }

    /**
     * @return int
     */
    public function isPublic()
    {
        return $this->public;
    }

    /**
     * @param bool $public
     */
    public function setPublic($public)
    {
        $this->public = $public;
    }
}
