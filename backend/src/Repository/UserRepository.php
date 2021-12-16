<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\ORM\EntityRepository;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class UserRepository extends EntityRepository
{
    /**
     * @param \DateTime $since
     *
     * @return User[]
     */
    public function findIncompleteSignup(\DateTime $since)
    {
        $qb = $this->createQueryBuilder('u');

        return $qb
            ->where($qb->expr()->isNull('u.continueSignupEmail'))
            ->andWhere($qb->expr()->eq('u.enabled',':enabled'))
            ->andWhere($qb->expr()->lte('u.signedUpAt', ':since'))
            ->setParameter('enabled', false)
            ->setParameter('since', $since)
            ->getQuery()
            ->getResult()
        ;
    }

    public function hasUser($lastName, $vin)
    {
        $qb = $this->createQueryBuilder('u');

        $result = $qb
            ->select('count(u)')
            ->where($qb->expr()->eq('u.lastName', ':lastName'))
            ->innerJoin('u.vehicles', 'v')
            ->andWhere($qb->expr()->eq('v.vin',':vin'))
            ->setParameter('vin', $vin)
            ->setParameter('lastName', $lastName)
            ->getQuery()
            ->getSingleScalarResult()
        ;

        return $result > 0;
    }

}
