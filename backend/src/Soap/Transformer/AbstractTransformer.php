<?php

namespace App\Soap\Transformer;

use Doctrine\Common\Persistence\ManagerRegistry;
use SoapBundle\Transformer\TransformerInterface;
use SoapBundle\Transformer\TransformerManager;

/**
 * @author svianney <vianney@widop.com>
 */
abstract class AbstractTransformer implements TransformerInterface
{
    const SOURCE_ID = 32;

    /** @var TransformerManager */
    protected $transformer;

    /** @var ManagerRegistry */
    protected $registry;

    /**
     * @param TransformerManager $transformer
     * @param ManagerRegistry    $registry
     */
    public function __construct(TransformerManager $transformer, ManagerRegistry $registry)
    {
        $this->transformer = $transformer;
        $this->registry = $registry;
    }
}
