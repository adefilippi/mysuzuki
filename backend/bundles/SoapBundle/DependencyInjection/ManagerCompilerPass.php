<?php

namespace SoapBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Reference;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 */
class ManagerCompilerPass implements CompilerPassInterface
{
    /** @var string */
    private $managerId;

    /** @var string */
    private $tagName;

    /**
     * @param string $managerId
     * @param string $tagName
     */
    public function __construct($managerId, $tagName)
    {
        $this->managerId = $managerId;
        $this->tagName = $tagName;
    }

    /**
     * {@inheritdoc}
     */
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition($this->managerId)) {
            return;
        }

        $manager = $container->getDefinition($this->managerId);
        $taggedServiceIds = $container->findTaggedServiceIds($this->tagName);

        foreach ($taggedServiceIds as $id => $attributes) {
            $manager->addMethodCall('addItem', [new Reference($id)]);
        }
    }
}
