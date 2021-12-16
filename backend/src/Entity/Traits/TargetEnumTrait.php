<?php

namespace App\Entity\Traits;

use App\Enum\TargetTypeEnum;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait TargetEnumTrait
{
    /**
     * @var string
     *
     * @Assert\Choice(callback = {"App\Enum\TargetTypeEnum", "toArray"})
     *
     * @ORM\Column(type = "string")
     * @Groups("target_read")
     */
    protected $targetType = TargetTypeEnum::NONE;

    /**
     * @return string
     */
    public function getTargetType(): string
    {
        return $this->targetType;
    }

    /**
     * @param string $targetType
     */
    public function setTargetType(string $targetType): void
    {
        $this->targetType = $targetType;
    }
}
