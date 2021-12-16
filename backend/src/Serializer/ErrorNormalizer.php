<?php

namespace App\Serializer;

use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Translation\TranslatorInterface;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
final class ErrorNormalizer implements NormalizerInterface
{
    /** @var NormalizerInterface */
    private $decorated;

    /** @var TranslatorInterface */
    private $translator;

    /**
     * @param NormalizerInterface $decorated
     * @param TranslatorInterface $translator
     */
    public function __construct(NormalizerInterface $decorated, TranslatorInterface $translator)
    {
        $this->decorated = $decorated;
        $this->translator = $translator;
    }

    /**
     * @param mixed $data
     * @param null  $format
     *
     * @return bool
     */
    public function supportsNormalization($data, $format = null)
    {
        return $this->decorated->supportsNormalization($data, $format);
    }

    /**
     * @param object $object
     * @param null   $format
     * @param array  $context
     *
     * @return array|bool|float|int|string
     */
    public function normalize($object, $format = null, array $context = [])
    {
        $data = $this->decorated->normalize($object, $format, $context);

        $statusCode = $context['statusCode'] ?? $object->getStatusCode();
        if ($statusCode >= 500 && $statusCode < 600) {
            $data['hydra:description'] = $this->translator->trans('exception.500');
        }

        return $data;
    }
}
