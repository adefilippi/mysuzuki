<?php

namespace App\Workflow;

use App\Entity\FeaturedContent;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class FeaturedContentSubscriber implements EventSubscriber
{
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    public function prePersist(LifecycleEventArgs $args): void
    {
        $this->setPropertyNull($args);
    }

    public function preUpdate(LifecycleEventArgs $args): void
    {
        $this->setPropertyNull($args);
    }

    public function setPropertyNull(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof FeaturedContent) {
            return;
        }

        switch ($entity->getType()) {
            case 'article':
                $entity->setOffer(null);
                $entity->setGame(null);
                break;

            case 'offer':
                $entity->setArticle(null);
                $entity->setGame(null);
                break;

            case 'game':
                $entity->setOffer(null);
                $entity->setArticle(null);
                break;

            default:
                return null;
        }
    }
}
