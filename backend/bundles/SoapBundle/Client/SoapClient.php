<?php

namespace SoapBundle\Client;

use Psr\Log\LoggerInterface;
use SoapBundle\Events\SoapCallEvent;
use SoapBundle\Events\SoapEnvelopeEvent;
use SoapBundle\Events\SoapEvents;
use SoapBundle\Events\SoapExceptionEvent;
use SoapBundle\Events\SoapRequestEvent;
use SoapBundle\Exception\SoapTimeoutException;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class SoapClient extends \SoapClient
{
    /** @var string */
    protected $wsdl;

    /** @var \Psr\Log\LoggerInterface */
    protected $logger;

    /** @var \Symfony\Component\EventDispatcher\EventDispatcherInterface */
    protected $eventDispatcher;

    /** @var string */
    protected $lastAction;

    /** @var array */
    protected $lastArguments = [];

    /**
     * {@inheritdoc}
     */
    public function __construct(
        $wsdl,
        array $options,
        LoggerInterface $logger,
        EventDispatcherInterface $eventDispatcher
    ) {
        parent::__construct($wsdl, $options);

        $this->logger = $logger;
        $this->eventDispatcher = $eventDispatcher;

        $this->wsdl = $wsdl;
    }

    /**
     * {@inheritdoc}
     */
    public function __soapCall($function_name, $arguments, $options = null, $input_headers = null, &$output_headers = null)
    {
        $time_start = microtime(true);

        // TODO ne faire que sous certaines conditions (ex mock ou request logger d'activé)
        $this->lastAction = $function_name;
        $this->lastArguments = $arguments;

        try {
            $event = $this->eventDispatcher->dispatch(SoapEvents::PRE_CALL, new SoapCallEvent(
                $this,
                $this->wsdl,
                $function_name,
                $arguments
            ));

            if ($event->getResponse()) {
                return $event->getResponse();
            }

            $soapCall = parent::__soapCall($function_name, $arguments, $options, $input_headers, $output_headers);
        } catch (\Exception $e) {
            $time_request = (microtime(true) - $time_start);

            if ($time_request > ini_get('default_socket_timeout')) {
                $e = new SoapTimeoutException($e);
            }

            $this->logger->error('Code: '.$e->getCode().' Message: '.$e->getMessage());

            $this->eventDispatcher->dispatch(SoapEvents::EXCEPTION, new SoapExceptionEvent(
                $this,
                $this->wsdl,
                $function_name,
                $e
            ));

            throw $e;
        } finally {
            $time_request = round((microtime(true) - $time_start), 2);

            $request = $this->__getLastRequest();
            $response = $this->__getLastResponse();

            $responseLength = strlen($response);
            if ($responseLength > 3000000) {
                $response = "Too large to log ($responseLength).";
            }

            $this->logger->debug("[$function_name] $request");
            $this->logger->info("[$function_name]($time_request): $response");

            $extraData = [];

            // TODO ne faire que sous certaines conditions (ex mock ou request logger d'activé)
            $extraData['arguments'] = $arguments;

            $this->eventDispatcher->dispatch(SoapEvents::POST_CALL, new SoapEnvelopeEvent(
                $this,
                $this->wsdl,
                $function_name,
                $arguments,
                $request,
                $response,
                $extraData
            ));
        }

        return $soapCall;
    }

    /** {@inheritdoc} */
    public function __doRequest($request, $location, $action, $version, $one_way = 0)
    {
        $event = $this->eventDispatcher->dispatch(SoapEvents::REQUEST, new SoapRequestEvent(
            $this,
            $this->wsdl,
            $this->lastAction,
            $this->lastArguments,
            $request
        ));

        if ($event->getResponse()) {
            return $event->getResponse();
        }

        return parent::__doRequest($request, $location, $action, $version, $one_way);
    }
}
