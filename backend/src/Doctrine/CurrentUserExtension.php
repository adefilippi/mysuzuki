<?php

namespace App\Doctrine;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Contract\OwnedInterface;
use App\Entity\User;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

/**
 * @author svianney <vianney@widop.com>
 */
final class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    const USER_PROPERTY = 'user';
    const OWNER_PROPERTY = 'owner';

    /** @var TokenStorageInterface */
    private $tokenStorage;

    /** @var AuthorizationCheckerInterface */
    private $authorizationChecker;

    /**
     * @param TokenStorageInterface $tokenStorage
     * @param AuthorizationCheckerInterface $checker
     */
    public function __construct(TokenStorageInterface $tokenStorage, AuthorizationCheckerInterface $checker)
    {
        $this->tokenStorage = $tokenStorage;
        $this->authorizationChecker = $checker;
    }

    /**
     * {@inheritdoc}
     */
    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    )
    {
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
    )
    {
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

        if (property_exists($resourceClass, self::OWNER_PROPERTY)) {
            $property = self::OWNER_PROPERTY;
        } elseif (property_exists($resourceClass, self::USER_PROPERTY)) {
            $property = self::USER_PROPERTY;
        }

        $user = $this->tokenStorage->getToken()->getUser();

        if (is_a($resourceClass, OwnedInterface::class, true)) {
            $queryBuilder->leftJoin("$rootAlias.users", 'u', Join::WITH, 'u.id = :current_user');
            $queryBuilder->andWhere(
                $queryBuilder->expr()->orX("$rootAlias.targetType = 'everyone'", "u.id = :current_user")
            );
            $queryBuilder->setParameter('current_user', $user);
            return;
        }
        elseif (isset($property) && $user instanceof User) {
            $queryBuilder->andWhere("$rootAlias.$property = :current_user");
            $queryBuilder->setParameter('current_user', $user);
        }
    }
}
