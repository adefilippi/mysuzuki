<?php

namespace App\Repository;
use Doctrine\ORM\EntityRepository;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class EnergyAwareVehicleFileRepository extends EntityRepository
{
    /**
     * @param $carLabel
     * @param $date
     *
     * @return mixed
     */
    public function findOneByMatchingLabel($carLabel, $date, $energy)
    {
        $queryBuilder = $this->createQueryBuilder('f');

        $result = $queryBuilder
            ->andWhere(':label = f.carLabel')
            ->andWhere('f.energy = :energy OR f.energy IS NULL')
            ->andWhere('f.firstDate <= :date OR f.firstDate IS NULL')
            ->orderBy('f.energy', 'DESC')
            ->addOrderBy('f.firstDate', 'DESC')
            ->setMaxResults(1)
            ->setParameter('label', $carLabel)
            ->setParameter('energy', $energy)
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

    public function findFourByMatchingLabel($carLabel, $date, $energy)
    {
        $queryBuilder = $this->createQueryBuilder('f');

        $result = $queryBuilder
            ->andWhere(':label = f.carLabel')
            ->andWhere('f.energy = :energy OR f.energy IS NULL')
            ->andWhere('f.firstDate <= :date OR f.firstDate IS NULL')
            ->orderBy('f.energy', 'DESC')
            ->addOrderBy('f.firstDate', 'DESC')
            ->setMaxResults(4)
            ->setParameter('label', $carLabel)
            ->setParameter('energy', $energy)
            ->setParameter('date', $date)
            ->getQuery()
            ->getResult();

        return $result;
    }
}
