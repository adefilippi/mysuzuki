<?php

namespace App\Repository;
use Doctrine\ORM\EntityRepository;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class VehicleFileRepository extends EntityRepository
{
    /**
     * @param $carLabel
     * @param $date
     *
     * @return mixed
     */
    public function findOneByMatchingLabel($carLabel, $date)
    {
        $queryBuilder = $this->createQueryBuilder('f');

        $result = $queryBuilder
            ->andWhere(':label = f.carLabel')
            ->andWhere('f.firstDate <= :date OR f.firstDate IS NULL')
            ->orderBy('f.firstDate', 'DESC')
            ->setMaxResults(1)
            ->setParameter('label', $carLabel)
            ->setParameter('date', $date)
            ->getQuery()
            ->getResult();


        if (empty($result) && $carLabel !== 'default') {
            $queryBuilder = $this->createQueryBuilder('f');

            $result = $queryBuilder
                ->andWhere(':label = f.carLabel')
                ->setParameter('label', 'default')
                ->setMaxResults(1)
                ->getQuery()
                ->getResult();
        }

        return array_shift($result);
    }
}
