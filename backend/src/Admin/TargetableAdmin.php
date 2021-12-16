<?php

namespace App\Admin;

use App\Entity\Contract\Targetable;
use App\Entity\ManualOffer;
use App\Enum\TargetTypeEnum;
use App\Handler\TargetFileHandler;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Form\Type\ChoiceFieldMaskType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Twig\Environment;

abstract class TargetableAdmin extends AbstractAdmin
{
    /**
     * @var Environment
     */
    private $twig;

    protected $handler;

    public function __construct($code, $class, $baseControllerName, Environment $twig, TargetFileHandler $handler)
    {
        parent::__construct($code, $class, $baseControllerName);
        $this->twig = $twig;
        $this->handler = $handler;
    }

    /**
     * Required when a file is uploaded, and nothing else is changed on the form.
     * https://sonata-project.org/bundles/admin/3-x/doc/cookbook/recipe_file_uploads.html
     *
     * @param ManualOffer|object $object
     */
    public function prePersist($object)
    {
        // Targeting
        if ($object->getTargetType() !== TargetTypeEnum::FILTERED && !$object->getUsers()->isEmpty()) {
            $object->setUsers([]);
        } elseif (null !== $object->getClientIdsFile()) {
            $this->handler->attachUsersFromClientIds($object);
        } elseif (null !== $object->getVinsFile()) {
            $this->handler->attachUsersFromVins($object);
        }
    }

    public function preUpdate($object)
    {
        $this->prePersist($object);
    }

    protected function configureFormFields(FormMapper $formMapper)
    {
        /** @var Targetable $target */
        $target = $this->getSubject();

        $formMapper
          ->with('admin.target.section.targeting', [
              'class'       => 'col-md-6',
              'box_class'   => 'box box-solid box-default',
          ])
              ->add('targetType', ChoiceFieldMaskType::class, $this->getTargetFieldOptions($target))
              ->add('clientIdsFile', FileType::class, [
                  'label'    => 'admin.target.field.clientIdsFile',
                  'help'     => 'admin.target.field.clientIdsFile.help',
                  'required' => false,
              ])
              ->add('vinsFile', FileType::class, [
                  'label'    => 'admin.target.field.vinsFile',
                  'help'     => 'admin.target.field.vinsFile.help',
                  'required' => false,
              ])
          ->end();
    }

    private function getTargetFieldOptions(Targetable $target)
    {
        $selectableTargetType = [
            TargetTypeEnum::EVERYONE,
            TargetTypeEnum::FILTERED,
            TargetTypeEnum::NONE,
        ];
        $targetTypeChoices = array_combine($selectableTargetType, $selectableTargetType);

        $options = [
            'label'   => 'admin.target.field.targetType',
            'choices' => $targetTypeChoices,
            'map'     => [
                TargetTypeEnum::FILTERED => [
                    'vinsFile', 'clientIdsFile'
                ],
            ],
            'required' => false,
        ];

        $help = 'admin.target.field.targetType.help';

        if ($target && $target->getTargetType() == TargetTypeEnum::FILTERED) {
            $users = $target->getUsers();
            $help = $this->twig->render('admin/target.html.twig', ['users' => $users]);
        }

        $options['help'] = $help;
        return $options;
    }
}
