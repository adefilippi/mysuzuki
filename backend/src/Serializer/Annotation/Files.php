<?php

namespace App\Serializer\Annotation;

use Doctrine\Common\Annotations\Annotation;

/**
 * @Annotation
 *
 * @Target("CLASS")
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class Files
{
    /**
     *
     * @var string[]
     */
    public $fileFields;

    /**
     *
     * @var string[]
     */
    public $imageFields;
}
