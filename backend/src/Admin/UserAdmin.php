<?php

namespace App\Admin;

use App\Entity\User;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollection;
use Sonata\CoreBundle\Form\Type\BooleanType;
use Sonata\CoreBundle\Form\Type\DateTimePickerType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

/**
 * @author Jonathan Defraiteur as Jerry <jonathan.d@widop.com>
 */
class UserAdmin extends AbstractAdmin
{
    protected function configureRoutes(RouteCollection $collection)
    {
        $collection->add('sendActivationLink', $this->getRouterIdParameter().'/send-activation-link');
        $collection->add('loginAs', $this->getRouterIdParameter().'/login-as');
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        $civChoices = array_combine([
            'admin.user.choice.civ.m',
            'admin.user.choice.civ.mme',
            'admin.user.choice.civ.ste',
        ], User::$civs);

        $formMapper
            ->with('admin.user.section.recurrent', [
                'class'       => 'col-md-12',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('enabled', BooleanType::class, [
                    'label' => 'admin.user.field.enabled',
                    'transform' => true
                ])
                ->add('email', EmailType::class, [
                    'label' => 'admin.user.field.email',
                ])
            ->end()
            ->with('admin.user.section.general', [
                'class'       => 'col-md-8',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('civ', ChoiceType::class, [
                    'label'        => 'admin.user.field.civ',
                    'choices'      => $civChoices,
                    'choice_label' => function($category, $key, $value) {
                        return $key;
                    },
                    'required' => false,
                ])
                ->add('firstName', TextType::class, [
                    'label' => 'admin.user.field.first_name',
                    'required' => false,
                ])
                ->add('lastName', TextType::class, [
                    'label' => 'admin.user.field.last_name',
                    'required' => false,
                ])
            ->end()
            ->with('admin.user.section.information', [
                'class'       => 'col-md-4',
                'box_class'   => 'box box-solid box-default',
            ])
                ->add('id', TextType::class, [
                    'label' => 'admin.user.field.id',
                    'disabled' => true,
                    'required' => false,
                ])
                ->add('externalId', TextType::class, [
                    'label' => 'admin.user.field.external_id',
                    'disabled' => true,
                    'required' => false,
                ])
                ->add('signedUpAt', DateTimePickerType::class, [
                    'label' => 'admin.user.field.signed_up_at',
                    'disabled' => true,
                    'required' => false,
                ])
                ->add('updatedAt', DateTimePickerType::class, [
                    'label' => 'admin.user.field.updated_at',
                    'disabled' => true,
                    'required' => false,
                ])
                ->add('emailConfirmationSentAt', DateTimePickerType::class, [
                    'label' => 'admin.user.field.email_confirmation_sent_at',
                    'disabled' => true,
                    'required' => false,
                ])
            ->end()
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('externalId', null, ['label' => 'admin.user.field.external_id'])
            ->add('email', null, ['label' => 'admin.user.field.email'])
            ->add('firstName', null, ['label' => 'admin.user.field.first_name'])
            ->add('lastName', null, ['label' => 'admin.user.field.last_name'])
            ->add('enabled', null, ['label' => 'admin.user.field.enabled'])
            ->add('signedUpAt', null, ['label' => 'admin.user.field.signed_up_at'])
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('externalId', null, ['label' => 'admin.user.field.external_id'])
            ->add('email', null, ['label' => 'admin.user.field.email'])
            ->add('enabled', null, ['label' => 'admin.user.field.enabled'])
            ->add('firstName', null, ['label' => 'admin.user.field.first_name'])
            ->add('lastName', null, ['label' => 'admin.user.field.last_name'])
            ->add('signedUpAt', null, ['label' => 'admin.user.field.signed_up_at'])
            ->add('_action', null, [
                'actions' => [
                    'sendActivationLink' => [
                        'template' => 'admin/CRUD/list__action_send_activation_link.html.twig',
                    ],
                    'loginAsAnotherUser' => [
                        'template' => 'admin/CRUD/list__action_login_as_another_user.html.twig',
                    ],
                ]
            ])
        ;
    }

    public function getClassnameLabel()
    {
        return 'User';
    }
}
