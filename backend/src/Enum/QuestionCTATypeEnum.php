<?php

namespace App\Enum;

final class QuestionCTATypeEnum {
    const LINK = 'link';
    const FORM = 'form';

    public static function toArray() {
        return [
            self::LINK,
            self::FORM,
        ];
    }
}
