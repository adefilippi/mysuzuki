<?php

namespace App\Soap\Repository;

use App\Entity\Offer;
use App\Soap\Transformer\TransformerContext;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * @author Charlie <charlie@widop.com>
 */
class OfferRepository extends AbstractRepository
{
    /**
     * {@inheritdoc}
     */
    public function pull($object)
    {
        $response = $this->request(RepositoryMethods::OFFERS_LIST, [
            'id_client' => $object->getExternalId()
        ]);

        if(false === $response) {
            throw new NotFoundHttpException();
        }

        if (isset($response->Get_List_Coupons_ClientResult->List_coupons->Coupon)) {
            $soapOffers = $response->Get_List_Coupons_ClientResult->List_coupons->Coupon;

            return $this
                ->transformer
                ->reverseTransform(
                    TransformerContext::OFFER,
                    $soapOffers,
                    Offer::class,
                    $object
                );
        }

        return [];
    }
}
