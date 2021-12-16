<?php declare(strict_types=1);

namespace App\Migrations;

use App\Enum\SpecialOffersEnum;
use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use ApplicationSonataMediaBundle\Entity\Media;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200309101414 extends AbstractMigration implements ContainerAwareInterface
{
    /** @var ContainerInterface */
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }


    const SONATA_CONTEXT = 'default';
    const SONATA_PROVIDER = 'sonata.media.provider.image';

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $path = $this->container->getParameter('kernel.project_dir').'/public/upload/'.SpecialOffersEnum::WELCOME_OFFER['file_name'];
        $em = $this->container->get('doctrine.orm.entity_manager');

        $media = new Media();
        $media->setBinaryContent($path);
        $media->setContext(self::SONATA_CONTEXT);
        $media->setProviderName(self::SONATA_PROVIDER);
        $em->persist($media);

        $em->flush();

        $mediaId = $media->getId();
        $this->addSql("UPDATE offer SET type = 'welcome-offer', media_id = $mediaId WHERE label = 'BIENVENUE ACCESSOIRES'");
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}

