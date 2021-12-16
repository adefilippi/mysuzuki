<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180623093522 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // TODO: change this to correct label/email couples
        $this->addSql("INSERT INTO issue_type (label, email) VALUES 
                           ('Informations incorrectes', 'change-me@dummy.none'),
                           ('Problème d\'inscription', 'change-me@dummy.none'),
                           ('Je n\'ai pas reçu ma carte', 'change-me@dummy.none')
                           ");
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("DELETE FROM issue_type");
    }
}
