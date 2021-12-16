<?php

namespace App\Soap\Mocker;

use App\Entity\Dealership;
use App\Enum\ReductionTypeEnum;
use App\Enum\SpecialOffersEnum;
use App\Soap\Mapping\OfferMapping;
use App\Soap\Repository\RepositoryMethods;
use App\Soap\Transformer\OfferTransformer;
use Doctrine\ORM\EntityManager;
use Faker\Generator;
use SoapBundle\Mocker\MockerInterface;
use SoapBundle\Mocker\MockStage;

/** @author Thibault Richard <thibault@widop.com> */
class DpsWsMocker implements MockerInterface
{
    const KEY_ID = 'id';
    const KEY_NAME = 'name';
    const KEY_VIN = 'vin';
    const KEY_EMAIL = 'email';
    private static $users = [
        1    => [
            self::KEY_ID => '1',
            self::KEY_NAME => 'RICHARD',
            self::KEY_VIN => ['19UUB2F73FA074352'],
            self::KEY_EMAIL => 'thibault@widop.com'
        ],
        3456 => [
            self::KEY_ID => '3456',
            self::KEY_NAME => 'THOMAS',
            self::KEY_VIN => ['19UUB2F73FA074353'],
            self::KEY_EMAIL => 'thomas@dummy.test'
        ],
        457  => [
            self::KEY_ID => '457',
            self::KEY_NAME => 'DOE',
            self::KEY_VIN => ['19UUB2F73FA074354'],
            self::KEY_EMAIL => 'doe@dummy.test'
        ],
        9900001 => [
            self::KEY_ID => '9900001',
            self::KEY_NAME => 'DUPONT',
            self::KEY_VIN => ['19UUB2F73FA074355'],
            self::KEY_EMAIL => 'dupont@dummy.test'
        ],
        9900002 => [
            self::KEY_ID => '9900002',
            self::KEY_NAME => 'MARTIN',
            self::KEY_VIN => ['19UUB2F73FA074356'],
            self::KEY_EMAIL => 'martin@dummy.test'
        ],
        9900003 => [
            self::KEY_ID => '9900003',
            self::KEY_NAME => 'BERNARD',
            self::KEY_VIN => ['19UUB2F73FA074357'],
            self::KEY_EMAIL => 'bernard@dummy.test'
        ],
        9900004 => [
            self::KEY_ID => '9900004',
            self::KEY_NAME => 'PETIT',
            self::KEY_VIN => ['19UUB2F73FA074358'],
            self::KEY_EMAIL => 'petit@dummy.test'
        ],
    ];

    /** @var \Doctrine\ORM\EntityManager */
    private $em;

    /**
     * @param \Doctrine\ORM\EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    public static function searchUserById($id)
    {
        return isset(self::$users[$id]) ? self::$users[$id] : null;
    }

    public static function searchUserBy(string $key, $value)
    {
        foreach (self::$users as $user) {
            if (isset($user[$key])) {
                if (is_array($user[$key]) && in_array($value, $user[$key])){
                    return $user;
                }

                if ($user[$key] === $value){
                    return $user;
                }
            }
        }
        return null;
    }

    /** {@inheritdoc} */
    public function support($function, $stage)
    {
        $availableCommands = RepositoryMethods::mocked();

        return in_array($function, $availableCommands) && $stage === MockStage::CALL;
    }

    /** {@inheritdoc} */
    public function mock($function, $stage, $arguments)
    {
        if ($stage === MockStage::REQUEST) {
            return false;
        }

        return $this->$function($arguments);
    }

