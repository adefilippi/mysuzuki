<?php

namespace SoapBundle\Profiler;

use SoapBundle\Events\SoapEnvelopeEvent;
use SoapBundle\Events\SoapEvent;
use SoapBundle\Events\SoapEvents;
use SoapBundle\Events\SoapExceptionEvent;
use SoapBundle\Exception\SoapException;
use SoapBundle\Model\SoapResult;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Stopwatch\Stopwatch;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 * @author Geoffrey Brier <geoffrey@widop.com>
 */
class SoapListener implements EventSubscriberInterface
{
    const STOPWATCH_IDENTIFIER = 'soap_client.request';

    /** @var \Symfony\Component\Stopwatch\Stopwatch */
    protected $stopWatch;

    /** @var \Symfony\Component\HttpFoundation\RequestStack */
    protected $requestStack;

    /**
     * @param \Symfony\Component\Stopwatch\Stopwatch         $stopWatch
     * @param \Symfony\Component\HttpFoundation\RequestStack $requestStack
     */
    public function __construct(Stopwatch $stopWatch, RequestStack $requestStack)
    {
        $this->stopWatch = $stopWatch;
        $this->requestStack = $requestStack;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return [
            SoapEvents::PRE_CALL  => 'startWatch',
            SoapEvents::POST_CALL => 'processEnveloppe',
            SoapEvents::EXCEPTION => 'processException',
        ];
    }

    /**
     * @param SoapEvent $event
     */
    public function startWatch(SoapEvent $event)
    {
        $this->stopWatch->start(self::STOPWATCH_IDENTIFIER);
    }

    /**
     * @param SoapEnvelopeEvent $event
     */
    public function processEnveloppe(SoapEnvelopeEvent $event)
    {
        $this->updateRequestAttribute('soap_results', $this->createSoapResult($event));
    }

    /**
     * @param SoapExceptionEvent $event
     */
    public function processException(SoapExceptionEvent $event)
    {
        $this->updateRequestAttribute('soap_exceptions', $this->createSoapException($event));
    }

    /**
     * @return int
     */
    private function getDuration()
    {
        if (!$this->stopWatch->isStarted(self::STOPWATCH_IDENTIFIER)) {
            return 0;
        }

        return $this
            ->stopWatch
            ->stop(self::STOPWATCH_IDENTIFIER)
            ->getDuration();
    }

    /**
     * @param SoapEnvelopeEvent $event
     *
     * @return SoapResult
     */
    private function createSoapResult(SoapEnvelopeEvent $event)
    {
        return new SoapResult(
            $event->getWsdl(),
            $event->getFunctionName(),
            $event->getRequestEnvelope(),
            $event->getResponseEnvelope(),
            $this->getDuration()
        );
    }

    /**
     * @param SoapExceptionEvent $event
     *
     * @return \SoapBundle\Exception\SoapException
     */
    private function createSoapException(SoapExceptionEvent $event)
    {
        if ($this->stopWatch->isStarted(self::STOPWATCH_IDENTIFIER)) {
            $this->stopWatch->stop(self::STOPWATCH_IDENTIFIER);
        }

        return new SoapException(
            $event->getWsdl(),
            $event->getFunctionName(),
            $event->getException()
        );
    }

    /**
     * @param string $attribute
     * @param mixed  $data
     */
    private function updateRequestAttribute($attribute, $data)
    {
        $currentRequest = $this->requestStack->getCurrentRequest();

        if (!$currentRequest) {
            return;
        }

        $entries = $currentRequest
            ->attributes
            ->get($attribute, []);

        $entries[] = $data;

        $currentRequest
            ->attributes
            ->set($attribute, $entries);
    }
}
