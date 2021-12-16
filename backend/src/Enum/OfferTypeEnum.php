<?php

namespace App\Enum;

final class OfferTypeEnum {
    const GAME = 'game';
    const OFFER = 'offer';
    const INVITATION = 'invitation';
    const ADVANTAGE = 'advantage';
    const TARGETED = 'targeted';
    const WELCOME = 'welcome-offer';
    const AVANTAGE = 'avantage-offer';

    public static function toArray() {
        return [
            self::GAME,
            self::OFFER,
            self::INVITATION,
            self::ADVANTAGE,
            self::TARGETED,
            self::WELCOME,
            self::AVANTAGE,
        ];
    }
}
