<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180706151039 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE issue_type ADD appears_when VARCHAR(255) NOT NULL, CHANGE slug slug VARCHAR(128) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D4399FE5989D9B62 ON issue_type (slug)');
        $this->addSql('INSERT INTO issue_type (label, email, slug, appears_when) VALUES
                       ("Supprimer mon compte", "change-me@dummy.none", "supprimer-mon-compte", "connected"),
                       ("Je ne suis plus en possession du véhicule", "change-me@dummy.none", "plus-en-possession-du-vehicule", "connected")
        ');
        $this->addSql("UPDATE issue_type SET appears_when = 'connected' WHERE label = 'informations-incorrectes'");
        $this->addSql("UPDATE issue_type SET appears_when = 'connected_disconnected' WHERE label = 'je-n-ai-pas-recu-ma-carte'");
        $this->addSql("UPDATE issue_type SET appears_when = 'disconnected' WHERE label = 'probleme-d-inscription'");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        $this->addSql('DROP INDEX UNIQ_D4399FE5989D9B62 ON issue_type');
        $this->addSql('ALTER TABLE issue_type DROP appears_when, CHANGE slug slug VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
