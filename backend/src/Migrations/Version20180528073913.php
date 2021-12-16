<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180528073913 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE dealership (id INT AUTO_INCREMENT NOT NULL, external_id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, phone VARCHAR(35) DEFAULT NULL COMMENT \'(DC2Type:phone_number)\', fax VARCHAR(35) DEFAULT NULL COMMENT \'(DC2Type:phone_number)\', email VARCHAR(255) DEFAULT NULL, address_street VARCHAR(255) DEFAULT NULL, address_additional1 VARCHAR(255) DEFAULT NULL, address_additional2 VARCHAR(255) DEFAULT NULL, address_zip_code VARCHAR(255) DEFAULT NULL, address_city VARCHAR(255) DEFAULT NULL, coordinates_latitude VARCHAR(255) DEFAULT NULL, coordinates_longitude VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_7D7A975D9F75D7B0 (external_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE dealership');
    }
}
