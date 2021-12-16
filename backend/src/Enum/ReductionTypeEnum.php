<?php

namespace App\Enum;

final class ReductionTypeEnum {
    const FREE = 'gratuité';
    const PERCENT = 'pourcent';
    const VALUE = 'montant';

    public static function toArray() {
        return [
            self::FREE,
            self::PERCENT,
            self::VALUE,
        ];
    }
}
