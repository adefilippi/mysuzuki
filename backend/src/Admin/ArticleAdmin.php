<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ProxyQueryInterface;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\CoreBundle\Form\Type\DateTimePickerType;
use Sonata\FormatterBundle\Form\Type\SimpleFormatterType;
use Sonata\MediaBundle\Form\Type\MediaType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
abstract class ArticleAdmin extends AbstractAdmin
{
    protected const CHOICES = [
        'news',
        'advice',
        'tutorial',
    ];

    protected $datagridValues = [
        '_sort_order' => 'DESC',
        '_sort_by'    => 'publishDate',
    ];

    /**
     * {@inheritdoc}
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $image = $this->getSubject();
        $formMapper
            ->with('admin.article.section.general', [
                'class'       => 'col-md-6',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('title', TextType::class, ['label' => 'admin.article.field.title'])
                ->add('excerpt', TextareaType::class, ['label' => 'admin.article.field.excerpt'])
                ->add('category', ChoiceType::class, [
                    'label'        => 'admin.article.field.category',
                    'choices'      => static::CHOICES,
                    'choice_label' => function($category, $key, $value) {
                        return $value;
                    },
                    'label_attr' => $this->getChoiceAttr(),
                    'attr' => $this->getChoiceAttr(),
                ])
            ->end()
            ->with('admin.article.section.informations', [
                'class'       => 'col-md-6',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('publishDate', DateTimePickerType::class, [
                    'label'          => 'admin.article.field.publish_date',
                    'dp_use_current' => true
                ])
                ->addHelp('publishDate', 'admin.article.field.publish_date.help')
                ->add('media', MediaType::class, [
                    'label'         => 'admin.article.field.media',
                    'provider'      => 'sonata.media.provider.image',
                    'context'       => 'default',
                    'new_on_update' => false,
                ])
                ->addHelp('media', 'admin.article.field.media.help') // TODO allow to set variables in translation
            ->end()
            ->with('admin.article.section.content', [
                'class'       => 'col-md-12',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('body', SimpleFormatterType::class, [
                    'label'            => 'admin.article.field.body',
                    'format'           => 'richhtml',
                    'ckeditor_context' => 'simple_toolbar_with_upload'
                ])
            ->end()
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('title', null, ['label' => 'admin.article.field.title']);

        $datagridMapper->add('publishDate', null, ['label' => 'admin.article.field.publish_date', 'format' => 'd/m/Y H:i:s']);
    }

    /**
     * {@inheritdoc}
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('title', null, ['label' => 'admin.article.field.title']);
        $listMapper->add('category', 'trans', ['label' => 'admin.article.field.category']);
        $listMapper->add('publishDate', null, ['label' => 'admin.article.field.publish_date', 'format' => 'd/m/Y H:i:s']);
        $listMapper->add('media', null, ['template' => 'admin/picture.html.twig']);
    }

    public function configureQuery(ProxyQueryInterface $query): ProxyQueryInterface
    {
        $query = parent::configureQuery($query);

        $query->andWhere(
            $query->expr()->in($query->getRootAliases()[0] . '.category', static::CHOICES)
        );

        return $query;
    }

    private function getChoiceAttr(): array
    {
        return count(static::CHOICES) === 1 ? ['class' => 'hidden'] : [];
    }

    public function getClassnameLabel()
    {
        return 'Article';
    }
}