    /**
     * @param array $arguments
     *
     * @return \stdClass
     * @throws \SoapFault
     */
    public function getInformationsClientVehicule($arguments)
    {
        $vin = $arguments[0]['vin'];
        $nom = $arguments[0]['nom'];

        // Valid values
        if (!preg_match('/[A-HJ-NPR-Z0-9]{17}/i', $vin)){
            throw new \SoapFault('Sender', 'Le VIN doit comporter 17 caractères et être composé uniquement de chiffres et de lettres.');
        } else if (!preg_match('/^[A-Z]+$/', $nom)) {
            throw new \SoapFault('Sender', 'Le nom du client (nom de famille ou raison sociale) est obligatoire et ne doit pas comporter de caractères spéciaux ni de minuscules.');
        }
        // Test values match
        $user = self::searchUserBy(self::KEY_NAME, $nom);
        if (null === $user || !in_array($vin, $user[self::KEY_VIN])) {
            throw new \SoapFault('Sender', sprintf( 'Erreur recherche du couple client/véhicule. params -> nom : %s, vin : %s Aucun résultat trouvé', $nom, $vin));
        }
        // Respond
        $faker = \Faker\Factory::create('fr_FR');

        $response = new \stdClass();
        $result = new \stdClass();
        $response->getInformationsClientVehiculeResult = $result;
        $client = new \stdClass();
        $result->client = $client;

        $champs_modifies = new \stdClass();
        $champs_modifies->string = [];

        for ($i = 0; $i < 22; $i++) {
            $champs_modifies->string[] = null;
        }

        $client->champs_modifies = $champs_modifies;
        $client->id_client = $user[self::KEY_ID];
        $client->adr4 = $faker->streetAddress();
        $client->pays = $faker->countryCode();
        $client->civ1 = $faker->randomElement(['M', 'MME', 'STE']);
        $client->nom = $user[self::KEY_NAME];
        $gender = 'female';

        if ($client->civ1 === 'M') {
            $gender = 'male';
        }
        $client->prenom1 = $faker->firstName($gender);
        $client->code_postal = str_replace(' ', '', $faker->postcode());
        $client->ville = $faker->city();
        $client->insee = str_replace(' ', '', $faker->postcode());

        $client->code_ce = $this->randomDealership($faker);

        $client->mobile = '0602455898';
        $client->email = $user[self::KEY_EMAIL];
        $client->date_naissance1 = $faker->dateTime()->format('Y-m-d\T00:00:00');
        $client->optin_email1 = $faker->boolean();

        $vehicule = new \stdClass();
        $result->vehicule = $vehicule;
        $vehicule->code_vin = $user[self::KEY_VIN][0]; 
        $vehicule->libelle_gamme = 'ANCIENNE SWIFT 5 PTES';
        $vehicule->carroserie = 'CI';
        $vehicule->energie = 'ES';
        $vehicule->code_couleur = 'ZCD';
        $vehicule->libelle_couleur = 'GALACTIC GRAY METAL';
        $vehicule->date_achat_vehicule = $faker->dateTimeThisDecade()->format('Y-m-d\T00:00:00');
        $vehicule->kilometrage = $faker->numberBetween(0, 300000);
        $vehicule->id_conc_orig_vehicule = $this->randomDealership($faker, 75, true);
        $vehicule->date_entretien = $faker->dateTimeBetween($vehicule->date_achat_vehicule)->format('Y-m-d\T00:00:00');

        return $response;
    }

