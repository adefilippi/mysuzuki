<?php

namespace SoapBundle\Factory;

use Psr\Log\LoggerInterface;
use SoapBundle\Client\SoapClient;
use SoapBundle\Events\SoapEvents;
use SoapBundle\Events\SoapWSDLEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class SoapFactory
{
    /** @var \Psr\Log\LoggerInterface */
    protected $logger;

    /** @var \Symfony\Component\EventDispatcher\EventDispatcherInterface */
    protected $eventDispatcher;

    /**
     * @param \Symfony\Component\EventDispatcher\EventDispatcherInterface $eventDispatcher
     * @param \Psr\Log\LoggerInterface                                    $logger
     */
    public function __construct(
        EventDispatcherInterface $eventDispatcher,
        LoggerInterface $logger
    ) {
        $this->eventDispatcher = $eventDispatcher;
        $this->logger = $logger;
    }

    /**
     * @param string                   $wsdl
     * @param array                    $config
     * @param \Psr\Log\LoggerInterface $logger
     *
     * @return \SoapBundle\Client\SoapClient
     */
    public function create($wsdl, $config = [], LoggerInterface $logger = null)
    {
        $eventResponse = $this->eventDispatcher->dispatch(SoapEvents::SET_WSDL, new SoapWSDLEvent($wsdl));
        $wsdl = $eventResponse->getWsdl();

        return new SoapClient(
            $wsdl,
            array_merge($this->defaultConfig(), $config),
            $logger ?: $this->logger,
            $this->eventDispatcher
        );
    }

    /**
     * @return array
     */
    protected function defaultConfig()
    {
        return [
            'trace'          => 1,
            'stream_context' => stream_context_create(['http' => ['header' => 'Accept-Language: en, fr']]),
            'features'       => SOAP_SINGLE_ELEMENT_ARRAYS,
            'ssl' => [
                // set some SSL/TLS specific options
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ]
        ];
    }
}
