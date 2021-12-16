<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Contract\OwnedInterface;
use App\Entity\Embed\CTA;
use App\Entity\Traits\TargetEnumTrait;
use App\Enum\TargetTypeEnum;
use App\Serializer\Annotation\Files;
use App\Soap\Annotation\SoapRepository;
use App\Validation\Constraints\MediaImage;
use ApplicationSonataMediaBundle\Entity\Media;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\PersistentCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass = "App\Repository\OfferRepository")
 * @ORM\InheritanceType("SINGLE_TABLE")
 * @ORM\DiscriminatorColumn(name="discr", type="string")
 * @ORM\DiscriminatorMap({
 *     "offer"           = "App\Entity\Offer",
 *     "automatic_offer" = "App\Entity\AutomaticOffer",
 *     "manual_offer"    = "App\Entity\ManualOffer"
 * })
 *
 * @ApiResource(
 *      attributes           = {
 *          "pagination_items_per_page" = 6,
 *          "order"                     = {"startDate": "DESC"},
 *          "normalization_context"     = {"groups"={"offer_read"}},
 *      },
 *      collectionOperations = {
 *         "get" = {
 *              "access_control"        = "is_granted('ROLE_USER')",
 *          },
 *     },
 *     itemOperations        = {"get"},
 * )
 *
 * @ApiFilter(DateFilter::class, properties = {"startDate", "endDate"})
 * @ApiFilter(DateFilter::class, properties = {"useDate" : "before"})
 *
 * @Files(imageFields = {"image"})
 *
 * @SoapRepository(repositoryClass = "App\Soap\Repository\OfferRepository")
 *
 * @author Thibault Richard <thibault@widop.com>
 */
abstract class Offer implements OwnedInterface
{
    use TargetEnumTrait;

    const MEDIA_MIN_WIDTH = 1040;
    const MEDIA_MIN_HEIGHT = 800;
    const FILE_UPLOAD_DIR = 'upload/media/file';
    const FILE_UPLOAD_ROOT = __DIR__.'/../../public/'.self::FILE_UPLOAD_DIR;

    /**
     * @var integer
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     * @Groups("offer_read")
     */
    protected $id;

    /**
     * @var int|null
     *
     * @ORM\Column(type = "integer", unique = true, nullable = true)
     * @Groups("offer_read")
     */
    protected $externalId;

    /**
     * @var string
     *
     * @Assert\Choice(callback={"App\Enum\OfferTypeEnum", "toArray"})
     *
     * @ORM\Column(type = "string")
     * @Groups({"offer_read"})
     */
    protected $type;

    /**
     * @var DateTime
     *
     * @Assert\NotBlank
     * @Assert\DateTime
     *
     * @ORM\Column(type = "datetime", nullable = true)
     * @Groups({"offer_read"})
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
     * @Groups({"offer_read"})
     */
    protected $endDate;

    /**
     * @var string
     *
     * @Assert\NotBlank
     * @Assert\Length(min = 20)
     *
     * @ORM\Column(type = "string")
     * @Groups({"offer_read"})
     */
    protected $title;

    /**
     * @var CTA;
     *
     * @Assert\Valid(groups = {"offer_validation"})
     *
     * @ORM\Embedded(class = "App\Entity\Embed\CTA")
     * @Groups("offer_read")
     */
    protected $cta;

    /**
     * @var Media
     *
     * @Assert\NotNull(message = "offer.media.not_null")
     * @MediaImage(minWidth = Offer::MEDIA_MIN_WIDTH, minHeight = Offer::MEDIA_MIN_HEIGHT)
     *
     * @ORM\ManyToOne(targetEntity = "ApplicationSonataMediaBundle\Entity\Media", cascade = {"persist"}, fetch = "EAGER")
     * @Groups("offer_read")
     */
    protected $media;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     * @Groups("offer_read")
     */
    protected $origin = 'mysuzuki';

    /**
     * @var string|null
     *
     * @ORM\Column(type = "string", nullable=true)
     */
    protected $filePath;

