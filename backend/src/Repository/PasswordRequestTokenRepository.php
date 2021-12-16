<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\EntityRepository;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class PasswordRequestTokenRepository extends EntityRepository
{
    /**
     * @param User $user
     * @return mixed
     */
    public function findToExpire(User $user)
    {
        $qb = $this->createQueryBuilder('prt');

        return $qb
            ->andWhere('prt.user = :current_user')
            ->andWhere($qb->expr()->gte('prt.expiresAt', ':now'))
            ->setParameters([
                'now'          => time(),
                'current_user' => $user,
            ])
            ->getQuery()
            ->getResult()
        ;
    }
}