    /**
     * @param $arguments
     *
     * @return \stdClass
     * @throws \SoapFault
     */
    public function GetInfoContactVehicule2($arguments){
        $client_id = $arguments[0]['id_client'];
        $vin = $arguments[0]['Vin'];

        $user = self::searchUserById($client_id);
        if (null !== $user && in_array($vin, $user[self::KEY_VIN])) {
            $faker = \Faker\Factory::create('fr_FR');

            $response = new \stdClass();
            $result = new \stdClass();
            $response->GetInfoContactVehicule2Result = $result;
            $contact2 = new \stdClass();
            $result->contact2 = $contact2;

            $contact2->id_client = $user[self::KEY_ID];
            $contact2->civ = 'M';
            $contact2->nom = $user[self::KEY_NAME];
            $contact2->prenom = 'John';
            $contact2->adr4 = $faker->streetAddress();
            $contact2->pays = $faker->countryCode();
            $contact2->code_postal = str_replace(' ', '', $faker->postcode());
            $contact2->ville = $faker->city();
            $contact2->mobile = '0602455898';
            $contact2->email = $user[self::KEY_EMAIL];
            $contact2->optin_email = $faker->boolean();
            $contact2->date_naissance = $faker->dateTimeThisCentury()->format('Y-m-d\T00:00:00');
            $contact2->Demarchage_Tel = $faker->boolean();
            $contact2->Demarchage_mobile = $faker->boolean();
            $contact2->statut = 'C';

            $contact2->Code_CE = $this->randomDealership($faker);

            $contact2->optin_SMS = $faker->boolean();
            $contact2->Bloctel_tel = $faker->boolean();
            $contact2->Bloctel_mobile = $faker->boolean();
            $contact2->id_tranche_effectif = null;
            $contact2->nombre_vehicules_flotte = null;
            $contact2->Mention_legale = 'SUZUKI';

            $vehicule_concurrent = new \stdClass();
            $contacts_entreprise = new \stdClass();

            $contact2->vehicule_concurrent = $vehicule_concurrent;
            $contact2->contacts_entreprise = $contacts_entreprise;

            $vehicule_simple = new \stdClass();
            $result->vehicule_simple = $vehicule_simple;
            $vehicule_simple->code_vin = isset($user[self::KEY_VIN][1]) ? $user[self::KEY_VIN][1] : '19UUB2F73FA0743'.$faker->randomNumber(2); 
            $vehicule_simple->libelle_gamme = 'OLD SWIFT 5PTES ESSENCE BVR';
            $vehicule_simple->libelle_court_gamme = 'ANCIENNE SWIFT 5PTES';
            $vehicule_simple->carroserie = 'CI';
            $vehicule_simple->energie = 'ES';
            $vehicule_simple->libelle_couleur = 'GALACTIC GRAY METAL';
            $vehicule_simple->date_achat_vehicule = $faker->dateTimeThisDecade()->format('Y-m-d\T00:00:00');
            $vehicule_simple->kilometrage = $faker->numberBetween(0, 300000);
            $vehicule_simple->id_conc_orig_vehicule = $this->randomDealership($faker, 75, true);
            $vehicule_simple->date_entretien = $faker->dateTimeBetween($vehicule_simple->date_achat_vehicule)->format('Y-m-d\T00:00:00');
            $vehicule_simple->date_premiere_immat = $faker->dateTimeBetween('-15years', $vehicule_simple->date_achat_vehicule)->format('Y-m-d\T00:00:00');
            $vehicule_simple->immatriculation = strtoupper($faker->bothify('??-###-??'));

            return $response;
        } else if (!preg_match('/[A-HJ-NPR-Z0-9]{17}/i', $vin)){
            throw new \SoapFault('Sender', 'Le VIN doit comporter 17 caractères et être composé uniquement de chiffres et de lettres.');
        } else {
            throw new \SoapFault('Sender', sprintf( 'Erreur recherche du couple client/véhicule. params -> nom : %s, vin : %s Aucun résultat trouvé', $client_id, $vin));
        }
    }

    /**
     * @param $params
     * @return bool
     * @throws \SoapFault
     */
    public function saveVehicule($params)
    {
        $client_id = $params[0]['id_client'];
        $name = $params[0]['nom'];
        $user = self::searchUserById($client_id);
        if (null !== $user && $user[self::KEY_NAME] === $name) {
            return true;
        } else {
            throw new \SoapFault('Sender', 'Un des champs ne respecte pas le bon format.');
        }
    }

    /**
     * @param $params
     * @return bool
     * @throws \SoapFault
     */
    public function saveClient3($params)
    {
        $client_id = $params[0]['client3']['id_client'];

        if (null !== self::searchUserById($client_id)) {
            return true;
        }

        throw new \SoapFault('Sender', 'Un des champs ne respecte pas le bon format');
    }

