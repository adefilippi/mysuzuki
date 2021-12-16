<?php

namespace SoapBundle\Events;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 */
class SoapCallEvent extends SoapEvent
{
    /** @var mixed */
    protected $response;

    /**
     * @return mixed
     */
    public function getResponse()
    {
        return $this->response;
    }

    /**
     * @param mixed $response
     */
    public function setResponse($response)
    {
        $this->response = $response;
    }
}
