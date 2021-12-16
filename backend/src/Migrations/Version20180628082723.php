<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180628082723 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql(
            '
            INSERT INTO vehicle_file (car_label, first_date, path, dtype) VALUES
                ("default", NULL, "/upload/vehicle/picture/fond_generique.jpg", "picture"),
                ("BALENO", "2015-01-01T18:01:30", "/upload/vehicle/picture/fond_baleno.jpg", "picture"),
                ("CELERIO", NULL, "/upload/vehicle/picture/fond_celerio.jpg", "picture"),
                ("IGNIS", "2016-01-01T18:01:30", "/upload/vehicle/picture/fond_ignis.jpg", "picture"),
                ("JIMNY", "2014-01-01T18:01:30", "/upload/vehicle/picture/fond_jimny.jpg", "picture"),
                ("S-CROSS", "2016-11-01T18:01:30", "/upload/vehicle/picture/fond_scross.jpg", "picture"),
                ("SWIFT", "2017-04-01T18:01:30", "/upload/vehicle/picture/fond_new_swift.jpg", "picture"),
                ("SWIFT 2017", NULL, "/upload/vehicle/picture/fond_new_swift.jpg", "picture"),
                ("SWIFT SPORT", "2018-01-01T18:01:30", "/upload/vehicle/picture/fond_swift_sport.jpg", "picture"),
                ("VITARA", NULL, "/upload/vehicle/picture/fond_vitara.jpg", "picture"),
                ("BALENO", "2015-01-01T18:01:30", "/upload/vehicle/manual/manuel_utilisateur_baleno.pdf", "manual"),
                ("CELERIO", NULL, "/upload/vehicle/manual/manuel_utilisateur_celerio.pdf", "manual"),
                ("GRAND VITARA", NULL, "/upload/vehicle/manual/manuel_utilisateur_grand_vitara.pdf", "manual"),
                ("GRAND VITARA 3 PTES", NULL, "/upload/vehicle/manual/manuel_utilisateur_grand_vitara.pdf", "manual"),
                ("GRAND VITARA 5 PTES", NULL, "/upload/vehicle/manual/manuel_utilisateur_grand_vitara.pdf", "manual"),
                ("NOUVEAU GRAND VITARA 3 PTES", NULL, "/upload/vehicle/manual/manuel_utilisateur_grand_vitara.pdf", "manual"),
                ("NOUVEAU GRAND VITARA 5 PTES", NULL, "/upload/vehicle/manual/manuel_utilisateur_grand_vitara.pdf", "manual"),
                ("IGNIS", "2016-01-01T18:01:30", "/upload/vehicle/manual/manuel_utilisateur_nouvelle_ignis.pdf", "manual"),
                ("JIMNY", "2014-01-01T18:01:30", "/upload/vehicle/manual/manuel_utilisateur_jimny.pdf", "manual"),
                ("S-CROSS", NULL, "/upload/vehicle/manual/manuel_utilisateur_s-cross_avant_facelift.pdf", "manual"),
                ("S-CROSS", "2016-11-01T18:01:30", "/upload/vehicle/manual/manuel_utilisateur_nouveau_scross.pdf", "manual"),
                ("SWIFT", NULL, "/upload/vehicle/manual/manuel_utilisateur_swift_actuelle.pdf", "manual"),
                ("SWIFT", "2017-04-01T18:01:30", "/upload/vehicle/manual/manuel_utilisateur_nouvelle_swift_(2017).pdf", "manual"),
                ("SWIFT 3 PTES", NULL, "/upload/vehicle/manual/manuel_utilisateur_swift_actuelle.pdf", "manual"),
                ("SWIFT 5 PTES", NULL, "/upload/vehicle/manual/manuel_utilisateur_swift_actuelle.pdf", "manual"),
                ("SWIFT 2017", NULL, "/upload/vehicle/manual/manuel_utilisateur_nouvelle_swift_2017.pdf", "manual"),
                ("VITARA", NULL, "/upload/vehicle/manual/manuel_utilisateur_vitara.pdf", "manual"),
                ("BALENO", "2015-01-01T18:01:30", "/upload/vehicle/maintenance_program/plans_entretien_baleno_a4.pdf", "maintenanceprogram"),
                ("CELERIO", NULL, "/upload/vehicle/maintenance_program/plans_entretien_celerio_a4.pdf", "maintenanceprogram"),
                ("IGNIS", "2016-01-01T18:01:30", "/upload/vehicle/maintenance_program/plans_entretien_ignis_a4.pdf", "maintenanceprogram"),
                ("JIMNY", "2014-01-01T18:01:30", "/upload/vehicle/maintenance_program/plans_entretien_jimny_a4.pdf", "maintenanceprogram"),
                ("S-CROSS", NULL, "/upload/vehicle/maintenance_program/plans_entretien_s-cross_a4.pdf", "maintenanceprogram"),
                ("SWIFT", NULL, "/upload/vehicle/maintenance_program/plans_entretien_swift_a4.pdf", "maintenanceprogram"),
                ("SWIFT 3 PTES", NULL, "/upload/vehicle/maintenance_program/plans_entretien_swift_a4.pdf", "maintenanceprogram"),
                ("SWIFT 5 PTES", NULL, "/upload/vehicle/maintenance_program/plans_entretien_swift_a4.pdf", "maintenanceprogram"),
                ("SWIFT 2017", NULL, "/upload/vehicle/maintenance_program/plans_entretien_swift_a4.pdf", "maintenanceprogram"),
                ("SWIFT SPORT", NULL, "/upload/vehicle/maintenance_program/plans_entretien_swiftsport_a4.pdf", "maintenanceprogram"),
                ("VITARA", NULL, "/upload/vehicle/maintenance_program/plans_entretien_vitara_a4.pdf", "maintenanceprogram"),
                ("ALTO", NULL, "/upload/vehicle/logo/alto_logo.png", "logo"),
                ("NOUVELLE ALTO", NULL, "/upload/vehicle/logo/alto_logo.png", "logo"),
                ("BALENO", NULL, "/upload/vehicle/logo/baleno.png", "logo"),
                ("BALENO", "2015-01-01T18:01:30", "/upload/vehicle/logo/baleno.png", "logo"),
                ("CARRY", NULL, "/upload/vehicle/logo/logo_carry.png", "logo"),
                ("CELERIO", NULL, "/upload/vehicle/logo/celerio_logo.png", "logo"),
                ("GRAND VITARA", NULL, "/upload/vehicle/logo/logo_grand_vitara.png", "logo"),
                ("GRAND VITARA 3 PTES", NULL, "/upload/vehicle/logo/logo_grand_vitara.png", "logo"),
                ("GRAND VITARA 5 PTES", NULL, "/upload/vehicle/logo/logo_grand_vitara.png", "logo"),
                ("NOUVEAU GRAND VITARA 3 PTES", NULL, "/upload/vehicle/logo/logo_grand_vitara.png", "logo"),
                ("NOUVEAU GRAND VITARA 5 PTES", NULL, "/upload/vehicle/logo/logo_grand_vitara.png", "logo"),
                ("IGNIS", NULL, "/upload/vehicle/logo/logo_ignis.png", "logo"),
                ("IGNIS", "2016-01-01T18:01:30", "/upload/vehicle/logo/logo_ignis.png", "logo"),
                ("JIMNY", NULL, "/upload/vehicle/logo/logo_jimny.png", "logo"),
                ("JIMNY", "2014-01-01T18:01:30", "/upload/vehicle/logo/logo_jimny.png", "logo"),
                ("KIZASHI", NULL, "/upload/vehicle/logo/kizashi_logo.png", "logo"),
                ("S-CROSS", NULL, "/upload/vehicle/logo/logo_s_cross.png", "logo"),
                ("S-CROSS", "2016-11-01T18:01:30", "/upload/vehicle/logo/logo_s_cross.png", "logo"),
                ("SAMURAI", NULL, "/upload/vehicle/logo/logo_samurai.png", "logo"),
                ("SANTANA", NULL, "/upload/vehicle/logo/logo_santana.png", "logo"),
                ("SPLASH", NULL, "/upload/vehicle/logo/splash-logo.png", "logo"),
                ("SWIFT", NULL, "/upload/vehicle/logo/logo_swift.png", "logo"),
                ("SWIFT", "2017-04-01T18:01:30", "/upload/vehicle/logo/logo_swift.png", "logo"),
                ("ANCIENNE SWIFT", NULL, "/upload/vehicle/logo/logo_swift.png", "logo"),
                ("SWIFT 3 PTES", NULL, "/upload/vehicle/logo/logo_swift.png", "logo"),
                ("SWIFT 5 PTES", NULL, "/upload/vehicle/logo/logo_swift.png", "logo"),
                ("ANCIENNE SWIFT 3 PTES", NULL, "/upload/vehicle/logo/logo_swift.png", "logo"),
                ("ANCIENNE SWIFT 5 PTES", NULL, "/upload/vehicle/logo/logo_swift.png", "logo"),
                ("SWIFT 2017", NULL, "/upload/vehicle/logo/logo_swift.png", "logo"),
                ("SWIFT SPORT", NULL, "/upload/vehicle/logo/logo_swiftsport.png", "logo"),
                ("SWIFT SPORT", "2018-01-01T18:01:30", "/upload/vehicle/logo/logo_swiftsport.png", "logo"),
                ("SX4", NULL, "/upload/vehicle/logo/sx4_logo.png", "logo"),
                ("SX4 S-CROSS", NULL, "/upload/vehicle/logo/logo_sx4s_cross.png", "logo"),
                ("VITARA", NULL, "/upload/vehicle/logo/logo_vitara.png", "logo"),
                ("WAGON R", NULL, "/upload/vehicle/logo/wagonr_logo.png", "logo")
            '
        );
    }

    public function down(Schema $schema) : void
    {
        $this->addSql("DELETE FROM file");
    }
}
