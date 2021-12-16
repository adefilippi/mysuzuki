<?php

namespace SoapBundle\Exception;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class SoapException
{
    /** @var string */
    public $wsdl;

    /** @var string */
    public $method;

    /** @var string */
    public $message;

    /** @var string */
    public $stackTrace;

    /**
     * @param string     $wsdl
     * @param string     $method
     * @param \Exception $e
     */
    public function __construct($wsdl, $method, \Exception $e)
    {
        $this->wsdl = $wsdl;
        $this->method = $method;
        $this->message = trim($e->getMessage());
        $this->stackTrace = trim($e->getTraceAsString());
    }
}
