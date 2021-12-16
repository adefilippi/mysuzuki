<?php

namespace App\Controller;

use App\Entity\Logo;
use App\Entity\Maintenance;
use App\Entity\MaintenanceProgram;
use App\Entity\Manual;
use App\Entity\Picture;
use App\Entity\User;
use App\Entity\Vehicle;
use App\Manager\VehicleManager;
use App\Soap\Manager\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use JsonSchema\Exception\ResourceNotFoundException;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author svianney <vianney@widop.com>
 */
class VehicleController extends Controller
{
    const TTL = 5*60;

    /**
     * @Route(
     *     name     = "api_vehicles_put_item",
     *     path     = "/api/vehicles/{id}.{_format}",
     *     methods  = {"PUT"},
     *     defaults = {
     *         "_format"                  = "jsonld",
     *         "_api_resource_class"      = Vehicle::class,
     *         "_api_item_operation_name" = "put"
     *     }
     * )
     *
     * @param Vehicle $data
     *
     * @return Vehicle
     */
    public function update(Vehicle $data)
    {
        $data->setToBePushed(true);
        return $data;
    }

    /**
     * @Route(
     *     name     = "api_vehicles_get_collection",
     *     path     = "/api/vehicles.{_format}",
     *     methods  = {"GET"},
     *     defaults = {
     *         "_format"                        = "jsonld",
     *         "_api_resource_class"            = Vehicle::class,
     *         "_api_collection_operation_name" = "get"
     *     }
     * )
     *
     *
     * @param EntityManagerInterface $em
     * @param ObjectManager $om
     * @param VehicleManager $vm

     * @return Vehicle[]
     */
    public function cget(EntityManagerInterface $em, ObjectManager $om, VehicleManager $vm)
    {
        /** @var User $user */
        $user = $this->getUser();

        $updatedAt = $user->getVehiclesUpdatedAt();

        if (null === $updatedAt || (time() - $updatedAt->getTimestamp()) > self::TTL) {
            $user = $om->getRepository(User::class)->pullVehicles($user);
        }

        $vehicles = $user->getVehicles();

        foreach ($vehicles as $vehicle) {
            $vm->updateFiles($vehicle);
            $vm->updateNextImportantDate($vehicle);
        }

        $em->flush();

        return $vehicles;
    }

    /**
     * @Route(
     *     name     = "api_maintenances_post_subresource_collection",
     *     path     = "/api/vehicles/{id}/maintenances.{_format}",
     *     methods  = {"POST"},
     *     defaults = {
     *         "_format"                        = "jsonld",
     *         "_api_resource_class"            = Maintenance::class,
     *         "_api_collection_operation_name" = "post"
     *     }
     * )
     *
     * @param $id
     * @param Maintenance $data
     *
     * @return Maintenance
     */
    public function createMaintenance($id, Maintenance $data)
    {
        /** @var Vehicle $vehicle */
        $vehicle = $this->getDoctrine()->getRepository(Vehicle::class)->findOneByVin($id);

        if ($vehicle !== null) {
            $vehicle->addMaintenance($data);
            return $data;
        }

        throw new ResourceNotFoundException();
    }
}
