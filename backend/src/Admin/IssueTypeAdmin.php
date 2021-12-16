<?php

namespace App\Admin;

use App\Entity\IssueType;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class IssueTypeAdmin extends AbstractAdmin
{
    /**
     * {@inheritdoc}
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $choices = array_combine(IssueType::WHEN, IssueType::WHEN);
        $formMapper
            ->with('admin.article.section.general', [
                'class'       => 'col-md-12',
                'box_class'   => 'box box-solid box-primary',
            ])
                ->add('label', TextType::class, ['label' => 'admin.issue_type.field.label'])
                ->add('email', EmailType::class, ['label' => 'admin.issue_type.field.email'])
                ->addHelp('email', 'admin.issue_type.field.email.help')
                ->add('appearsWhen', ChoiceType::class, [
                    'label'        => 'admin.issue_type.field.appears_when',
                    'choices'      => $choices,
                ])
                ->addHelp('appearsWhen', 'admin.issue_type.field.appears_when.help')
            ->end()
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('label', null, ['label' => 'admin.issue_type.field.label'])
            ->add('email', null, ['label' => 'admin.issue_type.field.email'])
            ->add('appearsWhen', null, ['label' => 'admin.issue_type.field.appears_when'])
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $choices = array_combine(IssueType::WHEN, IssueType::WHEN);
        $listMapper
            ->add('label', null, ['label' => 'admin.issue_type.field.label', 'editable' => true])
            ->add('email', null, ['label' => 'admin.issue_type.field.email', 'editable' => true])
            ->add('appearsWhen', 'choice', [
                'editable' =>true,
                'label'        => 'admin.issue_type.field.appears_when',
                'choices'      => $choices,
                'catalogue' => 'messages'
            ])
            ->add('_action', null, [
                'actions' => [
                    'edit'   => [],
                    'delete' => [],
                ]
            ])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function isGranted($name, $object = null)
    {
        if ($name === 'DELETE' && $object && !$object->isDeletable()) {
            return false;
        }

        return parent::isGranted($name, $object);
    }

    /**
     * {@inheritdoc}
     */
    public function configureBatchActions($actions)
    {
        unset($actions['delete']);

        return $actions;
    }

    /**
     * {@inheritdoc}
     */
    public function getClassnameLabel()
    {
        return 'Sujets du formulaire de contact';
    }
}
