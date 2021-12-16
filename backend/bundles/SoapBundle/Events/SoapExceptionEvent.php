<?php

namespace SoapBundle\Events;

use SoapBundle\Client\SoapClient;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 */
class SoapExceptionEvent extends SoapEvent
{
    /** @var \Exception */
    protected $exception;

    /**
     * @param \SoapBundle\Client\SoapClient $soapClient
     * @param string                        $wsdl
     * @param string                        $function_name
     * @param \Exception                    $exception
     */
    public function __construct(SoapClient $soapClient, $wsdl, $function_name, \Exception $exception)
    {
        parent::__construct($soapClient, $wsdl, $function_name);

        $this->exception = $exception;
    }

    /**
     * @param \Exception $exception
     */
    public function setException(\Exception $exception)
    {
        $this->exception = $exception;
    }

    /**
     * @return \Exception
     */
    public function getException()
    {
        return $this->exception;
    }
}
