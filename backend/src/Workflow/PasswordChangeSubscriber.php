<?php

namespace App\Workflow;

use App\Entity\PasswordChange;
use App\Entity\User;
use App\Handler\UserHandler;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * @author svianney <vianney@widop.com>
 */
class PasswordChangeSubscriber implements EventSubscriber
{
    /** @var TokenStorageInterface */
    protected $storage;

    /** @var UserHandler */
    protected $handler;

    public function __construct(TokenStorageInterface $storage, UserHandler $handler)
    {
        $this->storage = $storage;
        $this->handler = $handler;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $passwordChange = $args->getEntity();

        if (!$passwordChange instanceof PasswordChange) {
            return;
        }

        /** @var User $user */
        $user = $this->storage->getToken()->getUser();
        $passwordChange->setUser($user);
        $user->setPlainPassword($passwordChange->getNewPassword());
        $this->handler->encodePassword($user);
    }
}
