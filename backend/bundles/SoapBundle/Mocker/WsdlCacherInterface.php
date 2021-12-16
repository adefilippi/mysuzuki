<?php

namespace SoapBundle\Mocker;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
interface WsdlCacherInterface
{
    /**
     * @param string $wsdl
     *
     * @return string
     */
    public function getLocalCopyPath($wsdl);
}
