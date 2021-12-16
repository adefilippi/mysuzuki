<?php

namespace App\Admin;

use App\Entity\ManualOffer;
use App\Enum\CTATypeEnum;
use App\Enum\TargetTypeEnum;
use App\Enum\OfferTypeEnum;
use App\Handler\ManualOfferHandler;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ChoiceFieldMaskType;
use Sonata\Form\Type\DateTimePickerType;
use Sonata\FormatterBundle\Form\Type\SimpleFormatterType;
use Sonata\MediaBundle\Form\Type\MediaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Twig\Environment;

/**
 * @author Thibault Richard <thibault@widop.com>
 * @author Jonathan as Jerry <jonathan.d@widop.com>
 */
class ManualOfferAdmin extends TargetableAdmin
{
    /** @var string[] */
    protected $datagridValues = [
        '_sort_order' => 'DESC',
        '_sort_by'    => 'startDate',
    ];

    /**
     * {@inheritdoc}
     */
    public function __construct(string $code, string $class, string $baseControllerName, ManualOfferHandler $handler, Environment $twig)
    {
        $this->formOptions['validation_groups'] = ['offer_validation', 'Default'];
        parent::__construct($code, $class, $baseControllerName, $twig, $handler);
    }

    public function getNewInstance()
    {
        /** @var ManualOffer $instance */
        $instance = parent::getNewInstance();
        // Manual offer are for everyone by default
        $instance->setTargetType(TargetTypeEnum::EVERYONE);
        return $instance;
    }

    private function getCtaFileFieldOptions(ManualOffer $offer)
    {
        $options = [
            'required' => false,
            'label' => 'admin.offer.field.file',
        ];
        if ($offer && ($webPath = $offer->getWebPath())) {
            $container = $this->getConfigurationPool()->getContainer();
            $fullPath = $container->get('request_stack')->getCurrentRequest()->getBasePath().'/'.$webPath;
            $extension = pathinfo($fullPath, PATHINFO_EXTENSION);

            $help = "<p>{$fullPath}<br/><a href='{$fullPath}' target='_blank' class='btn btn-default'><i class='fa fa-external-link' aria-hidden='true'></i> Ouvrir le document</a></p>";
            if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif'])) {
                $help .= "</br><img src='{$fullPath}' height='160' class='admin-preview'/>";
            }
            $options['help'] = $help;
        }
        return $options;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureFormFields(FormMapper $formMapper)
    {
        $selectableOfferType = [
            OfferTypeEnum::ADVANTAGE,
            OfferTypeEnum::GAME,
            OfferTypeEnum::INVITATION,
            OfferTypeEnum::OFFER,
            // Important: Not the TARGETED
        ];
        $typeChoices = array_combine($selectableOfferType, $selectableOfferType);
        $ctaChoices = array_combine(CTATypeEnum::toArray(), CTATypeEnum::toArray());
        $offer = $this->getSubject();
        $formMapper
            ->with('admin.offer.section.general', [
                'class'     => 'col-md-6',
                'box_class' => 'box box-solid box-default',
            ])
                ->add('title', TextType::class, ['label' => 'admin.offer.field.title'])
                ->add('type', ChoiceType::class, [
                    'label'   => 'admin.offer.field.type',
                    'choices' => $typeChoices
                ])
                ->add('summary', TextareaType::class, [
                    'label' => 'admin.offer.field.summary',
                    'required' => false,
                ])
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
            ->with('admin.offer.section.period', [
                'class'     => 'col-md-6',
                'box_class' => 'box box-solid box-default',
            ])
                ->add('startDate', DateTimePickerType::class, ['label' => 'admin.offer.field.start_date'])
                ->addHelp('startDate', 'admin.offer.field.start_date.help')
                ->add('endDate', DateTimePickerType::class, ['label' => 'admin.offer.field.end_date'])
            ->end()
            ->with('admin.offer.section.cta', [
                'class'       => 'col-md-6',
                'box_class'   => 'box box-solid box-default',
            ])
                ->add('cta.type', ChoiceFieldMaskType::class, [
                    'label'   => 'admin.offer.field.cta_type',
                    'choices' => $ctaChoices,
                    'map'     => [
                        CTATypeEnum::LINK => [
                            'cta.label', 'cta.content'
                        ],
                        CTATypeEnum::FILE => [
                            'ctaFile'
                        ],
                    ],
                    'placeholder' => 'admin.offer.field.type.placeholder',
                    'required'    => false,
                ])
                ->add('cta.content', TextType::class, [
                    'label'    => 'admin.offer.field.cta_content',
                    'required' => false
                ])
                ->add('cta.label', TextType::class, [
                    'label'    => 'admin.offer.field.cta_label',
                    'required' => false
                ])
                ->add('ctaFile', FileType::class, $this->getCtaFileFieldOptions($offer))
            ->end()
            ->with('admin.offer.section.content', [
                'class'     => 'col-md-12',
                'box_class' => 'box box-solid box-default',
            ])
                ->add('body.description', SimpleFormatterType::class, [
                    'label'            => 'admin.offer.field.body_description',
                    'format'           => 'richhtml',
                    'ckeditor_context' => 'simple_toolbar',
                ])
                ->add('body.rules', SimpleFormatterType::class, [
                    'label'            => 'admin.offer.field.body_rules',
                    'format'           => 'richhtml',
                    'ckeditor_context' => 'simple_toolbar'
                ])
                ->add('body.conditions', SimpleFormatterType::class, [
                    'label'            => 'admin.offer.field.body_conditions',
                    'format'           => 'richhtml',
                    'ckeditor_context' => 'simple_toolbar'
                ])
            ->end()
        ;
        parent::configureFormFields($formMapper);
    }

    /**
     * {@inheritdoc}
     */
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper
            ->add('title', null, ['label' => 'admin.offer.field.title'])
            ->add('type', null, ['label' => 'admin.offer.field.type'])
            ->add('startDate', null, ['label' => 'admin.offer.field.start_date'])
            ->add('endDate', null, ['label' => 'admin.offer.field.end_date'])
            ->add('noWelcomeOffer', 'doctrine_orm_callback', [
                'callback' => function($queryBuilder, $alias, $field, $value) {
                    if (!$value['value']) {
                        return;
                    }

                    $queryBuilder
                        ->andWhere('o.type != :type')
                        ->setParameter('type', 'welcome-offer');

                    return true;
                },
                'field_type' => CheckboxType::class
            ])
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper
            ->addIdentifier('title', null, ['label' => 'admin.offer.field.title'])
            ->add('type', 'trans', ['label' => 'admin.offer.field.type'])
            ->add('startDate', null, ['label' => 'admin.offer.field.start_date', 'format' => 'd/m/Y H:i:s'])
            ->add('endDate', null, ['label' => 'admin.offer.field.end_date', 'format' => 'd/m/Y H:i:s'])
            ->add('media', null, ['template' => 'admin/picture.html.twig'])
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getClassnameLabel()
    {
        return 'Offres nationales';
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

    public function postPersist($object)
    {
        $this->handler->uploadCtaFile($object);
    }

    public function postUpdate($object)
    {
        $this->postPersist($object);
    }

    public function prePersist($object)
    {
        parent::prePersist($object);

        if (null !== $object->getCtaFile()) {
            $this->handler->prepareCtaUpload($object);
        }
    }
}
