<?php

namespace App\Workflow;

use ApplicationSonataMediaBundle\Entity\Media;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Sonata\MediaBundle\Provider\MediaProviderInterface;
use Sonata\MediaBundle\Twig\Extension\MediaExtension;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class MediaListener
{
    /** @var ManagerRegistry */
    private $registry;

    /** @var MediaExtension */
    private $extension;

    /**
     * @param ManagerRegistry $registry
     * @param MediaExtension  $extension
     */
    public function __construct(ManagerRegistry $registry, MediaExtension $extension)
    {
        $this->registry = $registry;
        $this->extension = $extension;
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function preUpdate(LifecycleEventArgs $args)
    {
        $this->generatePath($args);
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $this->generatePath($args);
    }

    /**
     * @param LifecycleEventArgs $args
     */
    private function generatePath(LifecycleEventArgs $args)
    {
        $media = $args->getEntity();

        if (!$media instanceof Media) {
            return;
        }

        $path = $this->extension->path($media, MediaProviderInterface::FORMAT_REFERENCE);

        $media->setPath($path);
    }
}
