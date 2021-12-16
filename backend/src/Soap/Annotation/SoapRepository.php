<?php

namespace App\Soap\Annotation;

use Doctrine\Common\Annotations\Annotation\Target;
use Doctrine\ORM\Mapping\Annotation;

/**
 * @Annotation
 *
 * @Target("CLASS")
 *
 * @author svianney <vianney@widop.com>
 */
final class SoapRepository implements Annotation
{
    /** @var string */
    public $repositoryClass;
}
