<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200217124946 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE offer ADD dealership_id INT DEFAULT NULL, ADD external_id INT DEFAULT NULL, ADD value DOUBLE PRECISION DEFAULT NULL, ADD use_date DATETIME DEFAULT NULL, ADD reduction_type VARCHAR(255) DEFAULT NULL, ADD is_automated TINYINT(1) NOT NULL, ADD label VARCHAR(255) DEFAULT NULL, CHANGE body_description body_description LONGTEXT DEFAULT NULL, CHANGE body_conditions body_conditions LONGTEXT DEFAULT NULL, CHANGE body_rules body_rules LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873E8CF5FC51 FOREIGN KEY (dealership_id) REFERENCES dealership (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_29D6873E9F75D7B0 ON offer (external_id)');
        $this->addSql('CREATE INDEX IDX_29D6873E8CF5FC51 ON offer (dealership_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873E8CF5FC51');
        $this->addSql('DROP INDEX UNIQ_29D6873E9F75D7B0 ON offer');
        $this->addSql('DROP INDEX IDX_29D6873E8CF5FC51 ON offer');
        $this->addSql('ALTER TABLE offer DROP dealership_id, DROP external_id, DROP value, DROP use_date, DROP reduction_type, DROP is_automated, DROP label, CHANGE body_description body_description LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE body_conditions body_conditions LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE body_rules body_rules LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
