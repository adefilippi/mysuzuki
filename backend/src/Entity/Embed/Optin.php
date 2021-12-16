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
class Optin
{
    /**
     * @var bool
     *
     * @ORM\Column(type = "boolean", nullable = true)
     *
     * @Groups({"read", "update"})
     */
    private $sms = false;

    /**
     * @var bool
     *
     * @ORM\Column(type = "boolean", nullable = true)
     *
     * @Assert\IsTrue(message = "user.optin.true", groups = {"email"})
     *
     * @Groups({"read", "user_create", "update"})
     */
    private $email = false;

    /**
     * @return bool
     */
    public function isSms()
    {
        return $this->sms;
    }

    /**
     * @param bool $sms
     */
    public function setSms($sms)
    {
        $this->sms = $sms;
    }

    /**
     * @return bool
     */
    public function isEmail()
    {
        return $this->email;
    }

    /**
     * @param bool $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }
}
