<?php

namespace App\Soap\Mocker;

use Behat\Transliterator\Transliterator;
use SoapBundle\Mocker\WsdlCacherInterface;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class WsdlCacher implements WsdlCacherInterface
{
    /** @var string */
    private $cachePath;

    /**
     * @param string $cachePath
     */
    public function __construct($cachePath)
    {
        $this->cachePath = $cachePath;
    }

    /** {@inheritdoc} */
    public function getLocalCopyPath($wsdl)
    {
        $localPath = sprintf('%s/%s.xml', $this->cachePath, Transliterator::urlize($wsdl));

        if (!file_exists($localPath)) {
            throw new \RuntimeException(sprintf(
                'Local copy does not exist for wsdl %s. Should be %s',
                $wsdl,
                $localPath
            ));
        }

        return $localPath;
    }
}
