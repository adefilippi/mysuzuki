<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Finder\Finder;
use ApplicationSonataMediaBundle\Entity\Media;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200217125001 extends AbstractMigration implements ContainerAwareInterface
{
    /** @var ContainerInterface */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    const SONATA_CONTEXT =  'default';
    const SONATA_PROVIDER =  'sonata.media.provider.image';

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $path = $this->container->getParameter('kernel.project_dir').'/public/upload/offer/picture/';
        $finder = new Finder();
        $em = $this->container->get('doctrine.orm.entity_manager');

        foreach($finder->in($path) AS $file) {
            $filePath = $path.$file->getRelativePathname();
            $media = new Media();
            $media->setBinaryContent($filePath);
            $media->setContext(self::SONATA_CONTEXT);
            $media->setProviderName(self::SONATA_PROVIDER);

            $em->persist($media);
        }

        $em->flush();
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
