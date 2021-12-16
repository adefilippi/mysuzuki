<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
final class ArticleOfferDateExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    const PUBLISH_DATE_PROPERTY = 'publishDate';
    const START_DATE_PROPERTY = 'startDate';
    const END_DATE_PROPERTY = 'endDate';

    /**
     * {@inheritdoc}
     */
    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    /**
     * {@inheritdoc}
     */
    public function applyToItem(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        array $identifiers,
        string $operationName = null,
        array $context = []
    ) {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    /**
     *
     * @param QueryBuilder $queryBuilder
     * @param string       $resourceClass
     */
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        $rootAlias = $queryBuilder->getRootAliases()[0];
        $date = new \DateTime();

        if (property_exists($resourceClass, self::PUBLISH_DATE_PROPERTY)) {
            $startProperty = self::PUBLISH_DATE_PROPERTY;
        } elseif (property_exists($resourceClass, self::START_DATE_PROPERTY)) {
            $startProperty = self::START_DATE_PROPERTY;
        }

        if (property_exists($resourceClass, self::END_DATE_PROPERTY)) {
            $endProperty = self::END_DATE_PROPERTY;
            $queryBuilder->andWhere("$rootAlias.$endProperty >= :date");
            $queryBuilder->setParameter('date', $date);
        }

        if (isset($startProperty)) {
            $queryBuilder->andWhere("$rootAlias.$startProperty <= :date");
            $queryBuilder->setParameter('date', $date);
        }
    }
}
