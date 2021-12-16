<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180706133800 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE vehicle ADD purchase_dealership_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E4865AE7454E FOREIGN KEY (purchase_dealership_id) REFERENCES dealership (id)');
        $this->addSql('CREATE INDEX IDX_1B80E4865AE7454E ON vehicle (purchase_dealership_id)');
        $this->addSql('ALTER TABLE dealership ADD more_information_url VARCHAR(255)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE dealership DROP more_information_url');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E4865AE7454E');
        $this->addSql('DROP INDEX IDX_1B80E4865AE7454E ON vehicle');
        $this->addSql('ALTER TABLE vehicle DROP purchase_dealership_id');
    }
}
