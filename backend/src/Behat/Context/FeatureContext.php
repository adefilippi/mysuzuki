<?php

namespace  App\Behat\Context;

use Behat\Behat\Context\Context;
use Symfony\Component\Process\Process;

/** @author Thibault Richard <thibault@widop.com> */
class FeatureContext implements Context
{
    /**
     * @Given I load the fixtures
     *
     * @throws \Exception
     */
    public function loadAllFixtures()
    {
        $env = "test";
        $process = new Process(sprintf(
            'php bin/console hautelook:fixtures:load --env=%s --no-interaction --purge-with-truncate', $env
        ));
        $process->setTimeout(null);
        $process->setIdleTimeout(null);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new \Exception($process->getErrorOutput());
        }
    }

    /**
     * @Given I execute the command :command
     * @Given I execute the command :command with options :options
     *
     * @throws \Exception
     */
    public function executeCommand($command, $options = null)
    {
        $env = "test";
        $process = new Process(sprintf(
            'php bin/console %s --env=%s %s',
            $command,
            $env,
            $options
        ));
        $process->setTimeout(null);
        $process->setIdleTimeout(null);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new \Exception($process->getErrorOutput());
        }
    }
}
