<?php

namespace App\Validation\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 *
 * @author svianney <vianney@widop.com>
 */
class OldPassword extends Constraint
{
    public $message = 'password_change.old_password.match';
}
