<?php

namespace SoapBundle\Events;

use SoapBundle\Client\SoapClient;
use Symfony\Component\EventDispatcher\Event;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 */
class SoapEvent extends Event
{
    /** @var \SoapBundle\Client\SoapClient */
    protected $soapClient;

    /** @var string */
    protected $wsdl;

    /** @var string */
    protected $function_name;

    /** @var array */
    private $arguments;

    /**
     * @param \SoapBundle\Client\SoapClient $soapClient
     * @param string                        $wsdl
     * @param string                        $function_name
     * @param array                         $arguments
     */
    public function __construct(SoapClient $soapClient, $wsdl, $function_name, $arguments = [])
    {
        $this->soapClient = $soapClient;
        $this->wsdl = $wsdl;
        $this->function_name = $function_name;
        $this->arguments = $arguments;
    }

    /**
     * @param \SoapBundle\Client\SoapClient $soapClient
     */
    public function setSoapClient(SoapClient $soapClient)
    {
        $this->soapClient = $soapClient;
    }

    /**
     * @return \SoapBundle\Client\SoapClient
     */
    public function getSoapClient()
    {
        return $this->soapClient;
    }

    /**
     * @param string $function_name
     */
    public function setFunctionName($function_name)
    {
        $this->function_name = $function_name;
    }

    /**
     * @return string
     */
    public function getFunctionName()
    {
        return $this->function_name;
    }

    /**
     * @param string $wsdl
     */
    public function setWsdl($wsdl)
    {
        $this->wsdl = $wsdl;
    }

    /**
     * @return string
     */
    public function getWsdl()
    {
        return $this->wsdl;
    }

    /**
     * @return array
     */
    public function getArguments()
    {
        return $this->arguments;
    }

    /**
     * @param array $arguments
     */
    public function setArguments($arguments)
    {
        $this->arguments = $arguments;
    }
}
