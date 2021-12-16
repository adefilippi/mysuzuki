<?php

namespace App\Soap\Manager;

use App\Soap\Client\DPSWebServiceClient;
use App\Soap\Repository\ObjectRepository;
use App\Soap\Repository\RepositoryInterface;
use Doctrine\Common\Annotations\AnnotationReader;
use App\Soap\Annotation as Annotation;
use Doctrine\Common\Util\ClassUtils;
use SoapBundle\Transformer\TransformerManager;

/**
 * @author svianney <vianney@widop.com>
 */
class ObjectManager
{
    /** @var ObjectRepository[] */
    private $repositories;

    /** @var ObjectRepository */
    private $defaultRepository;

    /** @var DPSWebServiceClient */
    private $factory;

    /** @var TransformerManager */
    private $transformer;

    /**
     * @param DPSWebServiceClient $factory
     * @param TransformerManager $transformer
     */
    public function __construct(DPSWebServiceClient $factory, TransformerManager $transformer)
    {
        $this->factory = $factory;
        $this->transformer = $transformer;
    }

    /**
     * @param object $object
     *
     * @return object
     */
    public function pull(object $object)
    {
        return $this->getRepository(get_class($object))->pull($object);
    }

    /**
     * @param object $object
     * @param array $modified
     *
     * @return object
     */
    public function push(object $object, array $modified = [])
    {
        return $this->getRepository(get_class($object))->push($object, $modified);
    }

    /**
     * @param $class
     *
     * @return ObjectRepository|RepositoryInterface
     */
    public function getRepository($class)
    {
        return $this->getCustomRepository($class) ?? $this->getDefaultRepository();
    }

    /**
     * @param $class
     *
     * @return ObjectRepository|null
     */
    private function getCustomRepository($class)
    {
        if (isset($this->repositories[$class])) {
            return $this->repositories[$class];
        }

        $reader = new AnnotationReader();

        $annotation = $reader->getClassAnnotation(new \ReflectionClass(ClassUtils::getRealClass($class)), Annotation\SoapRepository::class);

        if(null === $annotation) {
            return null;
        }

        if(!class_exists($annotation->repositoryClass)) {
            throw new \LogicException("Repository class {$annotation->repositoryClass} in class {$class} does not exist");
        }

        $this->repositories[$class] = new $annotation->repositoryClass($this->factory, $this->transformer);

        return $this->repositories[$class];
    }

    /**
     * @return ObjectRepository
     */
    private function getDefaultRepository()
    {
        if(!isset($this->defaultRepository)) {
            $this->defaultRepository = new ObjectRepository($this->factory, $this->transformer);
        }

        return $this->defaultRepository;
    }
}
