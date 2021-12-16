<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 *
 * @ApiResource(
 *      collectionOperations = {
 *          "get"
 *      },
 *      itemOperations       = {
 *          "get" = {
 *              "access_control" = "is_granted('ROLE_SUPER_ADMIN')"
 *          },
 *      },
 *      attributes           = {
 *          "normalization_context" = {"groups" = {"it_read"}}
 *      }
 * )
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class IssueType
{
    /** @var string[] */
    public const WHEN = ['connected', 'disconnected', 'connected_disconnected'];

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
     * @ORM\Column(length = 128, unique = true)
     *
     * @ApiProperty(identifier = true)
     *
     * @Gedmo\Slug(fields = {"label"}, updatable = false)
     *
     * @Groups({"it_read"})
     */
    private $slug;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\NotBlank
     * @Assert\Length(min = 10)
     *
     * @Groups({"it_read"})
     */
    private $label;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\NotBlank
     * @Assert\Email(message = "issue_type.email.is_email")
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\Choice(choices = IssueType::WHEN)
     *
     * @Groups({"it_read"})
     */
    private $appearsWhen;

    /**
     * @var bool
     *
     * @ORM\Column(type = "boolean")
     */
    private $deletable = true;

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
    public function getLabel(): ?string
    {
        return $this->label;
    }

    /**
     * @param string $label
     */
    public function setLabel(?string $label): void
    {
        $this->label = $label;
    }

    /**
     * @return string
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail(?string $email): void
    {
        $this->email = $email;
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
    public function setSlug(?string $slug)
    {
        $this->slug = $slug;
    }

    /**
     * @return string
     */
    public function getAppearsWhen(): ?string
    {
        return $this->appearsWhen;
    }

    /**
     * @param string $appearsWhen
     */
    public function setAppearsWhen(?string $appearsWhen): void
    {
        $this->appearsWhen = $appearsWhen;
    }

    /**
     * @return bool
     */
    public function isDeletable(): ?bool
    {
        return $this->deletable;
    }

    /**
     * @param bool $deletable
     */
    public function setDeletable(?bool $deletable): void
    {
        $this->deletable = $deletable;
    }
}