    /**
     * @param $params
     * @return \stdClass
     * @throws \SoapFault
     */
    public function GetListVehiculeContact($params)
    {
        $clientId = $params[0]['id_contact'];
        $user = self::searchUserById($clientId);
        if (null !== $user) {
            $faker = \Faker\Factory::create('fr_FR');
            $response = new \stdClass();
            $result = new \stdClass();
            $result->id_client = $clientId ;
            $response->GetListVehiculeContactResult = $result;
            $result->listVehiculeSuzuki = new \stdClass();
            $vehicule_simple = new \stdClass();
            $vehicule_simple->code_vin = $user[self::KEY_VIN][0]; 
            $vehicule_simple->libelle_gamme = 'OLD SWIFT 5PTES ESSENCE BVR';
            $vehicule_simple->libelle_court_gamme = 'ANCIENNE SWIFT 5 PTES';
            $vehicule_simple->carroserie = 'CI';
            $vehicule_simple->energie = 'ES';
            $vehicule_simple->type_achat = 'VN';
            $vehicule_simple->libelle_couleur = 'GALACTIC GRAY METAL';
            $vehicule_simple->date_achat_vehicule = $faker->dateTimeThisDecade()->format('Y-m-d\T00:00:00');
            $vehicule_simple->kilometrage = $faker->numberBetween(0, 300000);
            $vehicule_simple->id_conc_orig_vehicule = $this->randomDealership($faker, 75, true);
            $vehicule_simple->date_entretien = $faker->dateTimeBetween($vehicule_simple->date_achat_vehicule)->format('Y-m-d\T00:00:00');
            $vehicule_simple->date_premiere_immat = $faker->dateTimeBetween('-15years', $vehicule_simple->date_achat_vehicule)->format('Y-m-d\T00:00:00');
            $vehicule_simple->immatriculation = strtoupper($faker->bothify('??-###-??'));
            $result->listVehiculeSuzuki->vehicule_Simple[] = $vehicule_simple;

            $vehicule_simple = new \stdClass();
            $vehicule_simple->code_vin = isset($user[self::KEY_VIN][1]) ? $user[self::KEY_VIN][1] : '19UUB2F73FA0743'.$faker->randomNumber(1);
            $vehicule_simple->libelle_gamme = 'NEW SWIFT 5PTES ESSENCE BVR';
            $vehicule_simple->libelle_court_gamme = 'SWIFT 5 PTES';
            $vehicule_simple->carroserie = 'CI';
            $vehicule_simple->energie = 'GO';
            $vehicule_simple->type_achat = 'VO';
            $vehicule_simple->libelle_couleur = 'GALACTIC GRAY METAL';
            $vehicule_simple->date_achat_vehicule = $faker->dateTimeThisDecade()->format('Y-m-d\T00:00:00');
            $vehicule_simple->kilometrage = $faker->numberBetween(0, 300000);
            $vehicule_simple->id_conc_orig_vehicule = $this->randomDealership($faker, 75, true);
            $vehicule_simple->date_entretien = $faker->dateTimeBetween($vehicule_simple->date_achat_vehicule)->format('Y-m-d\T00:00:00');
            $vehicule_simple->date_premiere_immat = $faker->dateTimeBetween('-15years', $vehicule_simple->date_achat_vehicule)->format('Y-m-d\T00:00:00');
            $vehicule_simple->immatriculation = strtoupper($faker->bothify('??-###-??'));
            $result->listVehiculeSuzuki->vehicule_Simple[] = $vehicule_simple;

            return $response;
        } else {
            throw new \SoapFault('Sender', 'Le client n\'existe pas');
        }
    }

