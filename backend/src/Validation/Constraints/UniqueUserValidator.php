<?php

namespace App\Validation\Constraints;

use App\Entity\User as UserEntity;
use App\Entity\Vehicle;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * @author svianney <vianney@widop.com>
 */
class UniqueUserValidator extends ConstraintValidator
{
    /** @var EntityManagerInterface */
    protected $em;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * {@inheritdoc}
     */
    public function validate($value, Constraint $constraint)
    {
        /** @var UserEntity $value */
        if (empty($value->getLastName()) || $value->getVehicles()->count() < 1) {
            return;
        }

        /** @var Vehicle $vehicle */
        $vehicle = $value->getVehicles()->first();

        if (empty($vehicle->getVin())) {
            return;
        }

        $repo = $this->em->getRepository(UserEntity::class);

        if ($repo->hasUser($value->getLastName(), $vehicle->getVin())) {
            $this->context->buildViolation($constraint->message)->atPath('lastName')->addViolation();
        }
    }
}
