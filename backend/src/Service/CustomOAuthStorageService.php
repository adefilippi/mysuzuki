<?php

namespace App\Service;

use FOS\OAuthServerBundle\Model\AccessTokenManagerInterface;
use FOS\OAuthServerBundle\Model\AuthCodeManagerInterface;
use FOS\OAuthServerBundle\Model\ClientManagerInterface;
use FOS\OAuthServerBundle\Model\RefreshTokenManagerInterface;
use FOS\OAuthServerBundle\Storage\OAuthStorage;
use OAuth2\Model\IOAuth2Client;
use OAuth2\OAuth2;
use OAuth2\OAuth2ServerException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class CustomOAuthStorageService extends OAuthStorage
{
    private $translator;

    public function __construct(
        ClientManagerInterface $clientManager,
        AccessTokenManagerInterface $accessTokenManager,
        RefreshTokenManagerInterface $refreshTokenManager,
        AuthCodeManagerInterface $authCodeManager,
        UserProviderInterface $userProvider = null,
        EncoderFactoryInterface $encoderFactory = null,
        TranslatorInterface $translator
    )
    {
        parent::__construct(
            $clientManager,
            $accessTokenManager,
            $refreshTokenManager,
            $authCodeManager,
            $userProvider,
            $encoderFactory
        );

        $this->translator = $translator;
    }

    public function checkUserCredentials(IOAuth2Client $client, $username, $password)
    {
        $isUserValid = parent::checkUserCredentials($client, $username, $password);

        if ($isUserValid === false) {
            throw new OAuth2ServerException(
                Response::HTTP_BAD_REQUEST,
                OAuth2::ERROR_INVALID_GRANT,
                $this->translator->trans('exception.invalid_credentials')
            );
        }

        return $isUserValid;
    }
}
