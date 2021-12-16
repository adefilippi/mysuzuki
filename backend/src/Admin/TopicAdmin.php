<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\CoreBundle\Form\Type\CollectionType;
use Sonata\MediaBundle\Form\Type\MediaType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class TopicAdmin extends AbstractAdmin
{
    /** @var string[]  */
    protected $datagridValues = [
        '_sort_by' => 'position',
    ];

    /**
     * {@inheritdoc}
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper
            ->with('admin.topic.section.general', [
                'class'     => 'col-md-12',
                'box_class' => 'box box-solid box-primary',
            ])
                ->add('label', TextType::class, ['label' => 'admin.topic.field.label'])
                ->add('position', IntegerType::class, ['label' => 'admin.topic.field.position'])
                ->addHelp('position', 'admin.topic.field.position.help')
                ->add('media', MediaType::class, [
                        'label'         => 'admin.topic.field.media',
                        'provider'      => 'sonata.media.provider.file',
                        'context'       => 'default',
                        'new_on_update' => false,
                    ])
            ->end()
        ;

        if (!$this->isCurrentRoute('create')) {
            $formMapper
                ->with('admin.topic.section.questions', [
                    'class'       => 'col-md-12',
                    'box_class'   => 'box box-solid box-primary',
                    'description' => 'admin.topic.section.questions.description',
                ])
                    ->add('questions', CollectionType::class, [
                        'label'        => 'admin.topic.field.questions',
                        'by_reference' => false,
                    ], [
                            'edit'     => 'inline',
                            'inline'   => 'tabs',
                        ]
                    )
                ->end()
            ;
        }
    }

    /**
     * {@inheritdoc}
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('label', null, ['label' => 'admin.topic.field.label'])
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('label', null, ['label' => 'admin.topic.field.label'])
            ->add('position', null, ['label' => 'admin.topic.field.position'])
            ->add('media', null, ['label' => 'admin.topic.field.media', 'template' => 'admin/picture.html.twig'])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getClassnameLabel()
    {
        return 'Sujet';
    }
}
