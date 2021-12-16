<?php

namespace App\Command;

use App\Soap\Client\DPSWebServiceClient;
use App\Soap\Repository\RepositoryMethods;
use SoapBundle\Exception\SoapTimeoutException;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

/** @author Thibault Richard <thibault@widop.com> */
class SoapDebugCommand extends Command
{
    /** @var DPSWebServiceClient */
    private $factory;

    /**
     * @param DPSWebServiceClient $factory
     */
    public function __construct(DPSWebServiceClient $factory)
    {
        $this->factory = $factory;

        parent::__construct();
    }

    protected function configure()
    {
        $this->setName("mysuzuki:soap:debug");
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $response = $this->factory
                ->create()
                ->__soapCall(
                    RepositoryMethods::DEALERSHIPS_LIST,
                    [[]]
                );
        } catch (SoapTimeoutException $e) {
            echo $e->getMessage();
            die(1);
        }

        ob_start();
        print_r($response);
        $message = ob_get_clean();

        $output->write($message);
    }
}
