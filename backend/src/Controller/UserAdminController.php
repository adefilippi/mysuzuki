<?php

namespace App\Controller;

use App\Entity\AccessToken;
use App\Entity\Client;
use App\Entity\EmailConfirmationToken;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use FOS\OAuthServerBundle\Model\ClientManagerInterface;
use FOS\OAuthServerBundle\Model\Token;
use OAuth2\Model\OAuth2AccessToken;
use OAuth2\Model\OAuth2Token;
use Sonata\AdminBundle\Controller\CRUDController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use FOS\OAuthServerBundle\Util\Random;

class UserAdminController extends CRUDController
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var string
     */
    private $frontUrl;

    public function __construct(EntityManagerInterface $entityManager, string $frontUrl)
    {
        $this->em = $entityManager;
        $this->frontUrl = $frontUrl;
    }

    public function sendActivationLinkAction($id)
    {
        /** @var User $user */
        $user = $this->admin->getSubject();

        if (!$user) {
            throw new NotFoundHttpException(sprintf('unable to find the user with id: %s', $id));
        }

        // Create a new email confirmation token
        $token = new EmailConfirmationToken();
        $token->setUser($user);
        $token->setCallbackUrl($this->getParameter('email_confirmation_callback'));

        $this->em->persist($token);
        $this->em->flush();

        $this->addFlash('sonata_flash_success', 'Lien d\'activation correctement renvoyé à '.$user->getEmail());

        return new RedirectResponse($this->admin->generateUrl('list', ['filter' => $this->admin->getFilterParameters()]));
    }

    public function loginAsAction($id)
    {
        /** @var User $user */
        $user = $this->admin->getSubject();
        $client = $this->em->getRepository(Client::class)->findOneById(1);

        if (!$user) {
            throw new NotFoundHttpException(sprintf('unable to find the user with id: %s', $id));
        }

        // Create a new access token
        $token = AccessToken::create($client, Random::generateToken(), time() + 3600, $user);

        $this->em->persist($token);
        $this->em->flush();

        return new RedirectResponse(sprintf("%s/login-as/token=%s/", $this->frontUrl, $token->getToken()));
    }
}
