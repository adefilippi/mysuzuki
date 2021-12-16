<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 *
 * @ApiResource(
 *      collectionOperations = {
 *          "post"
 *      },
 *      itemOperations       = {
 *          "get" = {
 *              "access_control" = "is_granted('ROLE_SUPER_ADMIN')"
 *          },
 *      },
 *      attributes           = {
 *          "normalization_context"   = {"groups" = {"i_read"}},
 *          "denormalization_context" = {"groups" = {"i_write"}}
 *      }
 * )
 *
 * @author Thibault Richard <thibault@widop.com>
 *
 * @ORM\HasLifecycleCallbacks
 */
class Issue
{
    /**
     * @var integer
     *
     * @ORM\Column(type = "integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy = "AUTO")
     *
     * @Groups({"i_read"})
     */
    private $id;

    /**
     * @var IssueType
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\IssueType")
     *
     * @Assert\NotNull(message = "issue.type.not_null")
     *
     * @Groups({"i_read", "i_write"})
     */
    private $type;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\NotBlank(message = "issue.subject.not_blank")
     *
     * @Groups({"i_read", "i_write"})
     */
    private $subject;

    /**
     * @var string
     *
     * @ORM\Column(type = "text")
     *
     * @Assert\NotBlank(message = "issue.message.not_blank")
     *
     * @Groups({"i_read", "i_write"})
     */
    private $message;

    /**
     * @var Attachment
     *
     * @ORM\OneToOne(targetEntity = "Attachment")
     *
     * @Groups({"i_read", "i_write"})
     */
    private $attachment;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Assert\Email(message = "issue.email.is_email")
     *
     * @Groups({"i_write"})
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Groups({"i_read", "i_write"})
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(type = "string")
     *
     * @Groups({"i_read", "i_write"})
     */
    private $vin;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime")
     */
    private $createdAt;

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return IssueType
     */
    public function getType(): ?IssueType
    {
        return $this->type;
    }

    /**
     * @param IssueType $type
     */
    public function setType(?IssueType $type): void
    {
        $this->type = $type;
    }

    /**
     * @return string
     */
    public function getSubject(): ?string
    {
        return $this->subject;
    }

    /**
     * @param string $subject
     */
    public function setSubject(?string $subject): void
    {
        $this->subject = $subject;
    }

    /**
     * @return string
     */
    public function getMessage(): ?string
    {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage(?string $message): void
    {
        $this->message = $message;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt(): ?\DateTime
    {
        return $this->createdAt;
    }

    /**
     * @ORM\PrePersist
     */
    public function setCreatedAt(): void
    {
        $this->createdAt = new \DateTime();
    }

    /**
     * @return Attachment
     */
    public function getAttachment(): ?Attachment
    {
        return $this->attachment;
    }

    /**
     * @param Attachment $attachment
     */
    public function setAttachment(?Attachment $attachment): void
    {
        $this->attachment = $attachment;
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
    public function getName(): ?string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getVin(): ?string
    {
        return $this->vin;
    }

    /**
     * @param string $vin
     */
    public function setVin(?string $vin): void
    {
        $this->vin = $vin;
    }
}
