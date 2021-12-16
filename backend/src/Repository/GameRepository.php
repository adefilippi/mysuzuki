<?php

namespace App\Repository;

use DateTime;
use Doctrine\ORM\EntityRepository;

class GameRepository extends EntityRepository
{
    public function findNotExpired()
    {
        $queryBuilder = $this->createQueryBuilder('game');

        return $queryBuilder
            ->where(':date <= game.endDate')
            ->orderBy('game.startDate', 'DESC')
            ->setParameter('date', new DateTime('now'))
        ;
    }

    public function findLatestValidMaxResult(int $number)
    {
        $queryBuilder = $this->createQueryBuilder('game');

        return $queryBuilder
            ->where('game.endDate >= :date')
            ->andWhere('game.startDate <= :date')
            ->orderBy('game.startDate', 'DESC')
            ->setMaxResults($number)
            ->setParameter('date', new DateTime('now'))
            ->setMaxResults($number)
            ->getQuery()
            ->getResult()
        ;
    }
}
