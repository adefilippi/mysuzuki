<?php

namespace SoapBundle\Events;

use SoapBundle\Client\SoapClient;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 */
class SoapEnvelopeEvent extends SoapEvent
{
    /** @var string */
    protected $requestEnvelope;

    /** @var string */
    protected $responseEnvelope;

    /** @var array */
    protected $extra;

    /**
     * @param \SoapBundle\Client\SoapClient $soapClient
     * @param string                        $wsdl
     * @param string                        $function_name
     * @param array                         $arguments
     * @param string                        $requestEnvelope
     * @param string                        $responseEnvelope
     * @param array                         $extra
     */
    public function __construct(
        SoapClient $soapClient,
        $wsdl,
        $function_name,
        $arguments,
        $requestEnvelope,
        $responseEnvelope,
        $extra = []
    ) {
        parent::__construct($soapClient, $wsdl, $function_name, $arguments);

        $this->requestEnvelope = $requestEnvelope;
        $this->responseEnvelope = $responseEnvelope;
        $this->extra = $extra;
    }

    /**
     * @param string $requestEnvelope
     */
    public function setRequestEnvelope($requestEnvelope)
    {
        $this->requestEnvelope = $requestEnvelope;
    }

    /**
     * @return string
     */
    public function getRequestEnvelope()
    {
        return $this->requestEnvelope;
    }

    /**
     * @param string $responseEnvelope
     */
    public function setResponseEnvelope($responseEnvelope)
    {
        $this->responseEnvelope = $responseEnvelope;
    }

    /**
     * @return string
     */
    public function getResponseEnvelope()
    {
        return $this->responseEnvelope;
    }

    /**
     * @param string|null $index
     *
     * @return array
     */
    public function getExtra($index = null)
    {
        if (null !== $index && isset($this->extra[$index])) {
            return $this->extra[$index];
        } elseif (null !== $index) {
            return [];
        }

        return $this->extra;
    }
}
