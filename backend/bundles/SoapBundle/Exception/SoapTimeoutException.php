<?php

namespace SoapBundle\Exception;

use Exception;

/**
 * @author Matthieu Sansen <matthieu@widop.com>
 */
class SoapTimeoutException extends \Exception
{
    const MESSAGE = 'SOAP Timeout';

    /**
     * @param \Exception|null $previous
     */
    public function __construct(Exception $previous = null)
    {
        parent::__construct(self::MESSAGE, 0, $previous);
    }
}
