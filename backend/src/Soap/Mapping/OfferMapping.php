<?php


namespace App\Soap\Mapping;


use App\Entity\Offer;
use ApplicationSonataMediaBundle\Entity\Media;
use Doctrine\ORM\EntityManager;
use Symfony\Bridge\Doctrine\ManagerRegistry;

final class OfferMapping
{
    const DEFAULT_MEDIA_KEY = 'other';

    const KEYWORDS = [
        'accessory' => [
            'ACCESSOIRES',
            'ACCESSOIRE',
            'ACCESS',
            'ACCESOIRES',
            'ACCSSOIRES',
            'ACESSOIRES',
            'ACESSOIRE',
            'ACCESOIRE',
            'ACCESOIRE(S)'
        ],
        'beg' => [
            'ESSUIE-GLACE',
            'ESSUIE-GLACE',
            'ESSUIES-GLACE',
            'ESSUIE-GLACES',
            'ESSUIES-GLACE',
            'ESSUIE GLACE',
            'ESSUIES GLACE',
            'ESSUIE GLACES',
            'ESSUIES GLACES',
            'ESSUI GLACE',
            'ESSUI GLACES',
            'ESSUIS GLACE',
            'ESSUIS GLACES',
            'BEG'
        ],
        'maintenance' => [
            'ENTRETIEN',
            'ENTERTIEN',
            'ENTRTIEN',
            'ENTIEN',
            'ENTRETINE',
            'ENTRETIENT',
            'ENTRETEN',
            'ENTRERTIEN'
        ],
        'revision' => [
            'REVISION',
            'RÉVISION'
        ],
        'battery' => [
            'BATTERIE',
            'BATTERIES',
            'BATERIE'
        ],
        'voucher' => [
            'BON D\'ACHAT',
            'BON D ACHAT',
            'BA'
        ],
        'damper' => [
            'AMORTISSEURS'
        ],
        'brake' => [
            'FREIN',
            'FREINS',
            'FREINAGE',
            'DISQUE',
            'DISQUES',
            'PLAQUETTE',
            'PLAQUETTES'
        ],
        'tyre' => [
            'PNEU',
            'PNEUS',
            'PNEUMATIQUES',
            'PNEUMATIQUE'
        ],
        'key' => [
            'CLES',
            'CLE',
            'CLEF',
            'CLEFS',
            'CLÉ',
            'CLÉS'
        ],
        'vat' => [
            'TVA'
        ],
        'filter' => [
            'FILTRE',
            'FILTRES'
        ],
        'exhaust' => [
            'ECHAPPEMENT',
            'ÉCHAPPEMENT',
            'ECHAPEMENT',
            'ÉCHAPEMENT'
        ],
        'cooling' => [
            'CLIMATISATION',
            'CLIM'
        ],
        'belt' => [
            'COURROIE',
            'COURROI',
            'COUROIE',
            'COUROI'
        ],
        'balancing' => [
            'EQUILIBRAGE'
        ]
    ];

    const MEDIA = [
        'accessory' => [
            'label'   => 'sur l\'achat de votre prochain accessoire*',
            'picture' => 'accessoire.jpg'
        ],
        'beg' => [
            'label'   => 'sur les balais d\'essuie-glace*',
            'picture' => 'beg.jpg'
        ],
        'maintenance' => [
            'label'   => 'sur votre prochain entretien*',
            'picture' => 'entretien.jpg'
        ],
        'revision' => [
            'label'   => 'sur votre prochaine révision*',
            'picture' => 'revision.jpg'
        ],
        'voucher' => [
            'label'   => 'en bon d\'achat*',
            'picture' => 'bonachat.jpg'
        ],
        'damper' => [
            'label'   => 'sur les amortisseurs*',
            'picture' => 'amortisseurs.jpg'
        ],
        'brake' => [
            'label'   => 'sur les plaquettes et/ou disques de frein*',
            'picture' => 'freins.jpg'
        ],
        'tyre' => [
            'label'   => 'sur les pneumatiques*',
            'picture' => 'pneus.jpg'
        ],
        'key' => [
            'label'   => 'sur les clés*',
            'picture' => 'cle.jpg'
        ],
        'vat' => [
            'label'   => 'TVA offerte',
            'picture' => 'tva.jpg'
        ],
        'filter' => [
            'label'   => 'sur les filtres à air et/ou à huile*',
            'picture' => 'filtre.jpg'
        ],
        'exhaust' => [
            'label'   => 'sur l\'échappement*',
            'picture' => 'echappement.jpg',
        ],
        'cooling' => [
            'label'   => 'sur la climatisation*',
            'picture' => 'clim.jpg'
        ],
        'belt' => [
            'label'   => 'sur la courroie de distribution*',
            'picture' => 'courroie.jpg'
        ],
        'battery' => [
            'label'   => 'sur les batteries*',
            'picture' => 'batterie.jpg'
        ],
        'balancing' => [
            'label'   => 'sur le montage/équilibrage*',
            'picture' => 'equilibrage.jpg'
        ],
        self::DEFAULT_MEDIA_KEY => [
            'label'   => 'other',
            'picture' => 'generique.jpg'
        ]
    ];
}
