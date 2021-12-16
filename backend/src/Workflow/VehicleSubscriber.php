<?php

namespace App\Workflow;

use App\Entity\Vehicle;
use App\Soap\Manager\ObjectManager;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * @author svianney <vianney@widop.com>
 */
class VehicleSubscriber implements EventSubscriber
{
    /** @var ObjectManager */
    protected $manager;

    /**
     * @param ObjectManager $manager
     */
    public function __construct(ObjectManager $manager)
    {
        $this->manager = $manager;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return [
            Events::preUpdate
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function preUpdate(LifecycleEventArgs $args)
    {
        $vehicle = $args->getEntity();

        if (!$vehicle instanceof Vehicle || !$vehicle->hasToBePushed()) {
            return;
        }

        $changeSets = $args
            ->getEntityManager()
            ->getUnitOfWork()
            ->getEntityChangeSet($vehicle)
        ;

        $this->manager->push($vehicle, $changeSets);

        $vehicle->setToBePushed(false);
    }
}
