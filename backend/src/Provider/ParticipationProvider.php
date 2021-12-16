<?php

namespace App\Provider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\User;
use App\Entity\Participation;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @author svianney <vianney@widop.com>
 */
class ParticipationProvider implements CollectionDataProviderInterface, RestrictedDataProviderInterface
{
    /** @var TokenStorageInterface */
    protected $storage;

    /**
     * @param TokenStorageInterface $storage
     */
    public function __construct(TokenStorageInterface $storage)
    {
        $this->storage = $storage;
    }

    /**
     * {@inheritdoc}
     */
    public function getCollection(string $resourceClass, string $operationName = null)
    {
        return $this
            ->storage
            ->getToken()
            ->getUser()
            ->getParticipations()
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return Participation::class === $resourceClass && $operationName === 'get';
    }
}
