<?php

namespace App\Workflow;

use App\Entity\Attachment;
use App\Entity\Game;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Vich\UploaderBundle\Event\Event;
use Vich\UploaderBundle\Event\Events;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class AttachementSubscriber implements EventSubscriberInterface
{
    /** @var UploaderHelper */
    private $helper;

    /**
     * @param UploaderHelper $helper
     */
    public function __construct(UploaderHelper $helper)
    {
        $this->helper = $helper;
    }

    /**
     * @param Event $event
     */
    public function onVichUploaderPostUpload(Event $event)
    {
        $object = $event->getObject();

        if (!$object instanceof Attachment) {
            return;
        }

        $object->setContentUrl($this->helper->asset($object, 'file'));
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            Events::POST_UPLOAD => "onVichUploaderPostUpload",
        ];
    }
}
