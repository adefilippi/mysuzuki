<?php

namespace App\Entity\Embed;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @author Thibault Richard <thibault@widop.com>
 *
 * @ORM\Embeddable
 */
class Coordinates
{
    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $latitude;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"v_read"})
     */
    private $longitude;

    /**
     * @return string
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * @param string $latitude
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;
    }

    /**
     * @return string
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * @param string $longitude
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;
    }
}
