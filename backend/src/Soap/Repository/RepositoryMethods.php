<?php

namespace App\Soap\Repository;

/**
 * @author svianney <vianney@widop.com>
 */
class RepositoryMethods
{
    const CLIENT_VEHICLE = 'getInformationsClientVehicule';
    const VEHICLES_LIST = 'GetListVehiculeContact';
    const CLIENT_VEHICLE2 = 'GetInfoContactVehicule2';
    const CLIENT_ALL_VEHICLES = 'getInformationsClientAllVehicules';
    const CONTACT_VEHICLE = 'GetInfoContactVehicule2';
    const SAVE_CLIENT = 'saveClient3';
    const UPDATE_CONTACT_ENTREPRISE = 'UpdatecontactEntreprise';
    const SAVE_VEHICLE = 'saveVehicule';
    const DEALERSHIPS_LIST = 'GetListSiteDeVenteAll2';
    const WEB_DEALERSHIP = 'GetInfoWebSite';
    const VEHICLE_MAINTENANCES = 'GetInformationEntretienVehicule';
    const USER_PRE_REGISTRATION = 'Preinscription_Mysuzuki';
    const USER_REGISTRATION = 'Inscription_Mysuzuki';
    const OFFERS_LIST = 'Get_List_Coupons_Client';

    /**
     * @return array
     */
    public static function all()
    {
        return [
            'getInformationsClientVehicule',
            'GetListVehiculeContact',
            'GetInfoContactVehicule2',
            'getInformationsClientAllVehicules',
            'GetInfoContactVehicule2',
            'saveClient3',
            'UpdatecontactEntreprise',
            'saveVehicule',
            'GetListSiteDeVenteAll2',
            'GetInfoWebSite',
            'GetInformationEntretienVehicule',
            'Preinscription_Mysuzuki',
            'Inscription_Mysuzuki',
            'Get_List_Coupons_Client'
        ];
    }

    /**
     * @return array
     */
    public static function mocked()
    {
        return array_diff(
            self::all(),
            [
                'GetInfoWebSite',
                'GetListSiteDeVenteAll2',
            ]
        );
    }
}
