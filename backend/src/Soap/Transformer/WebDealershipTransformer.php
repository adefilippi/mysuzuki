<?php

namespace App\Soap\Transformer;
use App\Entity\Dealership;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
class WebDealershipTransformer extends AbstractTransformer
{
    const AFTER_SALES = 'Espace SAV';

    /**
     * {@inheritdoc}
     */
    public function support($context, $class)
    {
        return $class === Dealership::class && $context === TransformerContext::WEB_DEALERSHIP;
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
    public function reverseTransform($data, $extra = null)
    {
        if (!$extra instanceof Dealership) {
            throw new \LogicException('This method only updates existing dealerships');
        }

        $afterSalesSpace = current(array_filter($data,
            function ($space) {
                return $space->type_espace === self::AFTER_SALES;
            }
        ));

        if (empty($afterSalesSpace)) {
            return $extra;
        }

        $extra->setWorkshopEmail($afterSalesSpace->email ?? null);

        return $extra;
    }
}
