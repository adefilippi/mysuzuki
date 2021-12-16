<?php

namespace App\Entity\Embed;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Embeddable
 */
class Naf
{
    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"read", "update"})
     */
    private $code;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", nullable = true)
     *
     * @Groups({"read"})
     */
    private $label;

    /**
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode($code)
    {
        $this->code = $code;
    }

    /**
     * @return string
     */
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * @param string $label
     */
    public function setLabel($label)
    {
        $this->label = $label;
    }
}
