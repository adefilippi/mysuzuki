<?php

namespace SoapBundle\Events;

use Symfony\Component\EventDispatcher\Event;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 */
class SoapWSDLEvent extends Event
{
    /** @var string */
    protected $wsdl;

    /**
     * @param string $wsdl
     */
    public function __construct($wsdl)
    {
        $this->wsdl = $wsdl;
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
}
