<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201221101303 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE featured_content ADD game_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE featured_content ADD CONSTRAINT FK_5F0420E4E48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5F0420E4E48FD905 ON featured_content (game_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE featured_content DROP FOREIGN KEY FK_5F0420E4E48FD905');
        $this->addSql('DROP INDEX UNIQ_5F0420E4E48FD905 ON featured_content');
        $this->addSql('ALTER TABLE featured_content DROP game_id');
    }
}
