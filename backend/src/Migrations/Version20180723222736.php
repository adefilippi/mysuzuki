<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180723222736 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE question_question (question_source INT NOT NULL, question_target INT NOT NULL, INDEX IDX_D5FFF94258D7507B (question_source), INDEX IDX_D5FFF942413200F4 (question_target), PRIMARY KEY(question_source, question_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE question_question ADD CONSTRAINT FK_D5FFF94258D7507B FOREIGN KEY (question_source) REFERENCES question (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE question_question ADD CONSTRAINT FK_D5FFF942413200F4 FOREIGN KEY (question_target) REFERENCES question (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer CHANGE cta_content cta_content VARCHAR(255) DEFAULT NULL, CHANGE cta_type cta_type VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE question ADD cta_label VARCHAR(255) DEFAULT NULL, ADD cta_issue_type VARCHAR(255) DEFAULT NULL, ADD cta_content VARCHAR(255) DEFAULT NULL, ADD cta_type VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE question_question');
        $this->addSql('ALTER TABLE offer CHANGE cta_content cta_content VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE cta_type cta_type VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE question DROP cta_label, DROP cta_issue_type, DROP cta_content, DROP cta_type');
    }
}
