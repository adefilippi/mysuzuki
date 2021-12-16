<?php

namespace App\Soap\Transformer;

use App\Entity\Dealership;
use App\Entity\User;

/**
 * @author svianney <vianney@widop.com>
 */
class UserAltTransformer extends AbstractTransformer
{
    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return User::class === $class && TransformerContext::USER_CREATE_ALT === $context;
    }

    /**
     * {@inheritdoc}
     */
    public function transform($model, $extra = null)
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($data, $user = null)
    {
        if (!$user instanceof User) {
            $user = new User();
        }

        $client = $data->client;
        $user->setExternalId($client->id_client);
        $user->setFirstName($client->prenom1);

        $dealership = $this->registry->getManager()->getRepository(Dealership::class)->findOneByExternalId($client->code_ce);

        $user->setDealership($dealership);

        return $user;
    }
}
