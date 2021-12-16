<?php

namespace App\Entity\Embed;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @author Thibault Richard <thibault@widop.com>
 *
 * @ORM\Embeddable
 */
class Body
{
    /**
     * @var string|null
     *
     * @Assert\NotBlank
     *
     * @ORM\Column(type = "text", nullable=true)
     * @Groups({"offer_read", "featured_content"})
     */
    private $description;

    /**
     * @var string
     *
     * @Assert\NotBlank
     *
     * @ORM\Column(type = "text", nullable=true)
     * @Groups("offer_read")
     */
    private $conditions;

    /**
     * @var string
     *
     * @Assert\NotBlank
     *
     * @ORM\Column(type = "text", nullable=true)
     * @Groups("offer_read")
     */
    private $rules;

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return string|null
     */
    public function getConditions(): ?string
    {
        return $this->conditions;
    }

    /**
     * @param string $conditions
     */
    public function setConditions(string $conditions): void
    {
        $this->conditions = $conditions;
    }

    /**
     * @return string|null
     */
    public function getRules(): ?string
    {
        return $this->rules;
    }

    /**
     * @param string $rules
     */
    public function setRules($rules): void
    {
        $this->rules = $rules;
    }
}
