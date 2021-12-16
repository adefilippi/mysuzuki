<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190311155148 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        $this->addSql(
            '
            INSERT INTO vehicle_file (car_label, first_date, path, dtype) VALUES
                ("JIMNY", "2019-01-01T00:00:00", "/upload/vehicle/picture/fond_jimny_2019.jpg", "picture"),
                ("JIMNY", "2019-01-01T00:00:00", "/upload/vehicle/manual/manuel_utilisateur_jimny_2019.pdf", "manual")
            '
        );
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        $this->addSql(
            'DELETE FROM vehicle_file WHERE path = "/upload/vehicle/picture/fond_jimny_2019.jpg" or path = "/upload/vehicle/manual/manuel_utilisateur_jimny_2019.pdf"'
        );
    }
}
