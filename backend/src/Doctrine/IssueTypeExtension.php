<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\IssueType;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
final class IssueTypeExtension implements QueryCollectionExtensionInterface
{
    const CONNECTED = 'connected';
    const DISCONNECTED = 'disconnected';
    const BOTH = 'connected_disconnected';

    /** @var TokenStorageInterface */
    private $tokenStorage;

    /**
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * {@inheritdoc}
     */
    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {
        if ($resourceClass !== IssueType::class) {
            return;
        }

        $user = $this->tokenStorage->getToken()->getUser();

        $when = empty($user) ? self::DISCONNECTED : self::CONNECTED;

        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere("$rootAlias.appearsWhen = :when OR $rootAlias.appearsWhen = :both");
        $queryBuilder->setParameter('when', $when);
        $queryBuilder->setParameter('both', self::BOTH);
    }
}
