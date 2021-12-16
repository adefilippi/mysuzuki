<?php

namespace App\Handler;

use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @author svianney <vianney@widop.com>
 */
class UserHandler
{
    /** @var UserPasswordEncoderInterface */
    protected $encoder;

    /**
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    /**
     * @param User $user
     */
    public function encodePassword(User $user)
    {
        if (!$user->getPlainPassword()) {
            return;
        }

        $encodedPassword = $this->encoder->encodePassword($user, $user->getPlainPassword());
        $user->eraseCredentials();
        $user->setPassword($encodedPassword);
    }
}
