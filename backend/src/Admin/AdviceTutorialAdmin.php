<?php

namespace App\Admin;

use Doctrine\ORM\QueryBuilder;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ModelAutocompleteType;
use Sonata\AdminBundle\Form\Type\ModelType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class AdviceTutorialAdmin extends ArticleAdmin
{
    protected const CHOICES = ['advice', 'tutorial'];

    protected $baseRouteName = 'admin_advice_tutorial';
    protected $baseRoutePattern = 'advice-tutorial';

    protected function configureFormFields(FormMapper $formMapper)
    {
        parent::configureFormFields($formMapper);

        $formMapper
            ->with('admin.article.section.general', [
                'class'       => 'col-md-6',
                'box_class'   => 'box box-solid box-primary',
            ])
            ->add('tags', ModelAutocompleteType::class, [
                'label'                => 'admin.article.field.tags',
                'required'             => false,
                'multiple'             => true,
                'by_reference'         => false,
                'btn_add'              => 'Ajouter',
                'property'             => 'name',
                'minimum_input_length' => 0,
            ])
            ->add('vehicleModels', ModelAutocompleteType::class, [
                'label'                => 'admin.article.field.vehicle_models',
                'required'             => false,
                'multiple'             => true,
                'by_reference'         => false,
                'btn_add'              => 'Ajouter',
                'property'             => 'name',
                'minimum_input_length' => 0,
            ])
        ->end();

    }
}
