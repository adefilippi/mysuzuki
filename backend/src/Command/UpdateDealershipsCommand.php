<?php

namespace App\Command;

use App\Entity\Dealership;
use App\Soap\Manager\ObjectManager;
use App\Soap\Repository\DealershipRepository;
use Behat\Testwork\Counter\Timer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class UpdateDealershipsCommand extends Command
{

    /** @var EntityManagerInterface */
    protected $entityManager;

    /** @var ObjectManager */
    private $objectManager;

    /**
     * @param EntityManagerInterface $em
     * @param ObjectManager          $objectManager
     */
    public function __construct(EntityManagerInterface $entityManager, ObjectManager $objectManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
        $this->objectManager = $objectManager;
    }

    protected function configure()
    {
        $this->setName("mysuzuki:dealership:update");
        $this->setDescription('[CRON] : Update the dealerships from the WS');
    }

    /**
     * {@inheritdoc}
     *
     * @throws \Doctrine\ORM\ORMException
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        /** @var DealershipRepository $soapRepository */
        $soapRepository = $this->objectManager->getRepository(Dealership::class);

        $output->writeln("Pulling dealerships from the WebService. This may take a while...");

        /** @var Dealership[] $soapDealerships */
        $soapDealerships = $soapRepository->pullAll();

        $output->writeln("Dealerships pulled successfully !");

        /** @var \App\Repository\DealershipRepository $dealershipRepository */
        $dealershipRepository = $this->entityManager->getRepository(Dealership::class);

        /** @var [] $dealershipArray */
        $localDealerships = $dealershipRepository->findAllAssoc();

        $output->writeln("Updating locally stored dealerships...");

        foreach ($soapDealerships as $soapDealership) {
            /** @var Dealership $localDealership */
            $localDealership = $localDealerships[$soapDealership->getExternalId()] ?? null;

            if ($localDealership === null) {
                $this->entityManager->persist($soapDealership);

                continue;
            }

            $localDealership->setCoordinates($soapDealership->getCoordinates());
            $localDealership->setFax($soapDealership->getFax());
            $localDealership->setPhone($soapDealership->getPhone());
            $localDealership->setClosed($soapDealership->isClosed());
            $localDealership->setAddress($soapDealership->getAddress());
            $localDealership->setEmail($soapDealership->getEmail());
            $localDealership->setName($soapDealership->getName());
            $localDealership->setMoreInformationUrl($soapDealership->getMoreInformationUrl());
            $localDealership->setWorkshopEmail($soapDealership->getWorkshopEmail());
        }

        $this->entityManager->flush();

        $output->writeln("Dealerships updated successfully !");
    }
}
