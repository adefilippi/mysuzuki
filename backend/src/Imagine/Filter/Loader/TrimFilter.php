<?php

namespace App\Imagine\Filter\Loader;

use Imagine\Image\ImageInterface;
use Imagine\Image\ImagineInterface;
use Imagine\Imagick\Image;
use Liip\ImagineBundle\Imagine\Filter\Loader\LoaderInterface;

/**
 * @author svianney <vianney@widop.com>
 */
class TrimFilter implements LoaderInterface
{
    /** @var ImagineInterface */
    protected $im;

    /**
     * @param ImagineInterface $im
     */
    public function __construct(ImagineInterface $im)
    {
        $this->im = $im;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ImageInterface $image, array $options = [])
    {
        /** @var Image $image */
        $image = $this->im->load($image);
        $image->getImagick()->trimImage(0);
        return $image;
    }
}
