<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity
 *
 * @ApiResource(
 *      collectionOperations = {
 *          "post" = {
 *              "route_name" = "api_attachments_post_collection",
 *          },
 *      },
 *      itemOperations = {
 *          "get" = {
 *              "access_control" = "is_granted('ROLE_SUPER_ADMIN')"
 *          },
 *      }
 * )
 *
 * @Vich\Uploadable
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class Attachment
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
     * @var File|null
     *
     * @Assert\File(uploadIniSizeErrorMessage="test", maxSize = "10M", maxSizeMessage = "attachment.file.max_size")
     * @Assert\NotNull(message = "attachment.file.not_null")
     *
     * @Vich\UploadableField(mapping = "attachment", fileNameProperty = "contentUrl")
     */
    private $file;

    /**
     * @var string|null
     *
     * @ORM\Column(nullable = true)
     */
    private $contentUrl;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return null|File
     */
    public function getFile(): ?File
    {
        return $this->file;
    }

    /**
     * @param null|File $file
     */
    public function setFile(?File $file): void
    {
        $this->file = $file;
    }

    /**
     * @return null|string
     */
    public function getContentUrl(): ?string
    {
        return $this->contentUrl;
    }

    /**
     * @param null|string $contentUrl
     */
    public function setContentUrl(?string $contentUrl): void
    {
        $this->contentUrl = $contentUrl;
    }
}
