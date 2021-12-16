<?php

namespace SoapBundle\Mocker;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class MockerManager
{
    /** @var \SoapBundle\Mocker\MockerInterface[] */
    private $mockers = [];

    /**
     * @return array
     */
    protected function getMockers()
    {
        return $this->mockers;
    }

    /**
     * @param string $functionName
     *
     * @return bool|\SoapBundle\Mocker\MockerInterface false if no mocker were found
     */
    public function getMocker($functionName, $stage)
    {
        foreach ($this->mockers as $mocker) {
            if ($mocker->support($functionName, $stage)) {
                return $mocker;
            }
        }

        return false;
    }

    /**
     * @param MockerInterface $mocker
     */
    public function addItem(MockerInterface $mocker)
    {
        $this->mockers[] = $mocker;
    }
}
