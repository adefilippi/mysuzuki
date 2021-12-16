<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use function Sodium\add;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200807152333 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql("
        INSERT INTO vehicle_file (car_label, energy, path, dtype) VALUES
            ('JIMNY',NULL,'/vehicle/accessories/jattelage.png','accessory'),
            ('JIMNY',NULL,'/vehicle/accessories/jbarres.png','accessory'),
            ('JIMNY',NULL,'/vehicle/accessories/jbavettes.png','accessory'),
            ('JIMNY',NULL,'/vehicle/accessories/jtapis.png','accessory'),
            ('VITARA',NULL,'/vehicle/accessories/vattelage.png','accessory'),
            ('VITARA',NULL,'/vehicle/accessories/vbarres.png','accessory'),
            ('VITARA',NULL,'/vehicle/accessories/vaccoudoir.png','accessory'),
            ('VITARA',NULL,'/vehicle/accessories/vecrous.png','accessory'),
            ('VITARA','EH','/vehicle/accessories/vattelage.png','accessory'),
            ('VITARA','EH','/vehicle/accessories/vbarres.png','accessory'),
            ('VITARA','EH','/vehicle/accessories/vaccoudoir.png','accessory'),
            ('VITARA','EH','/vehicle/accessories/vecrous.png','accessory'),
            ('SWIFT',NULL,'/vehicle/accessories/sbarres.png','accessory'),
            ('SWIFT',NULL,'/vehicle/accessories/saccoudoir.png','accessory'),
            ('SWIFT',NULL,'/vehicle/accessories/stapis.png','accessory'),
            ('SWIFT',NULL,'/vehicle/accessories/secrous.png','accessory'),
            ('SWIFT SPORT',NULL,'/vehicle/accessories/sbarres.png','accessory'),
            ('SWIFT SPORT',NULL,'/vehicle/accessories/ssaccoudoir.png','accessory'),
            ('SWIFT SPORT',NULL,'/vehicle/accessories/sstapis.png','accessory'),
            ('SWIFT SPORT',NULL,'/vehicle/accessories/secrous.png','accessory'),
            ('SWIFT SPORT','EH','/vehicle/accessories/sbarres.png','accessory'),
            ('SWIFT SPORT','EH','/vehicle/accessories/ssaccoudoir.png','accessory'),
            ('SWIFT SPORT','EH','/vehicle/accessories/sstapis.png','accessory'),
            ('SWIFT SPORT','EH','/vehicle/accessories/secrous.png','accessory'),
            ('IGNIS',NULL,'/vehicle/accessories/iattelage.png','accessory'),
            ('IGNIS',NULL,'/vehicle/accessories/ibarres.png','accessory'),
            ('IGNIS',NULL,'/vehicle/accessories/itapis.png','accessory'),
            ('IGNIS',NULL,'/vehicle/accessories/iecrous.png','accessory'),
            ('IGNIS','EH','/vehicle/accessories/iattelage.png','accessory'),
            ('IGNIS','EH','/vehicle/accessories/ibarres.png','accessory'),
            ('IGNIS','EH','/vehicle/accessories/ihcalandre.png','accessory'),
            ('IGNIS','EH','/vehicle/accessories/ihaccoudoir.png','accessory'),
            ('S-CROSS',NULL,'/vehicle/accessories/scbarres.png','accessory'),
            ('S-CROSS',NULL,'/vehicle/accessories/sctapis.png','accessory'),
            ('S-CROSS',NULL,'/vehicle/accessories/scattelage.png','accessory'),
            ('S-CROSS',NULL,'/vehicle/accessories/scpedales.png','accessory'),
            ('S-CROSS','EH','/vehicle/accessories/scbarres.png','accessory'),
            ('S-CROSS','EH','/vehicle/accessories/sctapis.png','accessory'),
            ('S-CROSS','EH','/vehicle/accessories/scattelage.png','accessory'),
            ('S-CROSS','EH','/vehicle/accessories/schecrous.png','accessory'),
            ('BALENO',NULL,'/vehicle/accessories/bbarres.png','accessory'),
            ('BALENO',NULL,'/vehicle/accessories/battelage.png','accessory'),
            ('BALENO',NULL,'/vehicle/accessories/becrous.png','accessory'),
            ('BALENO',NULL,'/vehicle/accessories/btapis.png','accessory'),
            ('CELERIO',NULL,'/vehicle/accessories/ctapis.png','accessory'),
            ('CELERIO',NULL,'/vehicle/accessories/cbaguettes.png','accessory'),
            ('CELERIO',NULL,'/vehicle/accessories/cbecquet.png','accessory'),
            ('CELERIO',NULL,'/vehicle/accessories/cmoulure.png','accessory')
        ");

        $this->addSql("
        INSERT INTO vehicle_file (car_label, energy, path, dtype) VALUES
            ('JIMNY',NULL,'https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2193','accessorieslink'),
            ('VITARA',NULL,'https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2191','accessorieslink'),
            ('VITARA','EH','https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2192','accessorieslink'),
            ('SWIFT',NULL,'https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2194','accessorieslink'),
            ('SWIFT SPORT',NULL,'https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2195','accessorieslink'),
            ('SWIFT SPORT','EH','https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2196','accessorieslink'),
            ('IGNIS',NULL,'https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2197','accessorieslink'),
            ('IGNIS','EH','https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2185','accessorieslink'),
            ('S-CROSS',NULL,'https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2198','accessorieslink'),
            ('S-CROSS','EH','https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2199','accessorieslink'),
            ('BALENO',NULL,'https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2200','accessorieslink'),
            ('CELERIO',NULL,'https://accessoires.suzuki.fr/Auto/?sh=catalog&mode=0&tpid=2201','accessorieslink')
        ");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql("DELETE FROM vehicle_file WHERE dtype='accessory' OR dtype='accessorieslink'");
    }
}
