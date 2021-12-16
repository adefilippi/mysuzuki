<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180703153515 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE password_request_token DROP FOREIGN KEY FK_7561F885A76ED395');
        $this->addSql('ALTER TABLE password_request_token ADD CONSTRAINT FK_7561F885A76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE password_request_token DROP FOREIGN KEY FK_7561F885A76ED395');
        $this->addSql('ALTER TABLE password_request_token ADD CONSTRAINT FK_7561F885A76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id)');
    }
}
