<?php

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Offer;
use App\Entity\User;
use App\Soap\Manager\ObjectManager;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @author Charlie <charlie@widop.com>
 */
final class OfferSubscriber implements EventSubscriberInterface
{
    /** @var ObjectManager */
    private $manager;

    /** @var TokenStorageInterface */
    private $tokenStorage;

    /**
     * @param ObjectManager $manager
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(ObjectManager $manager, TokenStorageInterface $tokenStorage)
    {
        $this->manager = $manager;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::REQUEST => ['pullOffer', EventPriorities::PRE_READ]
        ];
    }

    /**
     * @param GetResponseEvent $event
     */
    public function pullOffer(GetResponseEvent $event): void
    {
        // Apply pull only on offers routes
        $route = $event->getRequest()->get('_route');
        if (null === $route || strpos($route, 'offers') === false) {
            return;
        }

        if ($this->tokenStorage->getToken() === null) {
            return;
        }
        $user = $this->tokenStorage->getToken()->getUser();

        if ($user INSTANCEOF User) {
            $this->manager->getRepository(Offer::class)->pull($user);
        }
    }
}
