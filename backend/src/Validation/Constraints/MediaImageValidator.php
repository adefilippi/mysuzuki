<?php

namespace App\Validation\Constraints;

use App\Entity\User as UserEntity;
use App\Entity\Vehicle;
use ApplicationSonataMediaBundle\Entity\Media;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\ImageValidator;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class MediaImageValidator extends ImageValidator
{
    /**
     * {@inheritdoc}
     */
    public function validate($value, Constraint $constraint)
    {
        if (!$value instanceof Media) {
            return;
        }

        $file = $value->getBinaryContent();

        parent::validate($file, $constraint);
    }
}
