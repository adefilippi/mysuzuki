<?php

namespace App\Handler;

use App\Entity\Contract\Targetable;
use App\Entity\User;
use App\Entity\Vehicle;
use App\Repository\UserRepository;
use Doctrine\Common\Persistence\ObjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class TargetFileHandler
{
    const CSV_HEADER_CLIENT_ID = 'id client';
    const CSV_HEADER_VIN = 'vin';
    /** @var UserRepository */
    private $userRepository;
    /**
     * @var ObjectRepository */
    private $vehicleRepository;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->userRepository = $em->getRepository(User::class);
        $this->vehicleRepository = $em->getRepository(Vehicle::class);
    }
    /**
     * @param Targetable $target
     */
    public function attachUsersFromClientIds(Targetable &$target)
    {
        if (null === $target->getClientIdsFile()) {
            return;
        }

        // Get array of clientId from source
        $data = $this->csvFileToArray($target->getClientIdsFile());
        if (null === $data) {
            return;
        }

        $target->setUsers([]);
        // For each clientId
        foreach ($data as $row) {
            if (!isset($row[self::CSV_HEADER_CLIENT_ID])) {
                return;
            }

            /** @var User|null $user */
            $user = $this->userRepository->findOneBy(['externalId' => $row[self::CSV_HEADER_CLIENT_ID]]);
            if (!$user) {
                continue;
            }
            $target->addUser($user);
        }
    }

    /**
     * @param Targetable $target
     */
    public function attachUsersFromVins(Targetable &$target)
    {
        if (null === $target->getVinsFile()) {
            return;
        }

        // Get array of clientId from source
        $data = $this->csvFileToArray($target->getVinsFile());
        if (null === $data) {
            return;
        }

        $target->setUsers([]);
        // For each vin
        foreach ($data as $row) {
            if (!isset($row[self::CSV_HEADER_VIN])) {
                return;
            }
            /** @var Vehicle|null $vehicle */
            $vehicle = $this->vehicleRepository->findOneBy(['vin' => $row[self::CSV_HEADER_VIN]]);
            if (!$vehicle) {
                continue;
            }
            $user = $vehicle->getOwner();
            if (!$user) {
                continue;
            }
            $target->addUser($user);
        }
    }
    /**
     * @return array|null
     */
    protected function csvFileToArray(UploadedFile $file)
    {
        if ($file->getClientOriginalExtension() !== 'csv') {
            return null;
        }

        $csv = array_map('str_getcsv', file($file->getPathname()));
        if (count($csv) < 2) {
            return null;
        }
        foreach ($csv[0] as $headKey => $headValue) {
            $csv[0][$headKey] = strtolower($headValue);
        }

        array_walk($csv, function(&$a) use ($csv) {
            $a = array_combine($csv[0], $a);
        });
        array_shift($csv); # remove column header

        return $csv;
    }
}
