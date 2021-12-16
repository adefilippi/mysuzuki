<?php

namespace SoapBundle;

use SoapBundle\DependencyInjection\ManagerCompilerPass;
use SoapBundle\DependencyInjection\WsdlCacherCompilerPass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * @author Matthieu Sansen <matthieu.sansen@outlook.com>
 * @author Geoffrey Brier <geoffrey@widop.com>
 * @author Benjamin Lazarecki <benjamin.lazarecki@gmail.com>
 */
class SoapBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function build(ContainerBuilder $container)
    {
        $container->addCompilerPass(new ManagerCompilerPass('soap.transformer_manager', 'soap.transformer'));
        $container->addCompilerPass(new ManagerCompilerPass('soap.mocker_manager', 'soap.mocker'));
        $container->addCompilerPass(new WsdlCacherCompilerPass());

        parent::build($container);
    }
}
