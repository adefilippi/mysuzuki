<?php

namespace SoapBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class WsdlCacherCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasParameter('soap.wsdl_cacher')) {
            return;
        }

        $wsdlCacherServiceId = $container->getParameter('soap.wsdl_cacher');

        if (!$container->hasDefinition($wsdlCacherServiceId)) {
            throw new \RuntimeException(sprintf('Container has not definition for service %s', $wsdlCacherServiceId));
        }

        $container
            ->getDefinition('soap.mocker_subscriber')
            ->addArgument(new Reference($wsdlCacherServiceId));
    }
}
