<?php

namespace SoapBundle\Model;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class SoapResult
{
    /** @var string */
    public $wsdl;

    /** @var string */
    public $method;

    /** @var string */
    public $request;

    /** @var string */
    public $response;

    /** @var float */
    public $duration;

    /**
     * @param string $wsdl
     * @param string $method
     * @param string $request
     * @param string $response
     * @param float  $duration
     */
    public function __construct($wsdl, $method, $request, $response, $duration)
    {
        $this->wsdl = $wsdl;
        $this->method = $method;
        $this->request = $request;
        $this->response = $response;
        $this->duration = round($duration, 2);
    }
}
