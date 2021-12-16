<?php

namespace App\Soap\Repository;

/**
 * @author svianney <vianney@widop.com>
 */
class ObjectRepository extends AbstractRepository
{
    /**
     * {@inheritdoc}
     */
    public function pull($object)
    {
        return $object;
    }
}
