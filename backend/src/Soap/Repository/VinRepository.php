<?php

namespace App\Soap\Repository;

use App\Entity\Vin;
use App\Soap\Transformer\TransformerContext;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author svianney <vianney@widop.com>
 */
class VinRepository extends AbstractRepository
{
    /**
     * {@inheritdoc}
     * @param Vin $object
     */
    public function pull($object)
    {
        $clientId = $object->getClientId();

        $result = $this->request(RepositoryMethods::CLIENT_VEHICLE, [
            'vin' => $object->getId(),
            'nom' => $object->getLastName(),
            'id_client' => $clientId,
        ]);

        if(false === $result) {
            throw new NotFoundHttpException();
        }
        if(!$this->clientIdMatch($result, $clientId)) {
            throw new NotFoundHttpException('Erreur recherche du couple client/code personnel');
        }

        return $this
            ->transformer
            ->reverseTransform(
                TransformerContext::VIN,
                $result->getInformationsClientVehiculeResult,
                Vin::class,
                $object
            )
        ;
    }

    /**
     * @param \stdClass $result
     * @param string|int|null $clientId
     * @return bool
     */
    private function clientIdMatch($result, $clientId)
    {
        try {
            return $result->getInformationsClientVehiculeResult->client->id_client == $clientId;
        } catch (\Exception $e) {
            return false;
        }
    }
}
