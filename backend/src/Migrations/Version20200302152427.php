<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200302152427 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql('ALTER TABLE offer ADD discr VARCHAR(255) NOT NULL DEFAULT \'offer\', CHANGE title title VARCHAR(255) DEFAULT NULL');
        $this->addSql('UPDATE offer SET discr = \'automatic_offer\' WHERE is_automated = 1');
        $this->addSql('UPDATE offer SET discr = \'manual_offer\' WHERE is_automated = 0');
        $this->addSql('ALTER TABLE offer DROP is_automated');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('ALTER TABLE offer DROP discr, CHANGE title title VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE offer ADD is_automated TINYINT(1) NOT NULL');
    }
}
