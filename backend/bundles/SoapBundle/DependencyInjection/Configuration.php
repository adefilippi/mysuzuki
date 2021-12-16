<?php

namespace SoapBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 * @author Geoffrey Brier <geoffrey@widop.com>
 * @author Benjamin Lazarecki <benjamin.lazarecki@gmail.com>
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();

        $treeBuilder
            ->root('widop_soap')
            ->children()
                ->arrayNode('transformer_manager')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('enable')
                            ->defaultValue(false)
                        ->end()
                    ->end()
                ->end() // transformer_manager
                ->arrayNode('mocking')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('enable')
                            ->defaultValue(false)
                        ->end()
                        ->scalarNode('wsdl_cacher')
                            ->defaultValue(null)
                        ->end()
                    ->end()
                ->end() // mocker
            ->end();

        return $treeBuilder;
    }
}
