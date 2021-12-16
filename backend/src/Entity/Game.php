<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use App\Serializer\Annotation\Files;
use App\Validation\Constraints\MediaImage;
use ApplicationSonataMediaBundle\Entity\Media;
use DateTime;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass = "App\Repository\GameRepository")
 *
 * @ApiResource(
 *      attributes           = {
 *          "pagination_enabled"    = false,
 *          "order"                 = {"startDate": "DESC"},
 *          "normalization_context" = {"groups"={"game_read"}},
 *      },
 *      collectionOperations = {
 *         "get" = {
 *              "access_control" = "is_granted('ROLE_USER')",
 *          },
 *     },
 *     itemOperations        = {"get"},
 * )
 *
 * @ApiFilter(DateFilter::class, properties = {"startDate", "endDate"})
 * @ApiFilter(DateFilter::class, properties = {"useDate" : "before"})
 *
 * @Files(imageFields = {"image"}, fileFields = {"rulesUrl"})
 *
 * @Vich\Uploadable
 *
 * @author Thibault RICHARD <thibault@widop.com>
 */
class Game
{
    /**
     * @var integer
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     * @Groups("game_read")
     */
    protected $id;

    /**
     * @var DateTime
     *
     * @Assert\NotBlank
     * @Assert\DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     * @Groups({"game_read"})
     */
    protected $startDate;

    /**
     * @var DateTime
     *
     * @Assert\NotBlank
     * @Assert\DateTime
     * @Assert\GreaterThan(propertyPath = "startDate")
     *
     * @ORM\Column(type = "datetime", nullable = true)
     * @Groups({"game_read"})
     */
    protected $endDate;

    /**
     * @var string
     *
     * @Assert\NotBlank
     * @Assert\Length(min = 20)
     *
     * @ORM\Column(type = "string")
     * @Groups({"game_read"})
     */
    protected $title;
    
    /**
     * @var string|null
     *
     * @ORM\Column(type = "string", length = 200, nullable = true)
     * @Groups({"game_read"})
     *
     * @Assert\Length(min = 50, max = 200)
     */
    private $summary;

    /**
     * @ORM\Column(type = "integer", nullable = true)
     * @Groups({"game_read"})
     */
    private $maximumParticipants;

    /**
     * @ORM\OneToMany(targetEntity = Participation::class, mappedBy = "game", orphanRemoval = true)
     */
    private $participations;

    /**
     * @var Media
     *
     * @Assert\NotNull(message = "offer.media.not_null")
     * @MediaImage(minWidth = Offer::MEDIA_MIN_WIDTH, minHeight = Offer::MEDIA_MIN_HEIGHT)
     *
     * @ORM\ManyToOne(targetEntity = "ApplicationSonataMediaBundle\Entity\Media", cascade = {"persist"}, fetch = "EAGER")
     */
    protected $media;

    /**
     * @ORM\Column(type = "array")
     * @Groups({"game_read"})
     */
    private $requiredFields = [];

    /**
     * @var File|null
     *
     * @Assert\File(uploadIniSizeErrorMessage="test", maxSize = "10M", maxSizeMessage = "attachment.file.max_size")
     *
     * @Vich\UploadableField(mapping = "rules", fileNameProperty = "rulesUrl")
     */
    private $file;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable = true)
     *
     * @Groups("game_read")
     */
    private $rulesUrl;

    /**
     * @ORM\Column(type = "datetime")
     * @Gedmo\Timestampable(on = "create")
     *
     * @Groups({"game_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type = "datetime")
     * @Gedmo\Timestampable(on = "update")
     *
     * @Groups({"game_read"})
     */
    private $updatedAt;

    public function __construct()
    {
        $this->participations = new ArrayCollection();
    }

    public function __toString()
    {
        return "Jeu : $this->title";
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(?string $summary): self
    {
        $this->summary = $summary;

        return $this;
    }

    public function getMaximumParticipants(): ?int
    {
        return $this->maximumParticipants;
    }

    public function setMaximumParticipants(?int $maximumParticipants): self
    {
        $this->maximumParticipants = $maximumParticipants;

        return $this;
    }

    /**
     * @return Collection|Participation[]
     */
    public function getParticipations(): Collection
    {
        return $this->participations;
    }

    public function addParticipation(Participation $participation): self
    {
        if (!$this->participations->contains($participation)) {
            $this->participations[] = $participation;
            $participation->setGame($this);
        }

        return $this;
    }

    public function removeParticipation(Participation $participation): self
    {
        if ($this->participations->contains($participation)) {
            $this->participations->removeElement($participation);
            // set the owning side to null (unless already changed)
            if ($participation->getGame() === $this) {
                $participation->setGame(null);
            }
        }

        return $this;
    }

    public function getRequiredFields(): ?array
    {
        return $this->requiredFields;
    }

    public function setRequiredFields(array $requiredFields): self
    {
        $this->requiredFields = $requiredFields;

        return $this;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartDate(): ?DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(?DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(?DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getMedia(): ?Media
    {
        return $this->media;
    }

    public function setMedia(?Media $media): self
    {
        $this->media = $media;

        return $this;
    }

    public function getFile(): ?File
    {
        return $this->file;
    }

    public function setFile(?File $file): Game
    {
        $this->file = $file;

        // Needed beause of a know bug in VichUploader
        // https://github.com/dustin10/VichUploaderBundle/blob/master/docs/known_issues.md#the-file-is-not-updated-if-there-are-not-other-changes-in-the-entity
        if ($this->file instanceof UploadedFile) {
            $this->updatedAt = new DateTime('now');
        }

        return $this;
    }

    public function getRulesUrl(): ?string
    {
        return $this->rulesUrl;
    }

    public function setRulesUrl(?string $rulesUrl): Game
    {
        $this->rulesUrl = $rulesUrl;

        return $this;
    }

    public function getCreatedAt(): ?DateTime
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?DateTime $createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?DateTime
    {
        return $this->updatedAt;
    }


    public function setUpdatedAt(?DateTime $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @Groups({"game_read"})
     */
    public function getParticipationsCount()
    {
        return $this->participations->count();
    }

    /**
     * @Groups({"game_read"})
     */
    public function getParticipationsLeft()
    {
        return $this->maximumParticipants !== null ? $this->maximumParticipants - $this->participations->count() : null;
    }

    /**
     * @Groups({"game_read"})
     */
    public function getImage(): ?string
    {
        return $this->media ? $this->media->getPath() : null;
    }

    /**
     * @return DateTimeInterface
     */
    public function getOrderDate(): DateTimeInterface
    {
        return $this->getStartDate();
    }
}
