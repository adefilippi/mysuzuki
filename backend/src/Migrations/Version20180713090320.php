<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180713090320 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql('INSERT INTO issue_type (label, email, slug, appears_when) VALUES
                       ("Ajouter un véhicule", "change-me@dummy.none", "ajouter-un-vehicule", "connected"),
                       ("Je n\'arrive pas à me connecter", "change-me@dummy.none", "probleme-connexion", "disconnected")
        ');
        $this->addSql("UPDATE issue_type SET appears_when = 'connected' WHERE slug = 'informations-incorrectes'");
        $this->addSql("UPDATE issue_type SET appears_when = 'connected_disconnected' WHERE slug = 'je-n-ai-pas-recu-ma-carte'");
        $this->addSql("UPDATE issue_type SET appears_when = 'disconnected' WHERE slug = 'probleme-d-inscription'");

    }

    public function down(Schema $schema) : void
    {
        $this->addSql('DELETE FROM issue_type WHERE slug = "probleme-connexion" OR slug = "ajouter-un-vehicule"');
    }
}
