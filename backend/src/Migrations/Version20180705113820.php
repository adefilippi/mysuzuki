<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180705113820 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE issue_type ADD slug VARCHAR(255) NOT NULL');
        $this->addSql("UPDATE issue_type SET slug = 'informations-incorrectes' WHERE label = 'Informations incorrectes'");
        $this->addSql("UPDATE issue_type SET slug = 'probleme-d-inscription' WHERE label = 'Problème d\'inscription'");
        $this->addSql("UPDATE issue_type SET slug = 'je-n-ai-pas-recu-ma-carte' WHERE label = 'Je n\'ai pas reçu ma carte'");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE issue_type DROP slug');
    }
}
