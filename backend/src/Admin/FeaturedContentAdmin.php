<?php

namespace App\Admin;

use App\Entity\Game;
use App\Repository\ArticleRepository;
use App\Repository\GameRepository;
use App\Repository\OfferRepository;
use App\Entity\Article;
use App\Entity\Offer;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ChoiceFieldMaskType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

/**
 * @author Amélie Guers <amelie@widop.com>
 */
class FeaturedContentAdmin extends AbstractAdmin
{
    protected const CHOICES = [
        'article', 'offer', 'game'
    ];

    /**
     * {@inheritdoc}
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('admin.featured_content.section.title', [
                'class'       => 'col-md-12',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('type', ChoiceFieldMaskType::class, [
                    'label'        => 'admin.featured_content.field.type',
                    'choices'      => static::CHOICES,
                    'choice_label' => function($value) {
                        return $value;
                    },
                    'map' => [
                        'article' => ['article'],
                        'offer' => ['offer'],
                        'game' => ['game'],
                    ],
                ])
                ->add('article', EntityType::class, [
                    'class' => Article::class,
                    'required' => true,
                    'label' => 'admin.featured_content.field.article',
                    'choice_label' => 'title',
                    'query_builder' => function (ArticleRepository $articleRepository) {
                        return $articleRepository->findLatestAll();
                    },
                ],
                    ['admin_code' => 'App\Admin\NewsAdmin']
                )
                ->add('offer', EntityType::class, [
                    'class' => Offer::class,
                    'required' => true,
                    'label' => 'admin.featured_content.field.offer',
                    'choice_label' => 'title',
                    'query_builder' => function (OfferRepository $offerRepository) {
                        return $offerRepository->findNotExpired();
                    },
                ])
                ->add('game', EntityType::class, [
                    'class' => Game::class,
                    'required' => true,
                    'label' => 'admin.featured_content.field.game',
                    'choice_label' => 'title',
                    'query_builder' => function (GameRepository $gameRepository) {
                        return $gameRepository->findNotExpired();
                    },
                ])
            ->end();
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('type',  'trans', ['label' => 'admin.featured_content.label.type' ]);
        $listMapper->add('entityTitle', null, ['label' => 'admin.featured_content.label.entity']);
    }
}
