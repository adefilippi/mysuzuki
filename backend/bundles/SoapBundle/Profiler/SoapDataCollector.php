<?php

namespace SoapBundle\Profiler;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\DataCollector\DataCollector;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class SoapDataCollector extends DataCollector
{
    /**
     * {@inheritdoc}
     */
    public function collect(Request $request, Response $response, \Exception $exception = null)
    {
        $this->data = [
            'soap_results'    => $request->attributes->get('soap_results', []),
            'soap_exceptions' => $request->attributes->get('soap_exceptions', []),
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function reset()
    {
        $this->data = [];
    }

    /**
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @return \SoapBundle\Model\SoapResult[]
     */
    public function getSoapResults()
    {
        return $this->data['soap_results'];
    }

    /**
     * @return \SoapBundle\Exception\SoapException[]
     */
    public function getSoapExceptions()
    {
        return $this->data['soap_exceptions'];
    }

    /**
     * @return float|int
     */
    public function getTotalDuration()
    {
        $duration = 0;

        foreach ($this->getSoapResults() as $result) {
            $duration += $result->duration;
        }

        return $duration;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'soap';
    }
}
