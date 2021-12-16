<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Validation\Constraints as CustomAssert;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *     collectionOperations = {
 *          "post" = {
 *              "access_control"     = "is_granted('ROLE_USER')",
 *          }
 *     },
 *     itemOperations       = {
 *          "get" = {
 *              "access_control"     = "is_granted('ROLE_SUPER_ADMIN')",
 *          }
 *     },
 *     attributes           = {
 *         "denormalization_context" = {"groups" = {"write"}},
 *         "normalization_context"   = {"groups" = {"read"}},
 *     },
 * )
 *
 * @author svianney <vianney@widop.com>
 *
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class PasswordChange
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(type = "integer")
     * @ORM\GeneratedValue(strategy = "AUTO")
     *
     * @Groups("write")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type = "datetime")
     */
    private $createdAt;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity = "App\Entity\User")
     */
    private $user;

    /**
     * @var string
     *
     * @Assert\NotBlank(message = "password_change.old_password.not_blank")
     * @CustomAssert\OldPassword
     *
     * @Groups("write")
     */
    private $oldPassword;

    /**
     * @var string
     *
     * @Assert\NotBlank(message = "password_change.new_password.not_blank")
     * @CustomAssert\SamePassword
     *
     * @Groups("write")
     */
    private $newPassword;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getOldPassword()
    {
        return $this->oldPassword;
    }

    /**
     * @param string $oldPassword
     */
    public function setOldPassword($oldPassword)
    {
        $this->oldPassword = $oldPassword;
    }

    /**
     * @return string
     */
    public function getNewPassword()
    {
        return $this->newPassword;
    }

    /**
     * @param string $newPassword
     */
    public function setNewPassword($newPassword)
    {
        $this->newPassword = $newPassword;
    }

    public function eraseCredentials()
    {
        $this->oldPassword = null;
        $this->newPassword = null;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @ORM\PrePersist
     */
    public function createCreatedAt()
    {
        $this->createdAt = new \DateTime();
    }
}
