<?php

namespace App\Soap\Transformer;

use App\Entity\Vin;

/**
 * @author svianney <vianney@widop.com>
 */
class VinTransformer extends AbstractTransformer
{
    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return Vin::class === $class && TransformerContext::VIN === $context;
    }

    /**
     * {@inheritdoc}
     */
    public function transform($model, $extra = null)
    {
        return $model;
    }

    /**
     * {@inheritdoc}
     */
    public function reverseTransform($data, $object = null)
    {
        $client = $data->client;

        if (null === $object) {
            $object = new Vin($data->voiture->code_vin, $client->nom, $client->id_client);
        } else {
            $object->setClientId($client->id_client);
        }

        return $object;
    }
}
