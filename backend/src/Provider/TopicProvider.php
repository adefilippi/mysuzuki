<?php

namespace App\Provider;

use ApiPlatform\Core\DataProvider\CollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\Topic;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class TopicProvider implements CollectionDataProviderInterface, RestrictedDataProviderInterface
{
    /**
     * @var ManagerRegistry
     */
    private $managerRegistry;

    /**
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(ManagerRegistry $managerRegistry)
    {
        $this->managerRegistry = $managerRegistry;
    }

    /**
     * @inheritDoc
     */
    public function getCollection(string $resourceClass, string $operationName = null)
    {
        return $this->managerRegistry->getRepository(Topic::class)->getBySortableGroups();
    }

    /**
     * {@inheritdoc}
     */
    public function supports(string $resourceClass, string $operationName = null, array $context = []) : bool
    {
        return Topic::class === $resourceClass;
    }
}
