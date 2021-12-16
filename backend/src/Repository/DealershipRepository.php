<?php

namespace App\Repository;

use App\Entity\Dealership;
use Doctrine\ORM\EntityRepository;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class DealershipRepository extends EntityRepository
{
    /**
     * @return array
     */
    public function findAllAssoc()
    {
        /**
         * @var Dealership[] $dealerships
         */
        $dealerships = $this->findAll();

        $allAssoc = [];

        foreach ($dealerships as $dealership) {
            $allAssoc[$dealership->getExternalId()] = $dealership;
        }

        return $allAssoc;
    }
}
