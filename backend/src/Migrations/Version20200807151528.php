<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200807151528 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE vehicle_accessory (vehicle_id INT NOT NULL, accessory_id INT NOT NULL, INDEX IDX_560E604E545317D1 (vehicle_id), INDEX IDX_560E604E27E8CC78 (accessory_id), PRIMARY KEY(vehicle_id, accessory_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE vehicle_accessory ADD CONSTRAINT FK_560E604E545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicle (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vehicle_accessory ADD CONSTRAINT FK_560E604E27E8CC78 FOREIGN KEY (accessory_id) REFERENCES vehicle_file (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vehicle_file ADD energy VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE vehicle ADD accessories_link_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E4861260895 FOREIGN KEY (accessories_link_id) REFERENCES vehicle_file (id)');
        $this->addSql('CREATE INDEX IDX_1B80E4861260895 ON vehicle (accessories_link_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE vehicle_accessory');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E4861260895');
        $this->addSql('DROP INDEX IDX_1B80E4861260895 ON vehicle');
        $this->addSql('ALTER TABLE vehicle DROP accessories_link_id');
        $this->addSql('ALTER TABLE vehicle_file DROP energy');
    }
}
