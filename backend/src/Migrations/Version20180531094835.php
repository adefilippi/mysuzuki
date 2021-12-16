<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180531094835 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE maintenance (id INT AUTO_INCREMENT NOT NULL, vehicule_id INT DEFAULT NULL, external_id INT DEFAULT NULL, date DATETIME DEFAULT NULL, type VARCHAR(255) DEFAULT NULL, place VARCHAR(255) DEFAULT NULL, local TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_2F84F8E99F75D7B0 (external_id), INDEX IDX_2F84F8E94A4A3511 (vehicule_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE maintenance ADD CONSTRAINT FK_2F84F8E94A4A3511 FOREIGN KEY (vehicule_id) REFERENCES vehicle (id)');
        $this->addSql('ALTER TABLE vehicle ADD maintenances_updated_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE maintenance');
        $this->addSql('ALTER TABLE vehicle DROP maintenances_updated_at');
    }
}
