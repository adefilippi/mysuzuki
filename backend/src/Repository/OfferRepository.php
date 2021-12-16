<?php

namespace App\Repository;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\Expr\Join;

class OfferRepository extends EntityRepository
{
    public function findNotExpired()
    {
        $queryBuilder = $this->createQueryBuilder('offer');

        return $queryBuilder
            ->where(':date <= offer.endDate')
            ->andWhere("offer.targetType = 'everyone'")
            ->orderBy('offer.startDate', 'DESC')
            ->setParameter('date', new DateTime('now'))
        ;
    }

    public function findNotExpiredByUser($number, $user)
    {
        $queryBuilder = $this->createQueryBuilder('offer');

        return $queryBuilder
            ->leftJoin('offer.users', 'user', Join::WITH, 'user = :user')
            ->where(
                $queryBuilder->expr()->orX("offer.targetType = 'everyone'", 'user.id = :user')
            )
            ->andWhere('offer.endDate >= :date')
            ->andWhere('offer.startDate <= :date')
            ->orderBy('offer.startDate', 'DESC')
            ->setMaxResults($number)
            ->setParameter('date', new DateTime('now'))
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findAllByUser(User $user)
    {
        $queryBuilder = $this->createQueryBuilder('offer');

        return $queryBuilder
            ->leftJoin('offer.users', 'user', Join::WITH, 'user = :user')
            ->where('user.id = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult()
        ;
    }
}
