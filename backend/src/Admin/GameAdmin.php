<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\Form\Type\DateTimePickerType;
use Sonata\MediaBundle\Form\Type\MediaType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Vich\UploaderBundle\Form\Type\VichFileType;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class GameAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        $requiredFields = [
            'lastName',
            'firstName',
            'phone',
            'address',
            'email',
        ];

        $formMapper
            ->with('admin.offer.section.general', [
                'class'     => 'col-md-6',
                'box_class' => 'box box-solid box-default',
            ])
                ->add('title', TextType::class, ['label' => 'admin.offer.field.title'])
                ->add('summary', TextareaType::class, [
                    'label' => 'admin.offer.field.summary',
                    'required' => false,
                ])
                ->add('requiredFields', ChoiceType::class, [
                    'label'   => 'admin.game.field.requiredFields',
                    'choices' => array_combine($requiredFields, $requiredFields),
                    'multiple' => true,
                    'expanded' => true,
                ])
                ->add('maximumParticipants', IntegerType::class, [
                    'label'   => 'admin.game.field.maximumParticipants',
                    'required' => false,
                ])
                ->addHelp('maximumParticipants', 'admin.game.help.maximumParticipants')
                ->add('file', VichFileType::class, [
                    'label' => 'admin.game.field.file',
                    'required' => $this->isCurrentRoute('create'),
                    'allow_delete' => true,
                ])
            ->end()
            ->with('admin.offer.section.period', [
                'class'     => 'col-md-6',
                'box_class' => 'box box-solid box-default',
            ])
                ->add('startDate', DateTimePickerType::class, ['label' => 'admin.offer.field.start_date'])
                ->addHelp('startDate', 'admin.offer.field.start_date.help')
                ->add('endDate', DateTimePickerType::class, ['label' => 'admin.offer.field.end_date'])
            ->end()
            ->with('admin.offer.section.media', [
                'class'     => 'col-md-6',
                'box_class' => 'box box-solid box-default',
            ])
                ->add('media', MediaType::class, [
                    'label'         => 'admin.offer.field.media',
                    'provider'      => 'sonata.media.provider.image',
                    'context'       => 'default',
                    'new_on_update' => false,
                ])
                ->addHelp('media', 'admin.offer.field.media.help')
            ->end()
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('title', null, ['label' => 'admin.offer.field.title'])
            ->add('startDate', null, ['label' => 'admin.offer.field.start_date'])
            ->add('endDate', null, ['label' => 'admin.offer.field.end_date'])
        ;
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('title', null, ['label' => 'admin.offer.field.title'])
            ->add('startDate', null, ['label' => 'admin.offer.field.start_date', 'format' => 'd/m/Y H:i:s'])
            ->add('endDate', null, ['label' => 'admin.offer.field.end_date', 'format' => 'd/m/Y H:i:s'])
            ->add('media', null, ['template' => 'admin/picture.html.twig'])
            ->add('_action', null, [
                'actions' => [
                    'export' => [],
                ],
            ]);
        ;
    }

    public function getClassnameLabel()
    {
        return 'Jeux';
    }
}
