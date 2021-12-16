<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Contract\Targetable;
use App\Entity\Traits\TargetableTrait;
use App\Enum\TargetTypeEnum;
use App\Repository\BannerRepository;
use App\Serializer\Annotation\Files;
use App\Validation\Constraints\MediaImage;
use ApplicationSonataMediaBundle\Entity\Media;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\PersistentCollection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass = BannerRepository::class)
 * @ApiResource(
 *     collectionOperations = {"get"},
 *     itemOperations       = {"get"},
 *     attributes = {
 *          "order"                 = {"position": "ASC"},
 *          "normalization_context" = { "groups" = {"banner_read"}}
 *     },
 * )
 * @UniqueEntity("position")
 *
 * @Files(imageFields = {"mobileImage", "desktopImage"})
 *
 * @author Pierre Lictevout <pierre@widop.com>
 */
class Banner implements Targetable
{
    use TargetableTrait;

    const DESKTOP_MIN_WIDTH = 1040;
    const DESKTOP_MIN_HEIGHT = 800;
    const MOBILE_MIN_HEIGHT = 500;
    const MOBILE_MIN_WIDTH = 900;
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type = "integer")
     * @Groups("banner_read")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     * @Assert\NotBlank
     * @Assert\Length(min = 5)
     * @Groups("banner_read")
     */
    private $name;

    /**
     * @ORM\Column(type = "date")
     * @Groups("banner_read")
     */
    private $startDate;

    /**
     * @ORM\Column(type = "date")
     * @Assert\GreaterThan("now")
     * @Assert\GreaterThan(propertyPath = "startDate")
     * @Groups("banner_read")
     */
    private $endDate;

    /**
     * @var Media
     *
     * @Assert\NotNull(message = "banner.media.not_null")
     * @MediaImage(minWidth = Banner::DESKTOP_MIN_WIDTH, minHeight = Banner::DESKTOP_MIN_HEIGHT)
     * @ORM\ManyToOne(targetEntity = "ApplicationSonataMediaBundle\Entity\Media", cascade = {"persist"}, fetch = "EAGER")
     */
    private $mediaDesktop;

    /**
     * @var Media
     *
     * @Assert\NotNull(message = "banner.media.not_null")
     * @MediaImage(minWidth = Banner::MOBILE_MIN_WIDTH, minHeight = Banner::MOBILE_MIN_HEIGHT)
     * @ORM\ManyToOne(targetEntity = "ApplicationSonataMediaBundle\Entity\Media", cascade = {"persist"}, fetch = "EAGER")
     */
    private $mediaMobile;

    /**
     * @ORM\Column(type = "integer", nullable = true, unique = true)
     * @Groups("banner_read")
     */
    private $position;

    /**
     * @ORM\Column(type = "string", length = 255, nullable = true)
     * @Groups("banner_read")
     */
    private $link;

    /**
     * @var Collection|User[]
     *
     * @ORM\ManyToMany(targetEntity = "App\Entity\User", cascade = {"persist"})
     * @ORM\JoinTable(
     *     name = "banners_users",
     *     joinColumns = {@ORM\JoinColumn(name="banner_id", referencedColumnName="id", onDelete = "CASCADE")},
     *     inverseJoinColumns = {@ORM\JoinColumn(name = "user_id", referencedColumnName = "id", onDelete = "CASCADE")}
     * )
     * @Groups("banner_read")
     */
    protected $users;

    public function __construct()
    {
        if ($this->users === null) {
            $this->users = new ArrayCollection();
        }
    }

    /**
     * @return Media
     */
    public function getMediaDesktop(): ?Media
    {
        return $this->mediaDesktop;
    }

    /**
     * @param Media $mediaDesktop
     * @return $this
     */
    public function setMediaDesktop(Media $mediaDesktop): self
    {
        $this->mediaDesktop = $mediaDesktop;

        return $this;
    }

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * @param mixed $endDate
     * @return $this
     */
    public function setEndDate($endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    /**
     * @param \DateTimeInterface $startDate
     * @return $this
     */
    public function setStartDate(\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    /**
     * @return string
     */
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     * @return $this
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return "Bannière : $this->name";
    }

    /**
     * @return int|null
     */
    public function getPosition(): ?int
    {
        return $this->position;
    }

    /**
     * @param int|null $position
     * @return $this
     */
    public function setPosition(?int $position): self
    {
        $this->position = $position;

        return $this;
    }

    /**
     * @return Media
     */
    public function getMediaMobile(): ?Media
    {
        return $this->mediaMobile;
    }

    /**
     * @param Media $mediaMobile
     */
    public function setMediaMobile(Media $mediaMobile): self
    {
        $this->mediaMobile = $mediaMobile;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): self
    {
        $this->link = $link;

        return $this;
    }

    /**
     * @return string
     * @Groups("banner_read")
     */
    public function getDesktopImage(): ?string
    {
        return $this->mediaDesktop ? $this->mediaDesktop->getPath() : null;
    }

    /**
     * @return string
     * @Groups("banner_read")
     */
    public function getMobileImage(): ?string
    {
        return $this->mediaMobile ? $this->mediaMobile->getPath() : null;
    }

    public function getUser()
    {
        return $this->users->first();
    }

    /**
     * @return Collection|User[]
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
     * @param Collection|User[] $users
     */
    public function setUsers($users): void
    {
        if (is_array($users)) {
            $this->users = new ArrayCollection($users);
        } else {
            $this->users = $users;
        }
    }

}
