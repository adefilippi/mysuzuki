<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\VehicleModelRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     attributes            = {
 *          "pagination_enabled"    = false,
 *          "order"                 = {"name": "ASC"},
 *          "normalization_context" = {"groups" = {"at_read"}},
 *      },
 *      collectionOperations = {"get"},
 *      itemOperations       = {"get"},
 * )
 * @ORM\Entity(repositoryClass = VehicleModelRepository::class)
 */
class VehicleModel
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type = "integer")
     *
     * @Groups({"at_read"})
     */
    private $id;

    /**
     * @ORM\Column(type = "string", length = 255)
     *
     * @Groups({"at_read"})
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity = Article::class, mappedBy = "vehicleModels")
     */
    private $articles;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->addVehicleModel($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->contains($article)) {
            $this->articles->removeElement($article);
            $article->removeVehicleModel($this);
        }

        return $this;
    }

    public function __toString()
    {
        return $this->name;
    }
}
