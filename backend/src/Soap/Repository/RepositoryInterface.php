<?php

namespace App\Soap\Repository;

/**
 * @author svianney <vianney@widop.com>
 */
interface RepositoryInterface
{
    /**
     * @param object $object
     *
     * @return object
     */
    public function pull($object);

    /**
     * @param object $object
     * @param array $modified
     */
    public function push($object, $modified = []);
}
