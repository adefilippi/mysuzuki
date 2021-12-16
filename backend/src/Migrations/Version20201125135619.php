<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201125135619 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE featured_content (id INT AUTO_INCREMENT NOT NULL, article_id INT DEFAULT NULL, offer_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, position INT NOT NULL, UNIQUE INDEX UNIQ_5F0420E4462CE4F5 (position), UNIQUE INDEX UNIQ_5F0420E47294869C (article_id), UNIQUE INDEX UNIQ_5F0420E453C674EE (offer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE featured_content ADD CONSTRAINT FK_5F0420E47294869C FOREIGN KEY (article_id) REFERENCES article (id)');
        $this->addSql('ALTER TABLE featured_content ADD CONSTRAINT FK_5F0420E453C674EE FOREIGN KEY (offer_id) REFERENCES offer (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE featured_content');
    }
}
