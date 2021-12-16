<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180716161841 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE offer ADD media_id INT DEFAULT NULL, DROP image');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873EEA9FDD75 FOREIGN KEY (media_id) REFERENCES media__media (id)');
        $this->addSql('CREATE INDEX IDX_29D6873EEA9FDD75 ON offer (media_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873EEA9FDD75');
        $this->addSql('DROP INDEX IDX_29D6873EEA9FDD75 ON offer');
        $this->addSql('ALTER TABLE offer ADD image VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, DROP media_id');
    }
}
