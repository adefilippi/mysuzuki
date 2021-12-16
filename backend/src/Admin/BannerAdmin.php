<?php


namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\Form\Type\DateTimePickerType;
use Sonata\MediaBundle\Form\Type\MediaType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;

class BannerAdmin extends TargetableAdmin
{
    protected $datagridValues = [
        '_sort_order' => 'ASC',
        '_sort_by'    => 'position',
    ];

    protected function configureFormFields(FormMapper $formMapper)
    {

        $formMapper
            ->with('admin.banner.section.informations', [
                'class'       => 'col-md-6',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('name',TextType::class, [
                    'label' => 'admin.banner.field.name'
                ])
                ->add('startDate',DateTimePickerType::class, [
                    'label' => 'admin.banner.field.start_date',
                ])
                ->addHelp('startDate', 'admin.banner.field.start_date.help')
                ->add('endDate', DateTimePickerType::class, [
                        'label' => 'admin.banner.field.end_date',
                ])
                ->add('position', IntegerType::class, ['label' => 'admin.banner.field.position'])
                ->addHelp('position', 'admin.banner.field.position.help')
            ->end()
            ->with('admin.banner.section.media',[
                'class'     => 'col-md-6',
                'box_class' => 'box box-solid box-primary',
            ])
                ->add('mediaDesktop', MediaType::class, [
                    'label'         => 'admin.banner.field.media_desktop',
                    'provider'      => 'sonata.media.provider.image',
                    'context'       => 'default',
                    'new_on_update' => false,
                ])
                ->add('mediaMobile', MediaType::class, [
                    'label'         => 'admin.banner.field.media_mobile',
                    'provider'      => 'sonata.media.provider.image',
                    'context'       => 'default',
                    'new_on_update' => false,
                ])
            ->end()
            ->with('admin.banner.section.link', [
                'class'     => 'col-md-12',
                'box_class' => 'box box-solid box-primary',
            ])
                ->add('link', UrlType::class, [
                    'label' => 'admin.banner.field.link'
                ])
            ->end()
        ;
        parent::configureFormFields($formMapper);
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('name', null, ['label' => 'admin.banner.field.name']);
        $listMapper->addIdentifier('startDate', null, ['label' => 'admin.banner.field.start_date']);
        $listMapper->addIdentifier('endDate', null, ['label' => 'admin.banner.field.end_date']);
        $listMapper->addIdentifier('link', null, ['label' => 'admin.banner.field.link']);
        $listMapper->addIdentifier('position', null, ['label' => 'admin.banner.field.position']);
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('startDate');
        $datagridMapper->add('endDate');
        $datagridMapper->add('name');
        $datagridMapper->add('position');
    }
}
