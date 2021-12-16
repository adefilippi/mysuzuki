<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ModelAutocompleteType;

class VehicleModelAdmin extends AbstractAdmin
{
    protected function configureFormFields(FormMapper $formMapper)
    {
        parent::configureFormFields($formMapper);

        $formMapper
            ->with('admin.vehicle_model.section.general', [
                'class'       => 'col-md-6',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('name', null, [
                    'label' => 'admin.vehicle_model.field.name',
                ])
            ->end()
        ;
    }

    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('name', null, ['label' => 'admin.vehicle_model.field.name']);
    }

    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('name', null, ['label' => 'admin.tag.field.name'])
        ;
    }
}
