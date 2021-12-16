<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ApiResource(
 *     collectionOperations = {},
 *     itemOperations       = {"get"},
 * )
 *
 * @author Jonathan as Jerry <joanthan.d@widop.com>
 */
class AutomaticOffer extends Offer
{
    /**
     * @var Dealership
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\Dealership")
     * @Groups("offer_read")
     */
    protected $dealership;

    /**
     * @var float|null
     *
     * @ORM\Column(type = "float", nullable=true)
     * @Groups("offer_read")
     */
    protected $value;

    /**
     * @var \DateTime|null
     *
     * @Assert\DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     * @Groups("offer_read")
     */
    protected $useDate;

    /**
     * @var string|null
     *
     * @Assert\Choice(callback={"App\Enum\ReductionTypeEnum", "toArray"})
     *
     * @ORM\Column(type = "string", nullable=true)
     * @Groups("offer_read")
     */
    protected $reductionType;

    /**
     * @var string|null
     *
     * @ORM\Column(type = "string", nullable=true)
     * @Groups("offer_read")
     */
    protected $label;

    /**
     * @var string|null
     *
     * @ORM\Column(type = "bigint", nullable = true)
     * @Groups("offer_read")
     */
    protected $barcode;

    /**
     * {@inheritdoc}
     */
    public function __toString()
    {
        return "Offre automatique : $this->title";
    }

    /**
     * @return Dealership|null
     */
    public function getDealership(): ?Dealership
    {
        return $this->dealership;
    }

    /**
     * @param Dealership $dealership
     */
    public function setDealership(Dealership $dealership): void
    {
        $this->dealership = $dealership;
    }

    /**
     * @return float
     */
    public function getValue(): ?float
    {
        return $this->value;
    }

    /**
     * @param float $value
     */
    public function setValue(float $value): void
    {
        $this->value = $value;
    }

    /**
     * @return \DateTime|null
     */
    public function getUseDate(): ?\DateTime
    {
        return $this->useDate;
    }

    /**
     * @param \DateTime $useDate
     */
    public function setUseDate(\DateTime $useDate): void
    {
        $this->useDate = $useDate;
    }

    /**
     * @return string|null
     */
    public function getReductionType(): ?string
    {
        return $this->reductionType;
    }

    /**
     * @param string $reductionType
     */
    public function setReductionType(string $reductionType): void
    {
        $this->reductionType = $reductionType;
    }

    /**
     * @return string|null
     */
    public function getLabel(): ?string
    {
        return $this->label;
    }

    /**
     * @param string|null $Label
     */
    public function setLabel(?string $label): void
    {
        $this->label = $label;
    }

    /**
     * @return string|null
     */
    public function getBarcode(): ?string
    {
        return $this->barcode;
    }

    /**
     * @param string|null $barcode
     * @return Offer
     */
    public function setBarcode(?string $barcode): Offer
    {
        $this->barcode = $barcode;
        return $this;
    }

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
