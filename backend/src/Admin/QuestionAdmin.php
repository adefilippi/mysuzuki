<?php

namespace App\Admin;

use App\Entity\IssueType;
use App\Entity\Question;
use App\Enum\QuestionCTATypeEnum;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ChoiceFieldMaskType;
use Sonata\AdminBundle\Form\Type\ModelAutocompleteType;
use Sonata\AdminBundle\Form\Type\ModelListType;
use Sonata\DoctrineORMAdminBundle\Filter\ModelAutocompleteFilter;
use Sonata\FormatterBundle\Form\Type\SimpleFormatterType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class QuestionAdmin extends AbstractAdmin
{
    /** @var string[] */
    protected $datagridValues = [
        '_sort_by' => 'position',
    ];

    /**
     * {@inheritdoc}
     */
    public function __construct(string $code, string $class, string $baseControllerName)
    {
        $this->formOptions['validation_groups'] = ['question_validation', 'Default'];
        parent::__construct($code, $class, $baseControllerName);
    }

    /**
     * {@inheritdoc}
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $issueTypes = $this
            ->configurationPool
            ->getContainer()
            ->get('doctrine.orm.entity_manager')
            ->getRepository(IssueType::class)
            ->findAll();

        $slugs = array_map(function ($type) {
                return is_object($type) ? $type->getSlug() : $type['slug'];
            },
            $issueTypes
        );

        $label = array_map(function ($type) {
                return is_object($type) ? $type->getLabel() : $type['label'];
            },
            $issueTypes
        );

        $choices = array_combine($label, $slugs);

        $formMapper
            ->with('admin.article.section.general', [
                'class'     => 'col-md-6',
                'box_class' => 'box box-solid box-primary',
            ])
                ->add('question', TextType::class, ['label' => 'admin.question.field.question'])
                ->add('answer', SimpleFormatterType::class, [
                    'label'            => 'admin.question.field.answer',
                    'format'           => 'richhtml',
                    'ckeditor_context' => 'minimalist_toolbar'
                ])
                ->add('position', IntegerType::class, ['label' => 'admin.topic.field.position'])
                ->addHelp('position', 'admin.question.field.position.help')
            ->end()
            ->with('admin.question.section.cta', [
                'class'       => 'col-md-6',
                'box_class'   => 'box box-solid box-primary',
                'description' => 'admin.question.section.cta.description'
            ])
                ->add('cta.type', ChoiceFieldMaskType::class, [
                    'label'   => 'admin.question.field.cta_type',
                    'choices' => array_combine(QuestionCTATypeEnum::toArray(), QuestionCTATypeEnum::toArray()),
                    'map'     => [
                        'form' => [
                            'cta.issueType', 'cta.label'
                        ],
                        'link' => [
                            'cta.content', 'cta.label'
                        ]
                    ],
                    'placeholder' => 'admin.question.field.type.placeholder',
                    'required'    => false,
                ])
                ->add('cta.content', TextType::class, [
                    'label'    => 'admin.question.field.cta_content',
                    'required' => false
                ])
                ->add('cta.issueType', ChoiceType::class, [
                    'label'       => 'admin.question.field.cta_issue_type',
                    'choices'     => $choices,
                    'required'    => false,
                    'placeholder' => 'admin.question.field.cta_issue_type.placeholder'
                ])
                ->add('cta.label', TextType::class, [
                    'label'    => 'admin.question.field.cta_label',
                    'required' => false
                ])
            ->end()
        ;

        if ($this->getRoot()->getClass() === Question::class) {
            $formMapper
                ->with('admin.question.section.questions', [
                    'class'     => 'col-md-6',
                    'box_class' => 'box box-solid box-primary',
                ])
                    ->add('topic', ModelListType::class, [
                        'label'      => 'admin.question.field.topic',
                        'btn_add'    => false,
                        'btn_delete' => false,
                        'btn_edit'   => false,
                    ])
                    ->addHelp('topic', 'admin.question.field.topic.help')
                    ->add('associatedQuestions', ModelAutocompleteType::class, [
                        'label'                => 'admin.question.field.associated_questions',
                        'required'             => false,
                        'multiple'             => true,
                        'by_reference'         => false,
                        'btn_add'              => false,
                        'property'             => 'question',
                        'minimum_input_length' => 0,
                    ])
                    ->addHelp('associatedQuestions', 'admin.question.field.associated_questions.help')
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
            ->add('question', null, ['label' => 'admin.question.field.question'])
            ->add('topic', ModelAutocompleteFilter::class, [
                    'label'    => 'admin.topic.field.label',
                    'multiple' => true
                ],
                ModelAutocompleteType::class,
                [
                    'multiple'             => true,
                    'by_reference'         => false,
                    'label'                => 'admin.question.field.topic',
                    'property'             => 'label',
                    'minimum_input_length' => 0,
                ]
            );
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('question', null, ['label' => 'admin.question.field.question'])
            ->add('topic.label', null, ['label' => 'admin.topic.field.label'])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getClassnameLabel()
    {
        return 'Question';
    }

    /**
     * {@inheritdoc}
     */
    public function preValidate($object)
    {
        parent::preValidate($object);

        $url = $object->getCTA()->getContent();

        $object->getCTA()->setContent(parse_url($url, PHP_URL_SCHEME) === null ? 'http://' . $url : $url);
    }
}
