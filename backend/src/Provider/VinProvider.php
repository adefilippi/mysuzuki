<?php

namespace App\Provider;

use ApiPlatform\Core\DataProvider\ItemDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\User;
use App\Entity\Vin;
use App\Exception\NameNotFoundException;
use App\Soap\Manager\ObjectManager;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @author svianney <vianney@widop.com>
 */
class VinProvider implements ItemDataProviderInterface, RestrictedDataProviderInterface
{
    /** @var ManagerRegistry */
    private $managerRegistry;

    /** @var ObjectManager */
    private $manager;

    /**
     * @param ObjectManager $manager
     * @param ManagerRegistry $managerRegistry
     */
    public function __construct(ObjectManager $manager, ManagerRegistry $managerRegistry)
    {
        $this->manager = $manager;
        $this->managerRegistry = $managerRegistry;
    }

    /**
     * {@inheritdoc}
     */
    public function getItem(string $resourceClass, $id, string $operationName = null, array $context = [])
    {
        $em = $this->managerRegistry->getManagerForClass($resourceClass);
        $repository = $em->getRepository($resourceClass);

        foreach (['lastName', 'clientId'] as $requiredFilter) {
            if (!isset($context['filters'][$requiredFilter])) {
                throw new NameNotFoundException("$requiredFilter parameter must be provided");
            }
        }

        $lastName = User::convertLastName($context['filters']['lastName']);
        $clientId = $context['filters']['clientId'];

        $vin = $repository->find($id);

        if (null !== $vin) {
            if ($vin->getLastName() === $lastName && $vin->getClientId() === $clientId) {
                return $vin;
            } else {
                $vin->setLastName($lastName);
                $vin->setClientId($clientId);
            }
        } else {
            $vin = new Vin($id, $lastName, $clientId);
            $em->persist($vin);
        }

        $vin = $this->manager->pull($vin);
        $em->flush();

        return $vin;
    }

    /**
     * {@inheritdoc}
     */
    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return Vin::class === $resourceClass;
    }
}
