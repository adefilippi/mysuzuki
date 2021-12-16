<?php

namespace SoapBundle\Mocker;

use SoapBundle\Events\SoapCallEvent;
use SoapBundle\Events\SoapEvents;
use SoapBundle\Events\SoapRequestEvent;
use SoapBundle\Events\SoapWSDLEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class MockerEventSubscriber implements EventSubscriberInterface
{
    /** @var \SoapBundle\Mocker\MockerManager */
    private $mockerManager;

    /** @var \SoapBundle\Mocker\WsdlCacherInterface */
    private $wsdlCacher;

    /**
     * @param \SoapBundle\Mocker\MockerManager       $mockerManager
     * @param \SoapBundle\Mocker\WsdlCacherInterface $wsdlCacher
     */
    public function __construct(MockerManager $mockerManager, WsdlCacherInterface $wsdlCacher = null)
    {
        $this->mockerManager = $mockerManager;
        $this->wsdlCacher = $wsdlCacher;
    }

    /** {@inheritdoc} */
    public static function getSubscribedEvents()
    {
        return [
            SoapEvents::SET_WSDL => 'onSetWsdl',
            SoapEvents::REQUEST  => 'onSoapRequest',
            SoapEvents::PRE_CALL => 'onSoapPreCall',
        ];
    }

    /**
     * @param \SoapBundle\Events\SoapWSDLEvent $event
     */
    public function onSetWsdl(SoapWSDLEvent $event)
    {
        if ($this->wsdlCacher) {
            $event->setWsdl($this->wsdlCacher->getLocalCopyPath($event->getWsdl()));
        }
    }

    /**
     * @param \SoapBundle\Events\SoapCallEvent $event
     */
    public function onSoapPreCall(SoapCallEvent $event)
    {
        if (false !== $mocker = $this->mockerManager->getMocker($event->getFunctionName(), MockStage::CALL)) {
            $event->setResponse($mocker->mock(
                $event->getFunctionName(), MockStage::CALL, $event->getArguments()
            ));
        }
    }

    /**
     * @param \SoapBundle\Events\SoapRequestEvent $event
     */
    public function onSoapRequest(SoapRequestEvent $event)
    {
        if (false !== $mocker = $this->mockerManager->getMocker($event->getFunctionName(), MockStage::REQUEST)) {
            $event->setResponse($mocker->mock(
                $event->getFunctionName(), MockStage::REQUEST, $event->getArguments()
            ));
        }
    }
}
