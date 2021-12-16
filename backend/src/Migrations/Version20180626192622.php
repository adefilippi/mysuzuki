<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180626192622 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql(
            'INSERT INTO vehicle_type (short_label, display_label) VALUES 
                ("ALTO","ALTO"),
                ("NOUVELLE ALTO", "ALTO"),
                ("ANCIENS MODELES (REPRISE)", "ANCIEN MODELE"),
                ("BALENO", "BALENO"),
                ("CARRY", "CARRY"),
                ("CELERIO", "CELERIO"),
                ("GRAND VITARA", "GRAND VITARA"),
                ("GRAND VITARA 3 PTES", "GRAND VITARA"),
                ("GRAND VITARA 5 PTES", "GRAND VITARA"),
                ("NOUVEAU GRAND VITARA 3 PTES", "GRAND VITARA"),
                ("NOUVEAU GRAND VITARA 5 PTES", "GRAND VITARA"),
                ("IGNIS", "IGNIS"),
                ("JIMNY", "JIMNY"),
                ("KIZASHI", "KIZASHI"),
                ("LIANA", "LIANA"),
                ("MARUTI", "MARUTI"),
                ("S-CROSS", "S-CROSS"),
                ("SAMURAI", "SAMURAI"),
                ("SANTANA", "SANTANA"),
                ("SPLASH", "SPLASH"),
                ("SWIFT", "SWIFT"),
                ("SWIFT", "SWIFT"),
                ("ANCIENNE SWIFT", "SWIFT"),
                ("SWIFT 3 PTES", "SWIFT"),
                ("SWIFT 5 PTES", "SWIFT"),
                ("ANCIENNE SWIFT 3 PTES", "SWIFT"),
                ("ANCIENNE SWIFT 5 PTES", "SWIFT"),
                ("SWIFT 2017", "SWIFT"),
                ("SWIFT SPORT", "SWIFT SPORT"),
                ("SX4", "SX4"),
                ("SX4 S-CROSS", "SX4 S-CROSS"),
                ("VITARA", "VITARA"),
                ("WAGON R", "WAGON R"),
                ("X-90", "X-90"),
                ("X90", "X-90")
            '
        );
    }

    public function down(Schema $schema) : void
    {
        $this->addSql("DELETE FROM vehicle_type");
    }
}
