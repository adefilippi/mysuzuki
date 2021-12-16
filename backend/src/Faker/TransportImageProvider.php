<?php

namespace App\Faker;

use Faker\Generator;
use Faker\Provider\Base;
use Symfony\Component\HttpFoundation\File\File;

/**
 * @author Thibault Richard <thibault@widop.com>
 * @author Jonathan Defraiteur <jonathan.d@widop.com>
 */
class TransportImageProvider extends Base
{
    private const FILES = [
        'motor.jpg',
        'suzuki_boot.jpg',
        'suzuki_offer.png',
        'suzuki_sport.jpg',
    ];

    /** @var string */
    private $fileDir;

    /**
     * @param Generator $generator
     * @param           $fileDir
     */
    public function __construct(Generator $generator, $fileDir)
    {
        parent::__construct($generator);
        $this->fileDir = $fileDir;
    }

    /**
     * @param string $folder
     * @param bool   $returnsFile
     *
     * @return File|string
     */
    public function transportImage(bool $returnsFile = true)
    {
        $folder = 'fixtures_images';
        $dir = "{$this->fileDir}/{$folder}/";

        $fileName = $dir.self::FILES[array_rand(self::FILES)];

        if ($returnsFile && !empty($fileName)) {
            return new File($fileName);
        }

        return sprintf('/upload/%s/%s', $folder, $fileName);
    }
}
