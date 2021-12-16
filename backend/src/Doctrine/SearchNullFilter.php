<?php

declare(strict_types=1);

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter as BaseSearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryBuilderHelper;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Exception\InvalidArgumentException;
use Doctrine\ORM\QueryBuilder;

/**
 * This filter enable filtering on associations like the SearchFilter 'exact' strategy does.
 * However, here we also include empty associations.
 *
 * The code of the filterProperty method comes almost entirely from ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter
 * Only the last few lines are changed to include empty associations.
 */
final class SearchNullFilter extends BaseSearchFilter
{
    /**
     * {@inheritdoc}
     */
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null): void
    {
        if (
            null === $value ||
            !$this->isPropertyEnabled($property, $resourceClass) ||
            !$this->isPropertyMapped($property, $resourceClass, true)
        ) {
            return;
        }

        $alias = $queryBuilder->getRootAliases()[0];
        $field = $property;

        if ($this->isPropertyNested($property, $resourceClass)) {
            list($alias, $field, $associations) = $this->addJoinsForNestedProperty($property, $alias, $queryBuilder, $queryNameGenerator, $resourceClass);
            $metadata = $this->getNestedMetadata($resourceClass, $associations);
        } else {
            $metadata = $this->getClassMetadata($resourceClass);
        }

        $values = $this->normalizeValues((array)$value);

        if (empty($values)) {
            $this->logger->notice('Invalid filter ignored', [
                'exception' => new InvalidArgumentException(sprintf('At least one value is required, multiple values should be in "%1$s[]=firstvalue&%1$s[]=secondvalue" format', $property)),
            ]);

            return;
        }

        $caseSensitive = true;

        if ($metadata->hasField($field)) {
            if ('id' === $field) {
                $values = array_map([$this, 'getIdFromValue'], $values);
            }

            if (!$this->hasValidValues($values, $this->getDoctrineFieldType($property, $resourceClass))) {
                $this->logger->notice('Invalid filter ignored', [
                    'exception' => new InvalidArgumentException(sprintf('Values for field "%s" are not valid according to the doctrine type.', $field)),
                ]);

                return;
            }

            $strategy = $this->properties[$property] ?? self::STRATEGY_EXACT;

            // prefixing the strategy with i makes it case insensitive
            if (0 === strpos($strategy, 'i')) {
                $strategy = substr($strategy, 1);
                $caseSensitive = false;
            }

            if (1 === \count($values)) {
                $this->addWhereByStrategy($strategy, $queryBuilder, $queryNameGenerator, $alias, $field, $values[0], $caseSensitive);

                return;
            }

            if (self::STRATEGY_EXACT !== $strategy) {
                $this->logger->notice('Invalid filter ignored', [
                    'exception' => new InvalidArgumentException(sprintf('"%s" strategy selected for "%s" property, but only "%s" strategy supports multiple values', $strategy, $property, self::STRATEGY_EXACT)),
                ]);

                return;
            }

            $wrapCase = $this->createWrapCase($caseSensitive);
            $valueParameter = $queryNameGenerator->generateParameterName($field);

            $queryBuilder
                ->andWhere(sprintf($wrapCase('%s.%s') . ' IN (:%s)', $alias, $field, $valueParameter))
                ->setParameter($valueParameter, $caseSensitive ? $values : array_map('strtolower', $values));
        }

        // metadata doesn't have the field, nor an association on the field
        if (!$metadata->hasAssociation($field)) {
            return;
        }

        $values = array_map([$this, 'getIdFromValue'], $values);

        if (!$this->hasValidValues($values, $this->getDoctrineFieldType($property, $resourceClass))) {
            $this->logger->notice('Invalid filter ignored', [
                'exception' => new InvalidArgumentException(sprintf('Values for field "%s" are not valid according to the doctrine type.', $field)),
            ]);

            return;
        }

        $association = $field;
        $valueParameter = $queryNameGenerator->generateParameterName($association);

        if ($metadata->isCollectionValuedAssociation($association)) {
            $associationAlias = QueryBuilderHelper::addJoinOnce($queryBuilder, $queryNameGenerator, $alias, $association);
            $associationField = 'id';
        } else {
            $associationAlias = $alias;
            $associationField = $field;
        }

        // Only the following lines were changed from the base SearchFilter
        if (1 === \count($values)) {
            $queryBuilder
                ->andWhere(sprintf('(%s.%s = :%s  OR %s.%s IS EMPTY)', $associationAlias, $associationField, $valueParameter, $alias, $field))
                ->setParameter($valueParameter, $values[0]);
        } else {
            $queryBuilder
                ->andWhere(sprintf('(%s.%s IN (:%s) OR %s.%s IS EMPTY)', $associationAlias, $associationField, $valueParameter, $alias, $field))
                ->setParameter($valueParameter, $values);
        }
    }
}
