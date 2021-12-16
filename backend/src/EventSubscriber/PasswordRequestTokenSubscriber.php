<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\PasswordRequestToken;
use App\Handler\UserHandler;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class PasswordRequestTokenSubscriber implements EventSubscriberInterface
{
    /** @var ManagerRegistry */
    private $managerRegistry;

    /** @var UserHandler */
    private $userHandler;

    /**
     * @param ManagerRegistry $managerRegistry
     * @param UserHandler     $userHandler
     */
    public function __construct(ManagerRegistry $managerRegistry, UserHandler $userHandler)
    {
        $this->managerRegistry = $managerRegistry;
        $this->userHandler = $userHandler;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['postWrite', EventPriorities::POST_WRITE],
        ];
    }

    /**
     * @param GetResponseForControllerResultEvent $event
     */
    public function postWrite(GetResponseForControllerResultEvent $event)
    {
        $passwordRequestToken = $event->getControllerResult();

        if (
            !$passwordRequestToken instanceof PasswordRequestToken
            || !$event->getRequest()->isMethod(Request::METHOD_PUT)
        ) {
            return;
        }

        if ($passwordRequestToken->hasExpired()) {
            throw new UnauthorizedHttpException("This token has expired. Please ask a new one.");
        }

        $user = $passwordRequestToken->getUser();

        $user->setPlainPassword($passwordRequestToken->getNewPassword());
        $this->userHandler->encodePassword($user);

        $passwordRequestToken->expire();

        $this->managerRegistry->getManager()->flush();
    }
}
