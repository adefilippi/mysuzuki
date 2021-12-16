<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validation\Constraints as CustomAssert;

/**
 * @ApiResource(
 *     collectionOperations = {
 *          "post" = {
 *              "access_control" = "not is_granted('ROLE_USER_NOT_ENABLED')",
 *              "denormalization_context" = {"groups" = {"token_create"}}
 *          }
 *     },
 *     itemOperations = {
 *          "get" = {"access_control" = "is_granted('API_ONLY_ROUTE')"},
 *          "put" = {
 *              "access_control" = "not is_granted('ROLE_USER_NOT_ENABLED')",
 *              "denormalization_context" = {"groups" = {"token_update"}},
 *              "validation_groups"       = {"token_update"},
 *          }
 *     },
 *     attributes = {
 *         "normalization_context" = {"groups" = {"read"}}
 *     }
 * )
 *
 * @ORM\Entity(repositoryClass = "App\Repository\PasswordRequestTokenRepository")
 *
 * @ORM\HasLifecycleCallbacks
 *
 * @author Thibault Richard <thibault@widop.com>
 */
class PasswordRequestToken extends AbstractToken
{
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
     * @Groups({"token_create"})
     *
     * @Assert\NotBlank(groups = {"token_create"}, message = "password_request_token.email.not_blank")
     * @Assert\Email(groups = {"token_create"}, message = "password_request_token.email.is_email")
     * @CustomAssert\UserExists
     */
    private $email;

    /**
     * @var string
     *
     * @Groups({"token_update"})
     *
     * @Assert\NotBlank(groups = {"token_update"}, message = "password_request_token.new_password.not_blank")
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
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
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
}
