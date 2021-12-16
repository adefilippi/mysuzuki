<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass = "App\Repository\FeaturedContentRepository")
 * @ApiResource(
 *     attributes = {
 *         "normalization_context" = {"groups" = {"featured_content", "offer_read", "at_read", "game_read"}},
 *     },
 *     collectionOperations = {"get"},
 *     itemOperations = {"get"},
 *)
 *
 * @author Amélie Guers <amelie@widop.com>
 */
class FeaturedContent
{
    /**
     * @var integer
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     * @Groups("featured_content")
     */
    private $type;

    /**
     * @ORM\OneToOne(targetEntity = "App\Entity\Article")
     */
    private $article;

    /**
     * @ORM\OneToOne(targetEntity = "App\Entity\Offer")
     */
    private $offer;

    /**
     * @ORM\OneToOne(targetEntity = "App\Entity\Game")
     */
    private $game;

    /**
     * @return integer
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return FeaturedContent
     */
    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return string
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * @param string|null $type
     * @return FeaturedContent
     */
    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Article
     */
    public function getArticle(): ?Article
    {
        return $this->article;
    }

    /**
     * @param Article|null $article
     * @return FeaturedContent
     */
    public function setArticle(?Article $article): self
    {
        $this->article = $article;

        return $this;
    }

    /**
     * @return Offer
     */
    public function getOffer(): ?Offer
    {
        return $this->offer;
    }

    /**
     * @param Offer|null $offer
     * @return FeaturedContent
     */
    public function setOffer(?Offer $offer): self
    {
        $this->offer = $offer;

        return $this;
    }

    /**
     * @return Game
     */
    public function getGame(): ?Game
    {
        return $this->game;
    }

    /**
     * @param Game|null $game
     * @return FeaturedContent
     */
    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }

    public function __toString(): ?string
    {
        return $this->getEntityTitle();
    }

    public function getEntityTitle(): ?string
    {
        switch ($this->type) {
            case 'article':
                return $this->getArticle()->getTitle();
            case 'offer':
                return $this->getOffer()->getTitle();
            case 'game':
                return $this->getGame()->getTitle();
            default:
                return null;
        }
    }

    /**
     * @Groups({"featured_content", "offer_read", "at_read", "game_read"})
     */
    public function getContent()
    {
        switch ($this->type) {
            case 'article':
                return $this->article;
            case 'offer':
                return $this->offer;
            case 'game':
                return $this->game;
            default:
                return null;
        }
    }
}
