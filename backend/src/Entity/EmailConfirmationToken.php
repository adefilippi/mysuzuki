<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

use FOS\OAuthServerBundle\Util\Random;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @author svianney <vianney@widop.com>
 *
 * @ApiResource(
 *     attributes           = {
 *         "normalization_context"   = {"groups" = {"read"}},
 *         "denormalization_context" = {"groups" = {"token_create"}},
 *         "access_control"          = "is_granted('ROLE_USER') and not user.isEnabled()"
 *     },
 *     itemOperations       = {
 *         "get" = {
 *             "route_name"     = "api_email_confirmation_token_get_item",
 *             "access_control" = "object.getUser() == user"
 *         }
 *     },
 *     collectionOperations = {"post"},
 * )
 *
 * @ORM\Entity(repositoryClass = "App\Repository\EmailConfirmationTokenRepository")
 * @UniqueEntity("token")
 *
 * @ORM\HasLifecycleCallbacks
 */
class EmailConfirmationToken extends AbstractToken
{
    /**
     * @var int
     *
     * @ORM\Id
     * @ORM\Column(type = "integer")
     * @ORM\GeneratedValue(strategy = "AUTO")
     *
     * @ApiProperty(identifier = false)
     */
    private $id;

    public function getId()
    {
        return $this->id;
    }
}
