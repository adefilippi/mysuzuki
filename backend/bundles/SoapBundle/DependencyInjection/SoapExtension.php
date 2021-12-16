<?php

namespace SoapBundle\DependencyInjection;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;
use Symfony\Component\HttpKernel\DependencyInjection\ConfigurableExtension;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 * @author Geoffrey Brier <geoffrey@widop.com>
 * @author Benjamin Lazarecki <benjamin.lazarecki@gmail.com>
 */
class SoapExtension extends ConfigurableExtension
{
    /**
     * {@inheritdoc}
     */
    protected function loadInternal(array $mergedConfig, ContainerBuilder $container)
    {
        $loader = new XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));

        $resources = ['factory', 'transformer', 'mocker'];

        if ($container->getParameter('kernel.environment') === 'dev') {
            $resources[] = 'profiler';
        }

        foreach ($resources as $resource) {
            $loader->load($resource.'.xml');
        }

        $this->configureServices($mergedConfig, $container);
    }

    /**
     * @param array                                                   $config
     * @param \Symfony\Component\DependencyInjection\ContainerBuilder $container
     */
    private function configureServices(array $config, ContainerBuilder $container)
    {
        $this->configureTransformer($config, $container);
        $this->configureMocking($config, $container);
    }

    /**
     * @param array                                                   $config
     * @param \Symfony\Component\DependencyInjection\ContainerBuilder $container
     */
    private function configureTransformer(array $config, ContainerBuilder $container)
    {
        if (!$config['transformer_manager']['enable']) {
            $container->removeDefinition('soap.transformer_manager');
        }
    }

    /**
     * @param array                                                   $config
     * @param \Symfony\Component\DependencyInjection\ContainerBuilder $container
     */
    private function configureMocking(array $config, ContainerBuilder $container)
    {
        if (!$config['mocking']['enable']) {
            $container->removeDefinition('soap.mocker_subscriber');

            return;
        }

        if (!$config['mocking']['wsdl_cacher']) {
            return;
        }

        $container->setParameter('soap.wsdl_cacher', $config['mocking']['wsdl_cacher']);
    }
}
