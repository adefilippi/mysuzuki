<?php

namespace App\Soap\Repository;

use App\Soap\Transformer\TransformerContext;

/**
 * @author svianney <vianney@widop.com>
 */
class JobRepository extends AbstractRepository
{
    /**
     * {@inheritdoc}
     */
    public function push($object, $modified = [])
    {
        if (!isset($modified['job.name']) && !isset($modified['job.department'])) {
            return;
        }

        $requestParams = $this
            ->transformer
            ->transform(
                TransformerContext::JOB_UPDATE,
                $object,
                $modified
            )
        ;

        $this->request(RepositoryMethods::UPDATE_CONTACT_ENTREPRISE, $requestParams);
    }
}
