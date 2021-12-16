<?php

namespace App\Enum;

final class TargetTypeEnum {
    const EVERYONE = 'everyone';
    const FILTERED = 'filtered';
    const NONE = 'none';

    public static function toArray() {
        return [
            self::EVERYONE,
            self::FILTERED,
            self::NONE,
        ];
    }
}
