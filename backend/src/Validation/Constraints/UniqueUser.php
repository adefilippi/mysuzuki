<?php

namespace App\Validation\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 *
 * @author svianney <vianney@widop.com>
 */
class UniqueUser extends Constraint
{
    public $message = 'user.unique';

    /**
     * {@inheritdoc}
     */
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
