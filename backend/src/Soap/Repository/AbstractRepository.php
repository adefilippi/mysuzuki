<?php

namespace App\Soap\Repository;

use App\Soap\Client\DPSWebServiceClient;
use SoapBundle\Exception\SoapTimeoutException;
use SoapBundle\Transformer\TransformerManager;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * @author svianney <vianney@widop.com>
 */
abstract class AbstractRepository implements RepositoryInterface
{
    /** @var DPSWebServiceClient */
    private $factory;

    /** @var TransformerManager */
    protected $transformer;

    /**
     * @param DPSWebServiceClient $factory
     * @param TransformerManager $transformer
     */
    public function __construct(DPSWebServiceClient $factory, TransformerManager $transformer)
    {
        $this->factory = $factory;
        $this->transformer = $transformer;
    }

    /**
     * @param $method
     * @param $params
     *
     * @return mixed|string
     */
    final protected function request($method, $params)
    {
        try {
            $response = $this->factory->create()->__soapCall($method, [$params]);
        } catch (SoapTimeoutException $e) {
            return false;
        } catch (\SoapFault $e) {
            throw new BadRequestHttpException($this->parseSoapFaultMessage($e->getMessage()));
        }

        return $response;
    }

    /**
     * {@inheritdoc}
     */
    public function push($object, $modified = [])
    {
        return $object;
    }

    /**
     * {@inheritdoc}
     */
    public function pull($object)
    {
        return $object;
    }

    /**
     * @param $message
     * @return string
     */
    private function parseSoapFaultMessage($message)
    {
        $str = str_replace('System.Web.Services.Protocols.SoapException:','', $message);
        return trim(substr($str,0,strpos($str,'.')));
    }
}
