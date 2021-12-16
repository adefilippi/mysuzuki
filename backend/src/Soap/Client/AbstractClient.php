<?php

namespace App\Soap\Client;

use SoapBundle\Client\SoapClient;
use SoapBundle\Factory\SoapFactory;

/**
 * @author svianney <vianney@widop.com>
 */
abstract class AbstractClient
{
    /** @var SoapFactory */
    private $factory;

    /** @var string */
    private $wsdl;

    /** @var array */
    private $config;

    /** @var SoapClient */
    private $client;

    /**
     * @param SoapFactory $factory
     * @param string $wsdl
     * @param array $config
     */
    public function __construct(SoapFactory $factory, $wsdl, array $config = [])
    {
        $this->factory = $factory;
        $this->wsdl = $wsdl;
        $this->config = $config;
    }

    /**
     * @return SoapClient
     */
    public function create()
    {
        if (null === $this->client) {
            $this->client = $this->factory->create($this->wsdl, $this->config);
        }

        return $this->client;
    }
}