    /**
     * @param $arguments
     *
     * @return \stdClass
     */
    public function GetListSiteDeVenteAll2($arguments)
    {
        $faker = \Faker\Factory::create('fr_FR');

        $response = new \stdClass();
        $result = new \stdClass();
        $response->GetListSiteDeVenteAll2Result = $result;
        $ListeSiteDeVente = new \stdClass();
        $result->ListeSiteDeVente = $ListeSiteDeVente;
        $SiteDevente2 = [];

        for($i = 0; $i < 100; $i++){
            $concessionnaire = new \stdClass();

            $SiteDevente2[] = $concessionnaire;

            $concessionnaire->fermer = $faker->boolean(25) ? 1 : null;
            $concessionnaire->code_CE = strtoupper($faker->bothify('####?'));
            $concessionnaire->raison_sociale = $faker->company;
            $concessionnaire->adr3 = $faker->boolean(30) ? 'ZAC DES GRANDS PLANCHANTS' : "";
            $concessionnaire->adr4 = $faker->streetAddress;
            $concessionnaire->adr5 = $faker->boolean(30) ? 'BP ' . $faker->numberBetween(0, 10000) : "";
            $concessionnaire->code_postal = $faker->postcode;
            $concessionnaire->ville = $faker->city;
            $concessionnaire->RCS = $faker->randomElement(['Besancon B 382 583 896', 'Colmar B 424 111 383', 'Caen B 538 798 570']);
            $concessionnaire->telephone = '0357594269';

            if($faker->boolean(40)) {
                $concessionnaire->fax = '0378493145';
            }

            $concessionnaire->email = $faker->companyEmail;
            $concessionnaire->nom_directeur = mb_strtoupper($faker->lastName);
            $concessionnaire->prenom_directeur = mb_strtoupper($faker->firstName);
            $concessionnaire->id_region_vente = $faker->boolean(70) ? $faker->numberBetween(1,20) : null;
            $concessionnaire->id_region_SAV = $faker->boolean(70) ? $faker->numberBetween(1,7) : null;
            if ($concessionnaire->id_region_vente) {
                $concessionnaire->libelle_region_vente = 'EST';
                $concessionnaire->initiale_region_vente = 'E';
            }
            if($concessionnaire->id_region_SAV) {
                $concessionnaire->libelle_region_sav = 'NORD -EST';
                $concessionnaire->initiale_region_sav = 'JSI';
            }
            $concessionnaire->email_chef_region_vente = $faker->companyEmail;
            $concessionnaire->monde = $faker->randomElement([1,2,3]);
            $concessionnaire->GPS_Longitude = $faker->boolean(30) ? $faker->longitude : null;
            $concessionnaire->GPS_Latitude = $concessionnaire->GPS_Longitude ? $faker->latitude : null;
        }

        $ListeSiteDeVente->SiteDevente2 = $SiteDevente2;

        return $response;
    }

    /**
     * @param $arguments
     *
     * @return \stdClass
     * @throws \SoapFault
     */
    public function GetInformationEntretienVehicule($arguments)
    {
        $vin = $arguments[0]['vin'];
        $user = self::searchUserBy(self::KEY_VIN, $vin);
        if (null !== $user) {
            $faker = \Faker\Factory::create('fr_FR');

            $response = new \stdClass();
            $vehicleResult = new \stdClass();
            $maintenancesObject = new \stdClass();
            $maintenances = [];

            $response->GetInformationEntretienVehiculeResult = $vehicleResult;
            $vehicleResult->entretiens = $maintenancesObject;

            for ($i = 0; $i < $faker->numberBetween(1, 5); $i++) {
                $entretien = new \stdClass();

                $entretien->id_entretien = $faker->numberBetween(0, 1000000);
                $entretien->idClient = $user[self::KEY_ID];
                $entretien->nom_client = $user[self::KEY_NAME];
                $entretien->prenom_client = 'John';
                $entretien->date_entretien = $faker
                    ->dateTimeBetween($maintenances[$i-1]->date_entretien ?? '-10 years')
                    ->format('Y-m-d\T00:00:00');
                $entretien->kilometrage = $faker->numberBetween($maintenances[$i-1]->kilometrage ?? 0, 300000);
                $entretien->code_CE = $this->randomDealership($faker, 100);
                $entretien->type_entretien = $faker->randomElement(['Vidange', 'Entretien', 'Garantie']);
                $entretien->detail_entretien = $faker->realText();
                $entretien->ordreReparation = $faker->realText();

                $maintenances[] = $entretien;
            }

            $maintenancesObject->Entretien = $maintenances;

            return $response;
        } else if (!preg_match('/[A-HJ-NPR-Z0-9]{17}/i', $vin)){
            throw new \SoapFault('Sender', 'Le VIN doit comporter 17 caractères et être composé uniquement de chiffres et de lettres.');
        }

        throw new \SoapFault('Sender', 'Aucun véhicule trouvé pour ce VIN.');
    }

    /**
     * @param $arguments
     *
     * @return \stdClass
     */
    public function Preinscription_Mysuzuki($arguments)
    {
        $response = new \stdClass();

        $response->Preinscription_MysuzukiResult = 0;

        return $response;
    }

