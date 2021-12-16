<?php

namespace App\Validation\Constraints;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Encoder\EncoderInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

/**
 * @author svianney <vianney@widop.com>
 */
class OldPasswordValidator extends ConstraintValidator
{
    /** @var EncoderInterface */
    protected $encoder;

    /** @var TokenStorageInterface */
    protected $storage;

    public function __construct(UserPasswordEncoderInterface $encoder, TokenStorageInterface $storage)
    {
        $this->encoder = $encoder;
        $this->storage = $storage;
    }

    /**
     * {@inheritdoc}
     */
    public function validate($value, Constraint $constraint)
    {
        /** @var User $user */
        $user = $this->storage->getToken()->getUser();

        if (!$this->encoder->isPasswordValid($user, $value)) {
            $this->context->buildViolation($constraint->message)->addViolation();
        }
    }
}
