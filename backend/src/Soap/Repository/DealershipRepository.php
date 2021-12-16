<?php

namespace App\Soap\Repository;

use App\Entity\Dealership;
use App\Soap\Transformer\TransformerContext;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class DealershipRepository extends AbstractRepository
{
    /**
     * @return array
     */
    public function pullAll()
    {
        $response = $this->request(RepositoryMethods::DEALERSHIPS_LIST, [[]]);

        $soapDealerships = $response->GetListSiteDeVenteAll2Result->ListeSiteDeVente->SiteDevente2;

        $dealerships = [];

        foreach ($soapDealerships as $soapDealership){
            /** @var Dealership $dealership */
            $dealership = $this
                ->transformer
                ->reverseTransform(
                    TransformerContext::DEALERSHIP,
                    $soapDealership,
                    Dealership::class
                )
            ;

            if (!$dealership->isClosed()) {
                try {
                    $response = $this->request(RepositoryMethods::WEB_DEALERSHIP, [
                        'code_sitedevente' => $dealership->getExternalId(),
                    ]);
                } catch (\Exception $e) {
                    continue;
                }

                if (isset($response->GetInfoWebSiteResult->ListEspace->Espace)) {
                    $soapWebDealership = $response->GetInfoWebSiteResult->ListEspace->Espace;

                    $dealership = $this
                        ->transformer
                        ->reverseTransform(
                            TransformerContext::WEB_DEALERSHIP,
                            $soapWebDealership,
                            Dealership::class,
                            $dealership
                        )
                    ;
                }
            }

            $dealerships[] = $dealership;
        }

        return $dealerships;
    }

    /**
     * @inheritDoc
     */
    public function pull($object)
    {
        throw new \LogicException('Can\'t retrieve a single Dealership. Please use the pullAll() method to retrieve Dealerships.');
    }
}
