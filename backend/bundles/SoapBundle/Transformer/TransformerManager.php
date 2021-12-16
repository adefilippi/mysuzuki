<?php

namespace SoapBundle\Transformer;

use Doctrine\Common\Persistence\Proxy;
use Doctrine\Common\Util\ClassUtils;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 * @author Benjamin Lazarecki <benjamin.lazarecki@gmail.com>
 */
class TransformerManager
{
    /** @var array */
    private $transformers = [];

    /**
     * @param string $context The context
     * @param object $model   The model
     * @param mixed  $extra   Extra data
     *
     * @return mixed
     */
    public function transform($context, $model, $extra = null)
    {
        $class = get_class($model);

        if ($model instanceof Proxy) {
            $class = ClassUtils::getRealClass($class);
        }

        return $this->determineTransformer($context, $class)->transform($model, $extra);
    }

    /**
     * @param string $context The context
     * @param mixed  $data
     * @param string $class   The FQCN class name
     * @param mixed  $extra   Extra data
     *
     * @return mixed
     */
    public function reverseTransform($context, $data, $class, $extra = null)
    {
        return $this->determineTransformer($context, $class)->reverseTransform($data, $extra);
    }

    /**
     * @param string $context The context
     * @param string $class   The FQCN class name
     *
     * @throws \InvalidArgumentException If there is no supported transformer
     *
     * @return TransformerInterface
     */
    protected function determineTransformer($context, $class)
    {
        foreach ($this->getTransformers() as $dataTransformer) {
            if ($dataTransformer->support($context, $class)) {
                return $dataTransformer;
            }
        }

        throw new \InvalidArgumentException();
    }

    /**
     * @return array
     */
    protected function getTransformers()
    {
        return $this->transformers;
    }

    /**
     * @param TransformerInterface $dataTransformer
     */
    public function addItem(TransformerInterface $dataTransformer)
    {
        $this->transformers[] = $dataTransformer;
    }
}
