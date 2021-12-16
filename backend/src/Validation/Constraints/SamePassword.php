<?php

namespace App\Validation\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 *
 * @author svianney <vianney@widop.com>
 */
class SamePassword extends Constraint
{
    public $message = 'password_change.new_password.same';
}
