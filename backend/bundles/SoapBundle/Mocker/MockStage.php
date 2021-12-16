<?php

namespace SoapBundle\Mocker;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class MockStage
{
    const CALL = 'call';
    const REQUEST = 'request';

    /**
     * @return string[]
     */
    public static function all()
    {
        return [self::CALL, self::REQUEST];
    }
}
