<?php

namespace App\Provider;

use ApiPlatform\Core\DataProvider\ContextAwareCollectionDataProviderInterface;
use ApiPlatform\Core\DataProvider\RestrictedDataProviderInterface;
use App\Entity\Article;
use App\Entity\FeaturedContent;
use App\Entity\Game;
use App\Entity\Offer;
use Doctrine\Common\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class FeaturedContentProvider implements ContextAwareCollectionDataProviderInterface, RestrictedDataProviderInterface
{
    const NUMBER_FEATURED_CONTENTS = 6;

    /** @var ManagerRegistry */
    private $managerRegistry;

    /** @var TokenStorageInterface */
    private $tokenStorage;

    /**
     * @param ManagerRegistry $managerRegistry
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(ManagerRegistry $managerRegistry, TokenStorageInterface $tokenStorage)
    {
        $this->managerRegistry = $managerRegistry;
        $this->tokenStorage = $tokenStorage;
    }

    public function supports(string $resourceClass, string $operationName = null, array $context = []): bool
    {
        return FeaturedContent::class === $resourceClass;
    }

    public function getCollection(string $resourceClass, string $operationName = null, array $context = [])
    {
        $featuredContents = $this->managerRegistry->getRepository($resourceClass)->findAllCurrent();

        if (count($featuredContents) === self::NUMBER_FEATURED_CONTENTS) {
            return $featuredContents;
        }

        $articles = $this->managerRegistry->getRepository(Article::class)->findLatestMaxResults(self::NUMBER_FEATURED_CONTENTS);
        $offers = $this->managerRegistry->getRepository(Offer::class)->findNotExpiredByUser(self::NUMBER_FEATURED_CONTENTS, $this->tokenStorage->getToken()->getUser());
        $games = $this->managerRegistry->getRepository(Game::class)->findLatestValidMaxResult(self::NUMBER_FEATURED_CONTENTS);
        $ordered = $this->orderArrayByOrderDate(array_merge($articles, $offers, $games));

        foreach ($ordered as $newFeaturedContent) {
            foreach ($featuredContents as $featuredContent) {
                if ($newFeaturedContent === $featuredContent->getContent()) {
                    continue 2;
                }
            }
            if ($newFeaturedContent instanceof Article) {
                $featuredContents[] = (new FeaturedContent())
                    ->setId(1)
                    ->setType('article')
                    ->setArticle($newFeaturedContent);
            }
            if ($newFeaturedContent instanceof Offer) {
                $featuredContents[] = (new FeaturedContent())
                    ->setId(1)
                    ->setType('offer')
                    ->setOffer($newFeaturedContent);
            }
            if ($newFeaturedContent instanceof Game) {
                $featuredContents[] = (new FeaturedContent())
                    ->setId(1)
                    ->setType('game')
                    ->setGame($newFeaturedContent);
            }
            if (count($featuredContents) === self::NUMBER_FEATURED_CONTENTS) {
                return $featuredContents;
            }
        }

        return $featuredContents;
    }

    public function orderArrayByOrderDate($array)
    {
        usort($array, function($a, $b) {
           return $b->getOrderDate() <=> $a->getOrderDate();
        });

        return $array;
    }
}
