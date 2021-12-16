<?php

namespace App\Repository;

use DateTime;
use Doctrine\ORM\EntityRepository;

class FeaturedContentRepository extends EntityRepository
{
    public function findAllCurrent()
    {
        $queryBuilder = $this->createQueryBuilder('featuredContent');

        return $queryBuilder
            ->leftJoin('featuredContent.offer', 'offer')
            ->where(
                $queryBuilder->expr()->andX(
                    "featuredContent.type = 'offer'",
                    'offer.startDate <= :date',
                    'offer.endDate >= :date'
                )
            )
            ->leftJoin('featuredContent.article', 'article')
            ->orWhere(
                $queryBuilder->expr()->andX(
                    "featuredContent.type = 'article'",
                    'article.publishDate <= :date'
                )
            )
            ->leftJoin('featuredContent.game', 'game')
            ->orWhere(
                $queryBuilder->expr()->andX(
                    "featuredContent.type = 'game'",
                    'game.startDate <= :date',
                    'game.endDate >= :date'
                )
            )
            ->setParameter('date', new DateTime('now'))
            ->getQuery()
            ->getResult()
        ;
    }
}
