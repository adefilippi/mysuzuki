<?php

namespace SoapBundle\Events;

use SoapBundle\Client\SoapClient;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 */
class SoapRequestEvent extends SoapEvent
{
    /** @var string */
    private $request;

    /** @var string */
    private $response;

    /**
     * @param \SoapBundle\Client\SoapClient $soapClient
     * @param string                        $wsdl
     * @param string                        $function_name
     * @param array                         $arguments
     * @param string                        $request
     */
    public function __construct(SoapClient $soapClient, $wsdl, $function_name, $arguments, $request)
    {
        $this->request = $request;

        parent::__construct($soapClient, $wsdl, $function_name, $arguments);
    }

    /**
     * @return string
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * @param string $request
     */
    public function setRequest($request)
    {
        $this->request = $request;
    }

    /**
     * @return string
     */
    public function getResponse()
    {
        return $this->response;
    }

    /**
     * @param string $response
     */
    public function setResponse($response)
    {
        $this->response = $response;
    }
}
