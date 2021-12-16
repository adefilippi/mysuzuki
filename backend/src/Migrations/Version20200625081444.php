<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200625081444 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE game (id INT AUTO_INCREMENT NOT NULL, media_id INT DEFAULT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, title VARCHAR(255) NOT NULL, summary VARCHAR(200) DEFAULT NULL, maximum_participants INT DEFAULT NULL, required_fields LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', INDEX IDX_232B318CEA9FDD75 (media_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE participation (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, game_id INT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_AB55E24FA76ED395 (user_id), INDEX IDX_AB55E24FE48FD905 (game_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE game ADD CONSTRAINT FK_232B318CEA9FDD75 FOREIGN KEY (media_id) REFERENCES media__media (id)');
        $this->addSql('ALTER TABLE participation ADD CONSTRAINT FK_AB55E24FA76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id)');
        $this->addSql('ALTER TABLE participation ADD CONSTRAINT FK_AB55E24FE48FD905 FOREIGN KEY (game_id) REFERENCES game (id)');
        $this->addSql('ALTER TABLE app_user CHANGE job_organization_contacts job_organization_contacts LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\'');
        $this->addSql('ALTER TABLE offer CHANGE title title VARCHAR(255) NOT NULL, CHANGE discr discr VARCHAR(255) NOT NULL, CHANGE target_type target_type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE issue DROP FOREIGN KEY FK_12AD233EA05591E0');
        $this->addSql('DROP INDEX uniq_12ad233ea05591e0 ON issue');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_12AD233E464E68B ON issue (attachment_id)');
        $this->addSql('ALTER TABLE issue ADD CONSTRAINT FK_12AD233EA05591E0 FOREIGN KEY (attachment_id) REFERENCES attachment (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE participation DROP FOREIGN KEY FK_AB55E24FE48FD905');
        $this->addSql('DROP TABLE game');
        $this->addSql('DROP TABLE participation');
        $this->addSql('ALTER TABLE app_user CHANGE job_organization_contacts job_organization_contacts LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_bin`');
        $this->addSql('ALTER TABLE issue DROP FOREIGN KEY FK_12AD233E464E68B');
        $this->addSql('DROP INDEX uniq_12ad233e464e68b ON issue');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_12AD233EA05591E0 ON issue (attachment_id)');
        $this->addSql('ALTER TABLE issue ADD CONSTRAINT FK_12AD233E464E68B FOREIGN KEY (attachment_id) REFERENCES attachment (id)');
        $this->addSql('ALTER TABLE offer CHANGE title title VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE target_type target_type VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'everyone\' NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE discr discr VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'offer\' NOT NULL COLLATE `utf8mb4_unicode_ci`');
    }
}
