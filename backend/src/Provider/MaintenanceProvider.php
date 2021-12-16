<?php

namespace App\Provider;

use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use ApiPlatform\Core\DataProvider\SubresourceDataProviderInterface;
use App\Entity\Maintenance;
use App\Entity\Vehicle;
use App\Soap\Manager\ObjectManager;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class MaintenanceProvider implements SubresourceDataProviderInterface, RestrictedDataProviderInterface
{
    const TTL = 60*60;

    /** @var TokenStorageInterface */
    protected $storage;

    /** @var ObjectManager */
    protected $objectManager;

    /** @var ManagerRegistry */
    protected $managerRegistry;

    /**
     * @param TokenStorageInterface $storage
     * @param ObjectManager         $objectManager
     * @param ManagerRegistry       $managerRegistry
     */
    public function __construct(
        TokenStorageInterface $storage,
        ObjectManager $objectManager,
        ManagerRegistry $managerRegistry
    ) {
        $this->storage = $storage;
        $this->objectManager = $objectManager;
        $this->managerRegistry = $managerRegistry;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubresource(
        string $resourceClass,
        array $identifiers,
        array $context,
        string $operationName = null
    ) {
        $vehicleId = $context['subresource_identifiers']['id'];

        /** @var Vehicle $vehicle */
        $vehicle = $this->managerRegistry->getRepository(Vehicle::class)->findOneBy(['vin' => $vehicleId]);

        if ($vehicle === null) {
            throw new NotFoundHttpException('Vehicle not found.');
        }

        $updatedAt = $vehicle->getMaintenancesUpdatedAt();

        if (null === $updatedAt || time() - $updatedAt->getTimestamp()  > self::TTL) {
            $this->objectManager->getRepository(Vehicle::class)->pullMaintenances($vehicle);

            $vehicle->setMaintenancesUpdatedAt();

            $this->managerRegistry->getManager()->flush();
        }

        return $vehicle->getMaintenances();
    }

    /**
     * {@inheritdoc}
     */
    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return Maintenance::class === $resourceClass
               && $operationName  === 'api_vehicles_maintenances_get_subresource';
    }
}
