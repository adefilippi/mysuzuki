<?php

namespace SoapBundle\Transformer;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 * @author Benjamin Lazarecki <benjamin.lazarecki@gmail.com>
 */
interface TransformerInterface
{
    /**
     * Checks if the given class is supported.
     *
     * @param string $context The context
     * @param string $class   The FQCN class name
     *
     * @return bool TRUE if it's supported, else FALSE
     */
    public function support($context, $class);

    /**
     * Transforms an application model to a SOAP model.
     *
     * @param mixed $model The application model
     * @param mixed $extra Extra data
     *
     * @return mixed The soap model
     */
    public function transform($model, $extra = null);

    /**
     * Reverse transforms a SOAP model to application model.
     *
     * @param mixed $data  The SOAP model
     * @param mixed $extra Extra data
     *
     * @return mixed The reverse transformed data
     */
    public function reverseTransform($data, $extra = null);
}
