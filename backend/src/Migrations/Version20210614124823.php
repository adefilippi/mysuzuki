<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210614124823 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql("INSERT INTO vehicle_file (path, car_label, dtype) VALUES ('/vehicle/logo/across_logo.png', 'ACROSS', 'logo')");
        $this->addSql("INSERT INTO vehicle_file (path, car_label, dtype) VALUES ('/vehicle/logo/swace_logo.png', 'SWACE', 'logo')");

        $this->addSql("INSERT INTO vehicle_file (path, car_label, dtype) VALUES ('/vehicle/picture/fond_across.jpg', 'ACROSS', 'picture')");
        $this->addSql("INSERT INTO vehicle_file (path, car_label, dtype) VALUES ('/vehicle/picture/fond_swace.jpg', 'SWACE', 'picture')");

        $this->addSql("INSERT INTO vehicle_file (path, car_label, dtype) VALUES ('/vehicle/manual/manuel_utilisateur_across.pdf', 'ACROSS', 'manual')");
        $this->addSql("INSERT INTO vehicle_file (path, car_label, dtype) VALUES ('/vehicle/manual/manuel_utilisateur_swace.pdf', 'SWACE', 'manual')");

        $this->addSql("INSERT INTO vehicle_file (path, car_label, dtype) VALUES ('/vehicle/maintenance_program/plans_entretien_across_a4.pdf', 'ACROSS', 'maintenanceprogram')");
        $this->addSql("INSERT INTO vehicle_file (path, car_label, dtype) VALUES ('/vehicle/maintenance_program/plans_entretien_swace_a4.pdf', 'SWACE', 'maintenanceprogram')");
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');
    }
}
