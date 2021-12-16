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
class ParticipationAdmin extends AbstractAdmin
{
    protected function configureDatagridFilters(DatagridMapper $filter)
    {
        $filter->add('game');
    }

    public function getDataSourceIterator()
    {
        $iterator = parent::getDataSourceIterator();
        $iterator->setDateTimeFormat('d/m/Y H:i:s');
        return $iterator;
    }

    public function getExportFields()
    {
        return [
            'Date de participation' => 'createdAt',
            'Jeu'                   => 'game.title',
            'Id CRM'                => 'user.externalId',
            'Nom de famille'        => 'user.lastName',
            'Prénom'                => 'user.firstName',
            'Téléphone mobile'      => 'user.mobilePhoneFormatted',
            'Téléphone fixe'        => 'user.landlinePhoneFormatted',
            'Email'                 => 'user.email',
            'Rue'                   => 'user.address.street',
            'Complément 1'          => 'user.address.additional1',
            'Complément 2'          => 'user.address.additional2',
            'Code postal'           => 'user.address.zipCode',
            'Ville'                 => 'user.address.city',
        ];
    }

    public function getClassnameLabel()
    {
        return 'Participation';
    }
}
