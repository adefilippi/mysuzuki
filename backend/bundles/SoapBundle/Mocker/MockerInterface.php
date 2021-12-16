<?php

namespace SoapBundle\Mocker;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
interface MockerInterface
{
    /**
     * @param string $function
     * @param string $stage
     *
     * @return bool
     */
    public function support($function, $stage);

    /**
     * @param string $function
     * @param string $stage
     * @param array  $arguments
     *
     * @return string
     */
    public function mock($function, $stage, $arguments);
}
