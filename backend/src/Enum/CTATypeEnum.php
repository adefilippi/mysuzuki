<?php

namespace App\Enum;

final class CTATypeEnum {
    const LINK = 'link';
    const FILE = 'file';

    public static function toArray() {
        return [
            self::LINK,
            self::FILE,
        ];
    }
}
