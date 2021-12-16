<?php

namespace App\Workflow;

use App\Entity\User;
use App\Entity\Vin;
use App\Handler\UserHandler;
use App\Soap\Manager\ObjectManager;
use App\Soap\Repository\UserRepository;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

/**
 * @author svianney <vianney@widop.com>
 * @author Thibault Richard <thibault@widop.com>
 */
class UserSubscriber implements EventSubscriber
{
    /** @var UserHandler */
    protected $handler;

    /** @var ObjectManager */
    private $manager;

    /**
     * @param ObjectManager $manager
     * @param UserHandler $handler
     */
    public function __construct(ObjectManager $manager, UserHandler $handler)
    {
        $this->manager = $manager;
        $this->handler = $handler;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
            Events::postUpdate,
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $user = $args->getEntity();

        if (!$user instanceof User) {
           return;
        }

        $this->handler->encodePassword($user);
        $this->initUser($user, $args->getEntityManager());
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postUpdate(LifecycleEventArgs $args)
    {
        $user = $args->getEntity();

        if (!$user instanceof User || !$user->hasToBePushed()) {
            return;
        }

        $uow = $args->getEntityManager()->getUnitOfWork();
        $changeSet = $uow->getEntityChangeSet($user);

        $this->manager->push($user, $changeSet);
        $user->setToBePushed(false);
    }

    /**
     * @param User $user
     * @param EntityManager $em
     */
    private function initUser(User $user, $em)
    {
        $vehicle = $user->getVehicles()->first();

        $vin = $em->getRepository(Vin::class)->find($vehicle->getVin());

        /** @var UserRepository $repo */
        $repo = $this->manager->getRepository(User::class);

        if ($vin instanceof Vin) {
            if($vin->getLastName() === $user->getLastName()) {
                $user->setExternalId($vin->getClientId());
            }
            $em->remove($vin);
        } else {
            // need to pull by vin name first in order to retrieve client external id
            $user = $repo->pullByVinName($user);
        }
        
        $repo->push($user, [
            'email'       => true,
            'optin.email' => true,
        ]);

        $repo->pushRegistrationStep($user, false);

        $repo->pull($user);
    }
}
