<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\ORM\EntityRepository;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class ArticleRepository extends EntityRepository
{
    /**
     * @param int $number
     * @param Article $currentArticle
     *
     * @return mixed
     */
    public function findLatest($number, $currentArticle)
    {
        $queryBuilder = $this->createQueryBuilder('a');

        return $queryBuilder
            ->where('a.id != :id')
            ->andWhere("a.publishDate <= :date")
            ->orderBy('a.publishDate', 'DESC')
            ->setMaxResults($number)
            ->setParameter('id', $currentArticle->getId())
            ->setParameter('date', new \DateTime())
            ->getQuery()
            ->getResult()
        ;
    }

    public function findLatestMaxResults(int $number)
    {
        return $this->findLatestAll()
            ->setMaxResults($number)
            ->getQuery()
            ->getResult()
        ;
    }

    public function findLatestAll()
    {
        $queryBuilder = $this->createQueryBuilder('article');

        return $queryBuilder
            ->where('article.publishDate <= :date')
            ->orderBy('article.publishDate', 'DESC')
            ->setParameter('date', new \DateTime())
        ;
    }
}
