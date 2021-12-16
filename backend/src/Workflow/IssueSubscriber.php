<?php

namespace App\Workflow;

use App\Entity\Issue;
use App\Mailer\Mailer;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;
use Symfony\Bundle\TwigBundle\DependencyInjection\TwigExtension;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Templating\EngineInterface;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class IssueSubscriber implements EventSubscriber
{
    /** @var TokenStorageInterface */
    protected $storage;

    /** @var Mailer */
    protected $mailer;

    /** @var RequestStack */
    private $requestStack;

    /** @var EngineInterface */
    private $templating;

    /**
     * @param TokenStorageInterface $storage
     * @param Mailer                $mailer
     * @param RequestStack          $requestStack
     * @param EngineInterface       $templating
     */
    public function __construct(
        TokenStorageInterface $storage,
        Mailer $mailer,
        RequestStack $requestStack,
        EngineInterface $templating
    ) {
        $this->storage = $storage;
        $this->mailer = $mailer;
        $this->requestStack = $requestStack;
        $this->templating = $templating;
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
        $issue = $args->getEntity();

        if (!$issue instanceof Issue) {
            return;
        }

        if ($this->storage->getToken()->getUser() !== null) {
            $user = $this->storage->getToken()->getUser();

            $issue->setEmail($user->getEmail());
            $issue->setName($user->getName());
        }

        $issue->setMessage($this->templating->render('mail/issue_message.html.twig', ['issue' => $issue]));

        if ($issue->getEmail() === null) {
            throw new BadRequestHttpException('issue.email.not_null_no_user');
        }
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postPersist(LifecycleEventArgs $args)
    {
        $issue = $args->getEntity();

        if (!$issue instanceof Issue) {
            return;
        }

        $this->sendEmail($issue);
    }

    /**
     * @param Issue $issue
     */
    private function sendEmail(Issue $issue)
    {
        $this->mailer->sendEmail(
            'issue',
            $issue->getType()->getEmail(),
            [
                'NATURE'  => $issue->getType()->getLabel(),
                'OBJET'   => $issue->getSubject(),
                'MESSAGE' => $issue->getMessage(),
                'VIN'     => $issue->getVin() ?? 'N/A',
                'NOM'     => $issue->getName() ?? 'N/A',
                'EMAIL'   => $issue->getEmail(),
            ]
        );
    }
}
