<?php

namespace App\Enum;

class SpecialOffersEnum
{
    const WELCOME_OFFER = [
        'label' => 'BIENVENUE ACCESSOIRES',
        'file_name' => 'welcome-offer-c1629a2b-b8af-485a-a5f6-5e2b94f041b3.jpg',
    ];

    const AVANTAGE_OFFER = [
        'label' => 'AVANT-AGE',
        'file_name' => 'avantage-offer.jpeg',
    ];

    public static function toArray() {
    return [
        OfferTypeEnum::WELCOME  => self::WELCOME_OFFER,
        OfferTypeEnum::AVANTAGE => self::AVANTAGE_OFFER,
    ];
}
}
