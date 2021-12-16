<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201124090938 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE vehicle_file ADD label VARCHAR(255) DEFAULT NULL');
        $this->addSql('DELETE FROM vehicle_file WHERE dtype = "accessory"');
        $this->addSql("
        INSERT INTO vehicle_file (car_label, energy, path, label, dtype) VALUES
            ('JIMNY',NULL,'/vehicle/accessories/jattelage.png','Attelage','accessory'),
            ('JIMNY',NULL,'/vehicle/accessories/jbarres.png','Barres de toit','accessory'),
            ('JIMNY',NULL,'/vehicle/accessories/jbavettes.png','Bavettes arrière','accessory'),
            ('JIMNY',NULL,'/vehicle/accessories/jtapis.png','Tapis de sol caoutchouc','accessory'),
            ('VITARA',NULL,'/vehicle/accessories/vattelage.png','Attelage','accessory'),
            ('VITARA',NULL,'/vehicle/accessories/vbarres.png','Barres de toit','accessory'),
            ('VITARA',NULL,'/vehicle/accessories/vaccoudoir.png','Accoudoir central','accessory'),
            ('VITARA',NULL,'/vehicle/accessories/vecrous.png','Ecrous anti-vol','accessory'),
            ('VITARA','EH','/vehicle/accessories/vattelage.png','Attelage','accessory'),
            ('VITARA','EH','/vehicle/accessories/vbarres.png','Barres de toit','accessory'),
            ('VITARA','EH','/vehicle/accessories/vaccoudoir.png','Accoudoir central','accessory'),
            ('VITARA','EH','/vehicle/accessories/vecrous.png','Ecrous anti-vol','accessory'),
            ('SWIFT',NULL,'/vehicle/accessories/sbarres.png','Barres de toit','accessory'),
            ('SWIFT',NULL,'/vehicle/accessories/saccoudoir.png','Accoudoir central','accessory'),
            ('SWIFT',NULL,'/vehicle/accessories/stapis.png','Tapis de sol Deluxe','accessory'),
            ('SWIFT',NULL,'/vehicle/accessories/secrous.png','Ecrous anti-vol','accessory'),
            ('SWIFT SPORT',NULL,'/vehicle/accessories/sbarres.png','Barres de toit','accessory'),
            ('SWIFT SPORT',NULL,'/vehicle/accessories/ssaccoudoir.png','Accoudoir central','accessory'),
            ('SWIFT SPORT',NULL,'/vehicle/accessories/sstapis.png','Tapis de sol Sport','accessory'),
            ('SWIFT SPORT',NULL,'/vehicle/accessories/secrous.png','Ecrous anti-vol','accessory'),
            ('SWIFT SPORT','EH','/vehicle/accessories/sbarres.png','Barres de toit','accessory'),
            ('SWIFT SPORT','EH','/vehicle/accessories/ssaccoudoir.png','Accoudoir central','accessory'),
            ('SWIFT SPORT','EH','/vehicle/accessories/sstapis.png','Tapis de sol Sport','accessory'),
            ('SWIFT SPORT','EH','/vehicle/accessories/secrous.png','Ecrous anti-vol','accessory'),
            ('IGNIS',NULL,'/vehicle/accessories/iattelage.png','Barre d’attelage 2WD','accessory'),
            ('IGNIS',NULL,'/vehicle/accessories/ibarres.png','Barres de toit','accessory'),
            ('IGNIS',NULL,'/vehicle/accessories/itapis.png','Tapis de sol Eco','accessory'),
            ('IGNIS',NULL,'/vehicle/accessories/iecrous.png','Ecrous anti-vol','accessory'),
            ('IGNIS','EH','/vehicle/accessories/iattelage.png','Attelage','accessory'),
            ('IGNIS','EH','/vehicle/accessories/ibarres.png','Barres de toit','accessory'),
            ('IGNIS','EH','/vehicle/accessories/ihcalandre.png','Entourage de calandre','accessory'),
            ('IGNIS','EH','/vehicle/accessories/ihaccoudoir.png','Accoudoir central','accessory'),
            ('S-CROSS',NULL,'/vehicle/accessories/scbarres.png','Barres de toit','accessory'),
            ('S-CROSS',NULL,'/vehicle/accessories/sctapis.png','Tapis de sol Eco','accessory'),
            ('S-CROSS',NULL,'/vehicle/accessories/scattelage.png','Attelage','accessory'),
            ('S-CROSS',NULL,'/vehicle/accessories/scpedales.png','Pédales Sport en aluminium','accessory'),
            ('S-CROSS','EH','/vehicle/accessories/scbarres.png','Barres de toit','accessory'),
            ('S-CROSS','EH','/vehicle/accessories/sctapis.png','Tapis de sol Eco','accessory'),
            ('S-CROSS','EH','/vehicle/accessories/scattelage.png','Attelage','accessory'),
            ('S-CROSS','EH','/vehicle/accessories/schecrous.png','Ecrous anti-vol','accessory'),
            ('BALENO',NULL,'/vehicle/accessories/bbarres.png','Barres de toit','accessory'),
            ('BALENO',NULL,'/vehicle/accessories/battelage.png','Attelage','accessory'),
            ('BALENO',NULL,'/vehicle/accessories/becrous.png','Ecrous anti-vol','accessory'),
            ('BALENO',NULL,'/vehicle/accessories/btapis.png','Tapis de sol Eco','accessory'),
            ('CELERIO',NULL,'/vehicle/accessories/ctapis.png','Tapis de sol Eco','accessory'),
            ('CELERIO',NULL,'/vehicle/accessories/cbaguettes.png','Baguettes de protection latérales','accessory'),
            ('CELERIO',NULL,'/vehicle/accessories/cbecquet.png','Becquet de toit à peindre','accessory'),
            ('CELERIO',NULL,'/vehicle/accessories/cmoulure.png','Moulure de hayon chromée','accessory')
        ");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE vehicle_file DROP label');
    }
}
