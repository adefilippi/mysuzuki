<?php

namespace App\Controller;

use App\Entity\User;
use App\Soap\Manager\ObjectManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @author svianney <vianney@widop.com>
 */
class UserController extends Controller
{
    const TTL = 5*60;

    /**
     * @Route(
     *     name     = "api_users_put_item",
     *     path     = "/api/users/{id}.{_format}",
     *     methods  = {"PUT"},
     *     defaults = {
     *         "_format"                  = "jsonld",
     *         "_api_resource_class"      = User::class,
     *         "_api_item_operation_name" = "put"
     *     }
     * )
     *
     * @param User $data
     *
     * @return User
     */
    public function update(User $data)
    {
        $data->setToBePushed(true);

        return $data;
    }

    /**
     * @Route(
     *     name     = "api_users_get_item",
     *     path     = "/api/users/{id}.{_format}",
     *     methods  = {"GET"},
     *     defaults = {
     *         "_format"                  = "jsonld",
     *         "_api_resource_class"      = User::class,
     *         "_api_item_operation_name" = "get"
     *     }
     * )
     *
     * @param User $data
     * @param EntityManagerInterface $em
     * @param ObjectManager $om
     *
     * @return User
     */
    public function read(User $data, EntityManagerInterface $em, ObjectManager $om)
    {
        $updatedAt = $data->getUpdatedAt();
        $delay = time() - $updatedAt->getTimestamp();

        if (null === $updatedAt || $delay > self::TTL) {
            $data = $om->getRepository(User::class)->pull($data);
            $em->flush();
        }

        return $data;
    }

}
