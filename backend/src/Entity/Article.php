<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiSubresource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Doctrine\SearchNullFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Serializer\Annotation\Files;
use App\Validation\Constraints\MediaImage;
use ApplicationSonataMediaBundle\Entity\Media;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass = "App\Repository\ArticleRepository")
 *
 * @ApiResource(
 *      attributes           = {
 *          "pagination_items_per_page" = 8,
 *          "order"                     = {"publishDate": "DESC"},
 *          "normalization_context"     = {"groups" = {"at_read"}}
 *      },
 *      collectionOperations = {"get"},
 *      itemOperations       = {"get"},
 * )
 * @ApiFilter(SearchFilter::class, properties = {"category": "exact", "tags": "exact"})
 * @ApiFilter(SearchNullFilter::class, properties = {"vehicleModels": "exact_null"})
 *
 * @Files(imageFields = {"image"})
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class Article
{
    const MIN_WIDTH = 1040;
    const MIN_HEIGHT = 800;

    /**
     * @var integer
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     *
     * @ApiProperty(identifier = false)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @ApiProperty(identifier = true)
     *
     * @Gedmo\Slug(fields = {"title"}, updatable = false)
     *
     * @Groups({"at_read"})
     */
    private $slug;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\NotBlank
     * @Assert\Length(min = 20)
     *
     * @Groups({"at_read"})
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\NotBlank
     *
     * @Groups({"at_read"})
     */
    private $category;

    /**
     * @var Media
     *
     * @Assert\NotNull(message = "article.media.not_null")
     * @MediaImage(minWidth = Article::MIN_WIDTH, minHeight = Article::MIN_HEIGHT)
     *
     * @ORM\ManyToOne(targetEntity = "ApplicationSonataMediaBundle\Entity\Media", cascade = {"persist"}, fetch = "EAGER")
     */
    private $media;

    /**
     * @var \DateTime
     *
     * @Assert\NotBlank
     * @ORM\Column(type = "datetime")
     *
     * @Assert\DateTime
     *
     * @Groups({"at_read"})
     */
    private $publishDate;

    /**
     * @var string
     *
     * @ORM\Column(type = "string", length = 200)
     *
     * @Assert\Length(min = 50, max = 200)
     *
     * @Groups({"at_read"})
     */
    private $excerpt;

    /**
     * @var string;
     *
     * @ORM\Column(type = "text")
     *
     * @Assert\NotBlank
     *
     * @Groups({"at_read"})
     */
    private $body;

    /**
     * @var Article[]|ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity = "App\Entity\Article")
     *
     * @ApiSubresource
     */
    private $associatedArticles;

    /**
     * @ORM\ManyToMany(targetEntity = Tag::class, inversedBy = "articles", cascade = {"persist"})
     *
     * @Groups({"at_read"})
     */
    private $tags;

    /**
     * @ORM\ManyToMany(targetEntity = VehicleModel::class, inversedBy = "articles", cascade = {"persist"})
     *
     * @Groups({"at_read"})
     */
    private $vehicleModels;

    public function __construct()
    {
        $this->associatedArticles = new ArrayCollection();
        $this->tags = new ArrayCollection();
        $this->vehicleModels = new ArrayCollection();
    }

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getSlug(): ?string
    {
        return $this->slug;
    }

    /**
     * @param string $slug
     */
    public function setSlug(?string $slug): void
    {
        $this->slug = $slug;
    }

    /**
     * @return string
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getCategory(): ?string
    {
        return $this->category;
    }

    /**
     * @param string $category
     */
    public function setCategory(?string $category): void
    {
        $this->category = $category;
    }

    /**
     * @return \DateTime
     */
    public function getPublishDate(): ?\DateTime
    {
        return $this->publishDate;
    }

    /**
     * @param \DateTime $publishDate
     */
    public function setPublishDate(\DateTime $publishDate): void
    {
        $this->publishDate = $publishDate;
    }

    /**
     * @return string
     */
    public function getExcerpt(): ?string
    {
        return $this->excerpt;
    }

    /**
     * @param string $excerpt
     */
    public function setExcerpt(?string $excerpt): void
    {
        $this->excerpt = $excerpt;
    }

    /**
     * @return string
     */
    public function getBody(): ?string
    {
        return $this->body;
    }

    /**
     * @param string $body
     */
    public function setBody(?string $body): void
    {
        $this->body = $body;
    }

    /**
     * @return string
     *
     * @Groups({"at_read"})
     */
    public function getImage(): ?string
    {
        return $this->media ? $this->media->getPath() : null;
    }

    /**
     * @return Article[]|ArrayCollection
     */
    public function getAssociatedArticles(): ?iterable
    {
        return $this->associatedArticles;
    }

    /**
     * @param Article[]|ArrayCollection $associatedArticles
     */
    public function setAssociatedArticles(?iterable $associatedArticles): void
    {
        $this->associatedArticles = $associatedArticles;
    }

    /**
     * @param Article|null $article
     */
    public function addAssociatedArticle(?Article $article): void
    {
        if ($article !== $this && !$this->associatedArticles->contains($article)) {
            $this->associatedArticles->add($article);
        }
    }

    /**
     * @param Article|null $article
     */
    public function removeAssociatedArticle(?Article $article): void
    {
        $this->associatedArticles->removeElement($article);
    }

    /**
     * @return Media
     */
    public function getMedia(): ?Media
    {
        return $this->media;
    }

    /**
     * @param Media $media
     */
    public function setMedia(?Media $media): void
    {
        $this->media = $media;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return "Article: $this->title";
    }

    /**
     * @return Collection|Tag[]
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        if ($this->tags->contains($tag)) {
            $this->tags->removeElement($tag);
        }

        return $this;
    }

    /**
     * @return Collection|VehicleModel[]
     */
    public function getVehicleModels(): Collection
    {
        return $this->vehicleModels;
    }

    public function addVehicleModel(VehicleModel $vehicleModel): self
    {
        if (!$this->vehicleModels->contains($vehicleModel)) {
            $this->vehicleModels[] = $vehicleModel;
        }

        return $this;
    }

    public function removeVehicleModel(VehicleModel $vehicleModel): self
    {
        if ($this->vehicleModels->contains($vehicleModel)) {
            $this->vehicleModels->removeElement($vehicleModel);
        }

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getOrderDate(): ?\DateTime
    {
        return $this->getPublishDate();
    }
}
