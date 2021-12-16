<?php

namespace App\Manager;

use App\Entity\AccessoriesLink;
use App\Entity\Accessory;
use App\Entity\Logo;
use App\Entity\MaintenanceProgram;
use App\Entity\Manual;
use App\Entity\Picture;
use App\Entity\Vehicle;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @author svianney <vianney@widop.com>
 */
class VehicleManager
{
    const FILES_TTL = 24*60;
    const COURTESY = 'courtesy';
    const CONTROL = 'control';
    const MAINTENANCE = 'maintenance';

    /** @var EntityManagerInterface */
    protected $em;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @param Vehicle $vehicle
     */
    public function updateFiles(Vehicle $vehicle)
    {
        /** @var \DateTime $filesUpdatedAt */
        $filesUpdatedAt = $vehicle->getFilesUpdatedAt();

        if ($filesUpdatedAt !== null && (time() - $filesUpdatedAt->getTimeStamp() < self::FILES_TTL)) {
            return;
        }

        $carLabel = $vehicle->getOriginalModel();
        $date = $vehicle->getRegistrationDate() ? $vehicle->getRegistrationDate() : $vehicle->getPurchaseDate();
        $logo = $this->em->getRepository(Logo::class)->findOneByMatchingLabel($carLabel, $date);
        $picture = $this->em->getRepository(Picture::class)->findOneByMatchingLabel($carLabel, $date);
        $manual = $this->em->getRepository(Manual::class)->findOneByMatchingLabel($carLabel, $date);
        $maintenanceProgram = $this->em->getRepository(MaintenanceProgram::class)->findOneByMatchingLabel($carLabel, $date);

        $shortCarLabel = $vehicle->getModel();
        $energy = $vehicle->getEnergy();
        $accessories = $this->em->getRepository(Accessory::class)->findFourByMatchingLabel($shortCarLabel, $date, $energy);
        $accessoriesLink = $this->em->getRepository(AccessoriesLink::class)->findOneByMatchingLabel($shortCarLabel, $date, $energy);

        $vehicle->setLogo($logo);
        $vehicle->setPicture($picture);
        $vehicle->setManual($manual);
        $vehicle->setMaintenanceProgram($maintenanceProgram);
        $vehicle->setAccessories($accessories);
        $vehicle->setAccessoriesLink($accessoriesLink);
        $vehicle->setFilesUpdatedAt();
    }

    /**
     * @param Vehicle $vehicle
     */
    public function updateNextImportantDate(Vehicle $vehicle)
    {
        $nextImportantDate = $vehicle->getNextImportantDate();
        $refDate =  $vehicle->getRegistrationDate() ?? $vehicle->getPurchaseDate();
        $now = new \DateTime();
        $vehicle->getPurchaseType();

        if (($nextImportantDate && ($nextImportantDate > $now)) || !$refDate) {
            return;
        }

        $courtesyVisit = clone $refDate;
        $courtesyVisit->modify('+4 months');

        if ($vehicle->getPurchaseType() === Vehicle::TYPE_NEW && $now < $courtesyVisit) {
            $vehicle->setNextImportantDate($courtesyVisit);
            $vehicle->setNextImportantDateType(self::COURTESY);
            return;
        }

        $refDate = $vehicle->getRegistrationDate();

        if (!$refDate) {
            return;
        }

        $technicalCheck = clone $refDate;
        $technicalCheck->modify('+4 years');

        while ($technicalCheck < $now) {
            $technicalCheck->modify('+2 years');
        }

        $maintenance = clone $refDate;

        while ($maintenance < $now) {
            $maintenance->modify('+1 years');
        }

        $vehicle->setNextImportantDate(($maintenance < $technicalCheck) ? $maintenance : $technicalCheck);
        $vehicle->setNextImportantDateType(($maintenance < $technicalCheck) ? self::MAINTENANCE : self::CONTROL);
    }
}
