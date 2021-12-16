<?php

namespace App\Workflow;

use App\Entity\Article;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class ArticleSubscriber implements EventSubscriber
{
    const ASSOCIATED_ARTICLES = 4;

    /** @var ManagerRegistry */
    private $registry;

    /**
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        $this->registry = $registry;
    }

    /**
     * {@inheritdoc}
     */
    public function getSubscribedEvents()
    {
        return [
            Events::postLoad,
            Events::prePersist,
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postLoad(LifecycleEventArgs $args)
    {
        $this->associateLatestArticles($args);
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $this->associateLatestArticles($args);
    }

    /**
     * @param LifecycleEventArgs $args
     */
    private function associateLatestArticles(LifecycleEventArgs $args)
    {
        $article = $args->getEntity();

        if (!$article instanceof Article) {
            return;
        }

        if ($article->getAssociatedArticles()->count() < self::ASSOCIATED_ARTICLES) {
            $manager = $this->registry->getManager();

            $latest = $manager
                ->getRepository(Article::class)
                ->findLatest(self::ASSOCIATED_ARTICLES, $article);

            $article->setAssociatedArticles(new ArrayCollection($latest));
            $manager->flush();
        }
    }
}
