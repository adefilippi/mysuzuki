<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201126102336 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE banner (id INT AUTO_INCREMENT NOT NULL, media_desktop_id INT DEFAULT NULL, media_mobile_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, position INT DEFAULT NULL, link VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_6F9DB8E7462CE4F5 (position), INDEX IDX_6F9DB8E7F5D75B9A (media_desktop_id), INDEX IDX_6F9DB8E79D66F1C5 (media_mobile_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE banner ADD CONSTRAINT FK_6F9DB8E7F5D75B9A FOREIGN KEY (media_desktop_id) REFERENCES media__media (id)');
        $this->addSql('ALTER TABLE banner ADD CONSTRAINT FK_6F9DB8E79D66F1C5 FOREIGN KEY (media_mobile_id) REFERENCES media__media (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE banner');
    }
}
