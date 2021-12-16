<?php

namespace App\Workflow;

use App\Entity\EmailConfirmationToken;
use App\Entity\User;
use App\Mailer\Mailer;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @author svianney <vianney@widop.com>
 */
class EmailConfirmationTokenSubscriber implements EventSubscriber
{
    /** @var TokenStorageInterface */
    protected $storage;

    /** @var Mailer */
    protected $mailer;

    /**
     * @param TokenStorageInterface $storage
     * @param Mailer                $mailer
     * @param string                $frontxBaseUrl
     */
    public function __construct(TokenStorageInterface $storage, Mailer $mailer)
    {
        $this->storage = $storage;
        $this->mailer = $mailer;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
            Events::postPersist,
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $token = $args->getEntity();

        if (!$token instanceof EmailConfirmationToken || $token->hasExpired()) {
            return;
        }

        if (!$token->getUser()) {
            $token->setUser($this->storage->getToken()->getUser());
        }
        $this->expirePrevious($token, $args->getEntityManager());

        $user = $token->getUser();
        $user->setEmailConfirmationSentAt(new \DateTime());
        $args->getEntityManager()->flush();
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postPersist(LifecycleEventArgs $args)
    {
        $token = $args->getEntity();

        if (!$token instanceof EmailConfirmationToken || $token->hasExpired()) {
            return;
        }

        $this->sendEmail($token);
    }

    /**
     * @param EmailConfirmationToken $token
     * @param EntityManagerInterface $em
     */
    private function expirePrevious(EmailConfirmationToken $token, EntityManagerInterface $em)
    {
        $tokens = $em
            ->getRepository(EmailConfirmationToken::class)
            ->findUnexpiredByUser($token->getUser())
        ;

        if(count($tokens) > 0) {
            foreach ($tokens as $token) {
                $token->expire();
            }

            $em->flush();
        }
    }

    /**
     * @param $token
     */
    private function sendEmail(EmailConfirmationToken $token)
    {
        $user = $token->getUser();
        $this->mailer->sendEmail(
            'email_confirmation',
            $user->getEmail(),
            [
                'CIV'          => User::getCivsLabel()[$user->getCiv()],
                'NOM'          => $user->getLastName(),
                'CONFIRMATION' => sprintf(
                    '%s?token=%s',
                    $token->getCallbackUrl(),
                    $token->getToken()
                ),
            ]
        );
    }
}
