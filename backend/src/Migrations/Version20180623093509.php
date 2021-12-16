<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180623093509 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE issue_type (id INT AUTO_INCREMENT NOT NULL, label VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE issue (id INT AUTO_INCREMENT NOT NULL, type_id INT DEFAULT NULL, attachment_id INT DEFAULT NULL, subject VARCHAR(255) NOT NULL, message LONGTEXT NOT NULL, email VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_12AD233EC54C8C93 (type_id), UNIQUE INDEX UNIQ_12AD233EA05591E0 (attachment_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE issue ADD CONSTRAINT FK_12AD233EC54C8C93 FOREIGN KEY (type_id) REFERENCES issue_type (id)');
        $this->addSql('ALTER TABLE issue ADD CONSTRAINT FK_12AD233EA05591E0 FOREIGN KEY (attachment_id) REFERENCES attachment (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE issue DROP FOREIGN KEY FK_12AD233EC54C8C93');
        $this->addSql('DROP TABLE issue_type');
        $this->addSql('DROP TABLE issue');
    }
}