    /**
     * @var PersistentCollection|User[]
     *
     * @ORM\ManyToMany(targetEntity = "App\Entity\User", cascade={"persist"})
     * @ORM\JoinTable(
     *     name="offers_users",
     *     joinColumns={@ORM\JoinColumn(name="offer_id", referencedColumnName="id", onDelete="CASCADE")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")}
     * )
     * @Groups("offer_read")
     */
    protected $users;

    public function __construct()
    {
        $this->cta = new CTA();
        $this->users = new ArrayCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function __toString()
    {
        return "Offre : $this->title";
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @return int|null
     */
    public function getExternalId(): ?int
    {
        return $this->externalId;
    }

    /**
     * @param int $externalId
     */
    public function setExternalId(int $externalId): void
    {
        $this->externalId = $externalId;
    }

    /**
     * @return DateTime|null
     */
    public function getStartDate(): ?DateTime
    {
        return $this->startDate;
    }

    /**
     * @param DateTime $startDate
     */
    public function setStartDate(DateTime $startDate)
    {
        $this->startDate = $startDate;
    }

    /**
     * @return DateTime|null
     */
    public function getEndDate(): ?DateTime
    {
        return $this->endDate;
    }

    /**
     * @param DateTime $endDate
     */
    public function setEndDate(DateTime $endDate)
    {
        $this->endDate = $endDate;
    }

    /**
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * @return string|null
     *
     * @Groups("offer_read")
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType(string $type)
    {
        $this->type = $type;
    }

    /**
     * @return string
     *
     * @Groups({"offer_read", "featured_content"})
     */
    public function getImage(): ?string
    {
        return $this->media ? $this->media->getPath() : null;
    }

    /**
     * @return string
     */
    public function getOrigin(): string
    {
        return $this->origin;
    }

    /**
     * @param string $origin
     */
    public function setOrigin(string $origin)
    {
        $this->origin = $origin;
    }

    /**
     * @return CTA
     */
    public function getCta(): CTA
    {
        return $this->cta;
    }

    /**
     * @param CTA $cta
     */
    public function setCta(CTA $cta)
    {
        $this->cta = $cta;
    }

    /**
     * @return Media|null
     */
    public function getMedia(): ?Media
    {
        return $this->media;
    }

    /**
     * @param Media $media
     */
    public function setMedia(Media $media)
    {
        $this->media = $media;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->users->first();
    }

    /**
     * @return PersistentCollection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->setUsers([$user]);
    }

    /**
     * @param User $user
     */
    public function addUser(User $user)
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $this->targetType = TargetTypeEnum::FILTERED;
        }
    }

    /**
     * @param PersistentCollection|User[] $users
     */
    public function setUsers($users): void
    {
        if (is_array($users)) {
            $this->users = new ArrayCollection($users);
        } else {
            $this->users = $users;
        }
    }

    public function removeUser(User $user): void
    {
        if (!$this->users->contains($user)) {
            return;
        }

        $this->users->removeElement($user);
    }

    /**
     * @return string|null
     */
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    /**
     * @param string|null $filePath
     */
    public function setFilePath(?string $filePath)
    {
        $this->filePath = $filePath;
    }

    public function getAbsolutePath(): ?string
    {
        return null === $this->filePath
            ? null
            : self::FILE_UPLOAD_ROOT.'/'.$this->filePath;
    }

    /**
     * @Groups("offer_read")
     *
     * @return string|null
     */
    public function getWebPath(): ?string
    {
        return null === $this->filePath
            ? null
            : self::FILE_UPLOAD_DIR.'/'.$this->filePath;
    }

    /**
     * @return bool
     * @Groups("offer_read")
     */
    public function isAutomated(): bool
    {
        return get_class($this) === AutomaticOffer::class;
    }

    /**
     * @return \DateTime|null
     */
    public function getOrderDate(): ?\DateTime
    {
        return $this->getStartDate();
    }
}