    /**
     * @param $arguments
     *
     * @return \stdClass
     */
    public function Inscription_Mysuzuki($arguments)
    {
        $response = new \stdClass();

        $response->Inscription_MysuzukiResult = 0;

        return $response;
    }

    /**
     * @param $params
     *
     * @return \stdClass
     */
    public function Get_List_Coupons_Client($params)
    {
        $offers = [];
        $clientId = $params[0]['id_client'];
        $faker = \Faker\Factory::create('fr_FR');
        $response = new \stdClass();
        $response->Get_List_Coupons_ClientResult = new \stdClass();
        $response->Get_List_Coupons_ClientResult->List_coupons = new \stdClass();

        // Prepare data
        $reductionTypes = [ReductionTypeEnum::VALUE, ReductionTypeEnum::PERCENT, ReductionTypeEnum::FREE];
        $reductionTypesCount = count($reductionTypes);
        $labels = ['']; // Used to test non-mapped labels
        foreach (OfferMapping::KEYWORDS as $key => $keywords) {
            $labels[] = $faker->randomElement(OfferMapping::KEYWORDS[$key]);
        }
        $labelsCount = count($labels);
        // Start from now and iterate on it to keep a regular order during front test,
        // as startDate is used for ordering
        $creationDate = (new \DateTime())->setTimestamp(time() - 86400); // today - 1 day
        $specialOfferCount = 0;

        foreach (SpecialOffersEnum::toArray() as $specialOffer) {
            $offer = new \stdClass();
            $offer->id_client = $clientId;
            $offer->id_br = $specialOfferCount + $labelsCount + $clientId * 1000;
            $offer->libelle = $specialOffer['label'];
            $offer->valeur = 20;
            $offer->date_expiration = $faker->dateTimeInInterval('0 years', '+ 4 months')->format('Y-m-d\T00:00:00');
            $offer->date_utilisation = null;
            $offer->type_reduction = ReductionTypeEnum::PERCENT;
            $offer->CAB_BR = $faker->numberBetween(100100000000, 999999999999);
            $offer->date_creation = $creationDate->format('Y-m-d\T00:00:00');
            $offer->code_sitedevente = '0165A';
            $offer->id_utilisateur = 469;
            $offers[] = $offer;
            $specialOfferCount++;
        }

        // Randoms
        for ($i = 0; $i < $labelsCount; $i++) {
            $creationDate->setTimestamp( $creationDate->getTimestamp() - 86400); // -1 day

            $offer = new \stdClass();
            $offer->id_client = $clientId;
            $offer->id_br = $i + $clientId * 1000;
            $offer->libelle = $faker->text().' '.$labels[$i % $labelsCount];
            $offer->valeur = $faker->numberBetween(10, 50);
            $offer->date_expiration = $faker->dateTimeInInterval('0 years', '+ 4 years')->format('Y-m-d\T00:00:00');
            $offer->date_utilisation = $faker->dateTimeInInterval('0 years', '+ 4 years')->format('Y-m-d\T00:00:00');
            $offer->type_reduction = $reductionTypes[$i % $reductionTypesCount];
            $offer->CAB_BR = $faker->numberBetween(100100000000, 999999999999);
            $offer->date_creation = $creationDate->format('Y-m-d\T00:00:00');
            $offer->code_sitedevente = '0165A';
            $offer->id_utilisateur = 469;

            $offers[] = $offer;
        }

        $response->Get_List_Coupons_ClientResult->List_coupons->Coupon = $offers;

        return $response;
    }

    /**
     * @param Generator $faker
     * @param int       $chanceOfGettingTrue
     * @param bool      $partialId
     *
     * @return null|string|string[]
     */
    private function randomDealership($faker, $chanceOfGettingTrue = 75, $partialId = false) {
        if ($faker->boolean($chanceOfGettingTrue)) {
            $dealerships = $this->em->getRepository(Dealership::class)->findAll();
            $dealership = $faker->randomElement($dealerships);
            if (null === $dealership) {
                return null;
            }
            $dealership = $dealership->getExternalId();

            if ($partialId) {
                $dealership = preg_replace('/[A-Z]/', ' ', $dealership);
            }

            return $dealership;
        }

        return null;
    }
}
