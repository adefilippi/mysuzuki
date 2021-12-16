<?php

namespace App\DependencyInjection\Compiler;

use SoapBundle\Transformer\TransformerManager;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

/**
 * @author svianney <vianney@widop.com>
 */
class SoapCompilerPass implements CompilerPassInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->has(TransformerManager::class)) {
            return;
        }

        $definition = $container->findDefinition(TransformerManager::class);
        $taggedServices = $container->findTaggedServiceIds('soap.transformer');

        foreach ($taggedServices as $id => $tags) {
            $definition->addMethodCall('addItem', [new Reference($id)]);
        }
    }
}
