<?php

namespace App\Validation\Constraints;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * @author svianney <vianney@widop.com>
 */
class UserExistsValidator extends ConstraintValidator
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
        if (!is_string($value)) {
            return;
        }

        $repo = $this->em->getRepository(User::class);

        if (null === $repo->findOneBy(['email' => $value])) {
            $this->context->buildViolation($constraint->message)->setParameter('{email}', $value)->addViolation();
        }
    }
}
