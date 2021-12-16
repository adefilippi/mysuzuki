<?php

namespace App\Validation\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 *
 * @author svianney <vianney@widop.com>
 */
class UserExists extends Constraint
{
    public $message = 'user.exists';
}
