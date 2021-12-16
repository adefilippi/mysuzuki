<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180619132223 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE vehicle_file (id INT AUTO_INCREMENT NOT NULL, path VARCHAR(255) NOT NULL, car_label VARCHAR(255) NOT NULL, first_date DATETIME DEFAULT NULL, dtype VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE vehicle ADD logo_id INT DEFAULT NULL, ADD picture_id INT DEFAULT NULL, ADD maintenance_program_id INT DEFAULT NULL, ADD manual_id INT DEFAULT NULL, ADD files_updated_at DATETIME');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E486F98F144A FOREIGN KEY (logo_id) REFERENCES vehicle_file (id)');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E486EE45BDBF FOREIGN KEY (picture_id) REFERENCES vehicle_file (id)');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E48619FF8784 FOREIGN KEY (maintenance_program_id) REFERENCES vehicle_file (id)');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E4869BA073D6 FOREIGN KEY (manual_id) REFERENCES vehicle_file (id)');
        $this->addSql('CREATE INDEX IDX_1B80E486F98F144A ON vehicle (logo_id)');
        $this->addSql('CREATE INDEX IDX_1B80E486EE45BDBF ON vehicle (picture_id)');
        $this->addSql('CREATE INDEX IDX_1B80E48619FF8784 ON vehicle (maintenance_program_id)');
        $this->addSql('CREATE INDEX IDX_1B80E4869BA073D6 ON vehicle (manual_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E486F98F144A');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E486EE45BDBF');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E48619FF8784');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E4869BA073D6');
        $this->addSql('DROP TABLE vehicle_file');
        $this->addSql('DROP INDEX IDX_1B80E486F98F144A ON vehicle');
        $this->addSql('DROP INDEX IDX_1B80E486EE45BDBF ON vehicle');
        $this->addSql('DROP INDEX IDX_1B80E48619FF8784 ON vehicle');
        $this->addSql('DROP INDEX IDX_1B80E4869BA073D6 ON vehicle');
        $this->addSql('ALTER TABLE vehicle DROP logo_id, DROP picture_id, DROP maintenance_program_id, DROP manual_id, DROP files_updated_at');
    }
}
