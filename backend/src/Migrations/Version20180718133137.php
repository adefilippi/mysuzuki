<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180718133137 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql('INSERT INTO issue_type (label, email, slug, appears_when) VALUES
            ("Ne plus recevoir d\'informations commerciales de la part de Suzuki", "change-me@dummy.none", "plus-recevoir-informations-commerciales-suzuki", "connected")
       ');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('DELETE FROM issue_type WHERE slug = "plus-recevoir-informations-commerciales-suzuki"');
    }
}
