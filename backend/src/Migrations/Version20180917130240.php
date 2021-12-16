<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180917130240 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql("UPDATE vehicle_file SET path = '/upload/vehicle/logo/splash_logo.png' WHERE path = '/upload/vehicle/logo/splash-logo.png'");

    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs

    }
}
