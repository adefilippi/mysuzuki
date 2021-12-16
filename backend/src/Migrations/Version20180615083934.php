<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180615083934 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE maintenance DROP FOREIGN KEY FK_2F84F8E94A4A3511');
        $this->addSql('DROP INDEX IDX_2F84F8E94A4A3511 ON maintenance');
        $this->addSql('ALTER TABLE maintenance CHANGE vehicule_id vehicle_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE maintenance ADD CONSTRAINT FK_2F84F8E9545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicle (id)');
        $this->addSql('CREATE INDEX IDX_2F84F8E9545317D1 ON maintenance (vehicle_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE maintenance DROP FOREIGN KEY FK_2F84F8E9545317D1');
        $this->addSql('DROP INDEX IDX_2F84F8E9545317D1 ON maintenance');
        $this->addSql('ALTER TABLE maintenance CHANGE vehicle_id vehicule_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE maintenance ADD CONSTRAINT FK_2F84F8E94A4A3511 FOREIGN KEY (vehicule_id) REFERENCES vehicle (id)');
        $this->addSql('CREATE INDEX IDX_2F84F8E94A4A3511 ON maintenance (vehicule_id)');
    }
}
