<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Contract\Targetable;
use App\Entity\Embed\Body;
use App\Entity\Traits\TargetFileTrait;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ApiResource(
 *     collectionOperations = {},
 *     itemOperations       = {"get"},
 * )
 *
 * @author Jonathan as Jerry <joanthan.d@widop.com>
 */
class ManualOffer extends Offer implements Targetable
{
    use TargetFileTrait;

    /**
     * @var \DateTime
     *
     * @Assert\DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     * @Groups("offer_read")
     */
    protected $updateDate;

    /**
     * @var string|null
     *
     * @ORM\Column(type = "string", length = 200, nullable=true)
     * @Groups({"offer_read", "featured_content"})
     *
     * @Assert\Length(min = 50, max = 200)
     */
    private $summary;

    /**
     * @var Body;
     *
     * @Assert\Valid
     *
     * @ORM\Embedded(class = "App\Entity\Embed\Body")
     * @Groups("offer_read")
     */
    protected $body;

    /**
     * Unmapped property to handle file uploads
     */
    protected $ctaFile;

    public function __construct()
    {
        parent::__construct();
        $this->body = new Body();
    }

    /**
     * {@inheritdoc}
     */
    public function __toString()
    {
        return "Offre manuelle : $this->title";
    }

    /**
     * @return \DateTime|null
     */
    public function getUpdateDate(): ?\DateTime
    {
        return $this->updateDate;
    }

    /**
     * @param \DateTime $updateDate
     */
    public function setUpdateDate(\DateTime $updateDate): void
    {
        $this->updateDate = $updateDate;
    }

    /**
     * @return string
     */
    public function getSummary(): ?string
    {
        return $this->summary;
    }

    /**
     * @param string $summary
     */
    public function setSummary(string $summary)
    {
        $this->summary = $summary;
    }

    /**
     * @return string
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * @param string $body
     */
    public function setBody($body)
    {
        $this->body = $body;
    }

    /**
     * @return UploadedFile
     */
    public function getCtaFile()
    {
        return $this->ctaFile;
    }

    /**
     * @param UploadedFile $ctaFile
     */
    public function setCtaFile(UploadedFile $ctaFile = null): void
    {
        $this->ctaFile = $ctaFile;
    }

}
