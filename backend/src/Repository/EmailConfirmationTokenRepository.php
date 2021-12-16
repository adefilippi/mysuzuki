<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\EntityRepository;

/**
 * @author svianney <vianney@widop.com>
 */
class EmailConfirmationTokenRepository extends EntityRepository
{
    /**
     * @param User $user
     * @return mixed
     */
    public function findUnexpiredByUser(User $user)
    {
        $qb = $this->createQueryBuilder('ect');

        return $qb
            ->andWhere('ect.user = :current_user')
            ->andWhere($qb->expr()->gte('ect.expiresAt', ':now'))
            ->setParameters([
                'now'          => time(),
                'current_user' => $user,
            ])
            ->getQuery()
            ->getResult()
        ;
    }
}
