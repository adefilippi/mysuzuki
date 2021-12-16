<?php

namespace App\Workflow;

use App\Entity\PasswordRequestToken;
use App\Entity\User;
use App\Mailer\Mailer;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class PasswordRequestTokenSubscriber implements EventSubscriber
{
    /** @var Mailer */
    private $mailer;

    /**
     * @param Mailer $mailer
     */
    public function __construct(Mailer $mailer)
    {
        $this->mailer = $mailer;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return [
            Events::postPersist,
            Events::prePersist,
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $passwordRequestToken = $args->getEntity();

        if (!$passwordRequestToken instanceof PasswordRequestToken) {
            return;
        }

        /** @var User $user */
        $user = $args->getEntityManager()->getRepository(User::class)->findOneByEmail(
            $passwordRequestToken->getEmail()
        );

        if (empty($user)) {
            throw new BadRequestHttpException('No user found for that email');
        }

        $passwordRequestToken->setUser($user);
        $this->expirePrevious($passwordRequestToken, $args->getEntityManager());
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postPersist(LifecycleEventArgs $args)
    {
        $passwordRequestToken = $args->getEntity();

        if (!$passwordRequestToken instanceof PasswordRequestToken){
            return;
        }

        /**  @var User */
        $user = $passwordRequestToken->getUser();

        $this->mailer->sendEmail(
            'password_reset',
            $user->getEmail(),
            [
                'CIV'        => User::getCivsLabel()[$user->getCiv()],
                'NOM'        => $user->getLastName(),
                'MOTDEPASSE' => sprintf(
                    '%s?token=%s',
                    $passwordRequestToken->getCallbackUrl(),
                    $passwordRequestToken->getToken()
                ),
            ]
        );
    }

    /**
     * @param PasswordRequestToken $token
     * @param EntityManagerInterface $em
     */
    private function expirePrevious(PasswordRequestToken $token, EntityManagerInterface $em)
    {
        /** @var PasswordRequestToken[] $tokens */
        $tokens = $em
            ->getRepository(PasswordRequestToken::class)
            ->findToExpire($token->getUser())
        ;

        if(count($tokens) > 0) {
            foreach ($tokens as $token) {
                $token->expire();
            }

            $em->flush();
        }
    }
}
