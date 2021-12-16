<?php

namespace App\Workflow;

use App\Admin\ManualOfferAdmin;
use App\Entity\ManualOffer;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

/**
 * Events of ManualOffer are mainly managed in ManualOfferAdmin as some actions are unavailable in prePersist,
 * as changes made to relations.
 * @see ManualOfferAdmin::prePersist()
 * @see ManualOfferAdmin::postPersist()
 *
 * @author Jonathan as Jerry <jonathan.d@widop.com>
 */
class ManualOfferSubscriber implements EventSubscriber
{
    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    /**
     * @see ManualOfferAdmin::prePersist()
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $offer = $args->getEntity();

        if (!$offer instanceof ManualOffer) {
            return;
        }

        $offer->setUpdateDate(date_create());
    }

    /**
     * @see ManualOfferAdmin::preUpdate()
     * @param LifecycleEventArgs $args
     */
    public function preUpdate(LifecycleEventArgs $args)
    {
        $this->prePersist($args);
    }
}
