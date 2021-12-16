<?php

namespace App\Security\Provider;

use App\Entity\User;
use App\Soap\Manager\ObjectManager;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Persistence\ManagerRegistry;
use OAuth2\OAuth2;
use OAuth2\OAuth2ServerException;
use Symfony\Bridge\Doctrine\Security\User\EntityUserProvider;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @author svianney <vianney@widop.com>
 */
class UserProvider extends EntityUserProvider
{
    const PROPERTY = 'email';

    private $objectManager;

    private $translator;

    public function __construct(ManagerRegistry $registry, ObjectManager $objectManager, TranslatorInterface $translator)
    {
        parent::__construct($registry, User::class, self::PROPERTY);
        $this->objectManager = $objectManager;
        $this->translator = $translator;
    }

    public function loadUserByUsername($username)
    {
        /** @var User $user */
        $user = parent::loadUserByUsername($username);

        if ($user) {
            $user = $this->objectManager->getRepository(User::class)->pullVehicles($user);

            if ($user->getVehicles()->isEmpty()) {
                throw new OAuth2ServerException(
                    Response::HTTP_BAD_REQUEST,
                    OAuth2::ERROR_INVALID_GRANT,
                    $this->translator->trans('exception.no_vehicles')
                );
            }
        }

        return $user;
    }
}
