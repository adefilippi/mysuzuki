<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *
 *     collectionOperations = {
 *         "post" = {},
 *         "get"  = {
 *              "normalization_context" = {"groups" = {"participation_collection"}},
 *          },
 *     },
 *     itemOperations       = {
 *         "get" = {
 *              "access_control" = "is_granted('ROLE_USER_NOT_ENABLED')"
 *          },
 *     },
 *     attributes           = {
 *         "validation_groups"       = {Participation::class, "validationGroups"},
 *         "normalization_context"   = {"groups" = {"participation_read"}},
 *         "denormalization_context" = {"groups" = {"participation_create"}}
 *     }
 * )
 * @ORM\Entity
 *
 * @UniqueEntity(fields = {"user", "game"}, message = "offer.game.unique")
 */
class Participation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type = "integer")
     *
     * @Groups({"participation_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity = User::class, inversedBy = "participations")
     * @ORM\JoinColumn(nullable = true, onDelete="SET NULL")
     *
     * @Assert\Valid(groups = {"lastName", "firstName", "email", "phone", "address"})
     *
     * @Groups({"participation_read"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity = Game::class, inversedBy = "participations")
     * @ORM\JoinColumn(nullable = false)
     *
     * @Groups({"participation_create", "participation_read", "participation_collection"})
     */
    private $game;

    /**
     * @ORM\Column(type = "datetime")
     * @Gedmo\Timestampable(on = "create")
     *
     * @Groups({"participation_read"})
     */
    private $createdAt;

    /**
     * @ORM\Column(type = "datetime")
     * @Gedmo\Timestampable(on = "update")
     *
     * @Groups({"participation_read"})
     */
    private $updatedAt;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getGame(): ?Game
    {
        return $this->game;
    }

    public function setGame(?Game $game): self
    {
        $this->game = $game;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @Assert\IsTrue(message = "offer.game.opened")
     */
    public function isGameOpened(): bool
    {
        $now = new \DateTime();

        return $this->getGame()->getStartDate() <= $now && $this->getGame()->getEndDate() >= $now;
    }

    /**
     * @Assert\IsFalse(message = "offer.game.full")
     */
    public function isGameFull(): bool
    {
        $participationsLeft = $this->getGame()->getParticipationsLeft();

        return $participationsLeft === 0 && $participationsLeft !== null;
    }

    public static function validationGroups(self $participation): array
    {
        return array_merge(['Default'], $participation->getGame()->getRequiredFields());
    }
}
