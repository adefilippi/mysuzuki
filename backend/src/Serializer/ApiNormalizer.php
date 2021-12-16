<?php

namespace App\Serializer;

use App\Entity\AbstractToken;
use App\Entity\Game;
use App\Serializer\Annotation\Files;
use Doctrine\Common\Annotations\CachedReader;
use Liip\ImagineBundle\Service\FilterService;
use Sentry\SentryBundle\SentrySymfonyClient;
use Symfony\Component\HttpFoundation\RequestStack;
use Liip\ImagineBundle\Controller\ImagineController;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerAwareInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;

/**
 * @author Thibault Richard <thibault@widop.com>
 */
final class ApiNormalizer implements NormalizerInterface, DenormalizerInterface, SerializerAwareInterface
{
    const SMALL_IMAGE = 'small';
    const LARGE_IMAGE = 'large';

    /** @var DenormalizerInterface|NormalizerInterface */
    private $decorated;

    /** @var ImagineController */
    private $filterService;

    /** @var CachedReader */
    private $reader;

    /** @var RequestStack */
    private $requestStack;

    /** @var SentrySymfonyClient */
    private $sentry;
    /**
     * @var UploaderHelper
     */
    private $helper;

    /**
     * @param NormalizerInterface      $decorated
     * @param CachedReader             $reader
     * @param RequestStack             $requestStack
     * @param FilterService            $filterService
     * @param UploaderHelper           $helper
     * @param SentrySymfonyClient|null $sentry
     */
    public function __construct(
        NormalizerInterface $decorated,
        CachedReader $reader,
        RequestStack $requestStack,
        FilterService $filterService,
        UploaderHelper $helper,
        SentrySymfonyClient $sentry = null
    ) {
        if (!$decorated instanceof DenormalizerInterface) {
            throw new \InvalidArgumentException(
                sprintf(
                    'The decorated normalizer must implement the %s.',
                    DenormalizerInterface::class
                )
            );
        }

        $this->decorated = $decorated;
        $this->filterService = $filterService;
        $this->reader = $reader;
        $this->requestStack = $requestStack;
        $this->sentry = $sentry;
        $this->helper = $helper;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsNormalization($data, $format = null)
    {
        return $this->decorated->supportsNormalization($data, $format);
    }

    /**
     * {@inheritdoc}
     */
    public function normalize($object, $format = null, array $context = [])
    {
        $data = $this->decorated->normalize($object, $format, $context);

        if (is_array($data) && $object instanceof AbstractToken) {
            unset($data['@id']); # we don't want to return the token in the JSON body for security purposes
        }

        if ($object instanceof Game) {
            $data['rulesUrl'] = $this->helper->asset($object, 'file');
        }

        $reflectionClass = new \ReflectionClass($object);
        while ($reflectionClass) {
            /** @var Files $annotation */
            $annotation = $this->reader->getClassAnnotation($reflectionClass, Files::class);

            if (!empty($annotation->imageFields)) {
                foreach ($annotation->imageFields as $field) {
                    if (is_string($data[$field])) {
                        $data[$field] = $this->getRetinaPaths($data[$field], $field);
                    } elseif (is_array($data[$field])) {
                        $data[$field] = array_map(function ($item) use ($field) {
                            $item['path'] = $this->getRetinaPaths($item['path'], $field);
                            return $item;
                        }, $data[$field]);
                    }
                }
            }

            if (!empty($annotation->fileFields)) {
                foreach ($annotation->fileFields as $field) {
                    $data[$field] = $this->getAbsoluteUrl($data[$field]);
                }
            }

            $reflectionClass = $reflectionClass->getParentClass();
        }

        return $data;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDenormalization($data, $type, $format = null)
    {
        return $this->decorated->supportsDenormalization($data, $type, $format);
    }

    /**
     * {@inheritdoc}
     */
    public function denormalize($data, $class, $format = null, array $context = [])
    {
        return $this->decorated->denormalize($data, $class, $format, $context);
    }

    /**
     * {@inheritdoc}
     */
    public function setSerializer(SerializerInterface $serializer)
    {
        if ($this->decorated instanceof SerializerAwareInterface) {
            $this->decorated->setSerializer($serializer);
        }
    }

    /**
     * @param string $path
     * @param string $field
     *
     * @return array
     */
    public function getRetinaPaths($path, $field)
    {
        $path = ltrim($path, '/');

        if (empty($path)) {
            return null;
        }

        try {
            return [
                self::SMALL_IMAGE => $this->filterService->getUrlOfFilteredImage($path, "small_{$field}"),
                self::LARGE_IMAGE => $this->filterService->getUrlOfFilteredImage($path, "large_{$field}"),
            ];
        } catch (\Exception $e) {
            if ($this->sentry) {
                $this->sentry->captureException($e);
            }

            return null;
        }
    }

    /**
     * @param string|null $path
     *
     * @return null|string
     */
    private function getAbsoluteUrl($path)
    {
        if (!empty($path)) {
            return $this->requestStack->getCurrentRequest()->getUriForPath($path);
        }

        return null;
    }
}
