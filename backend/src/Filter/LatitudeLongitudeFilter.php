<?php

namespace App\Filter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\FilterInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
final class LatitudeLongitudeFilter implements FilterInterface
{
    /** @var null|RequestStack */
    protected $requestStack;

    /**
     * @param RequestStack $requestStack
     * @param array|null   $properties
     */
    public function __construct(RequestStack $requestStack, array $properties = null)
    {
        $this->requestStack = $requestStack;
    }

    /**
     * {@inheritdoc}
     */
    public function getDescription(string $resourceClass): array
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function apply(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        /** @var ParameterBag $query */
        $query = $this->requestStack->getCurrentRequest()->query;

        /** @var string $latitude */
        $latitude = $query->get('latitude');
        /** @var float $longitude */
        $longitude = $query->get('longitude');
        /** @var float $distance */
        $distance= $query->get('distance');

        if(!$latitude && !$longitude && !$distance) {
            return;
        }

        if (!$latitude || !$longitude || !$distance) {
            throw new BadRequestHttpException("Latitude, longitude and distance must not be null to use this filter");
        }

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $latitudeField = $rootAlias . '.coordinates.latitude';
        $longitudeField = $rootAlias . '.coordinates.longitude';

        $queryBuilder
            ->addSelect(sprintf(
                '(
                    6371 * acos (
                      cos (radians( :latitude ))
                      * cos(radians( %s ))
                      * cos(radians( %s ) - radians( :longitude ))
                      + sin (radians( :latitude ))
                      * sin(radians( %s ))
                    )
                ) as HIDDEN distance', $latitudeField, $longitudeField, $latitudeField));

        $queryBuilder
            ->andWhere(sprintf(
                '(
                    6371 * acos (
                      cos (radians( :latitude ))
                      * cos(radians( %s ))
                      * cos(radians( %s ) - radians( :longitude ))
                      + sin (radians( :latitude ))
                      * sin(radians( %s ))
                    )
                ) < :distance', $latitudeField, $longitudeField, $latitudeField)
            )
            ->orderBy('distance', 'ASC')
            ->setParameter('latitude', $latitude)
            ->setParameter('longitude', $longitude)
            ->setParameter('distance', $distance);
    }
}
