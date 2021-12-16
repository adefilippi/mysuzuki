<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200803153512 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        $this->addSql('update vehicle_file set path = replace(path , \'/upload\',\'\')');
        $this->addSql('update vehicle set files_updated_at = NULL');
        $this->addSql(
            '
            INSERT INTO vehicle_file (car_label, first_date, path, dtype) VALUES
                ("IGNIS", "2018-01-03T00:00:00", "/vehicle/picture/fond_new_ignis.jpg", "picture"),
                ("VITARA", "2020-01-01T00:00:00", "/vehicle/picture/fond_new_vitara.jpg", "picture")
            '
        );
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql(
            'DELETE FROM vehicle_file WHERE path = "/vehicle/picture/fond_new_ignis.jpg" or path = "/vehicle/picture/fond_new_vitara.jpg"'
        );
        $this->addSql('update vehicle_file set path = concat(\'/upload\' , path)');
   }
}
