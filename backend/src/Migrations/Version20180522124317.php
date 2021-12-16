<?php declare(strict_types = 1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180522124317 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE staff_size (id INT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE app_user ADD date_of_birth DATETIME DEFAULT NULL, ADD civ VARCHAR(255) DEFAULT NULL, ADD mobile_phone VARCHAR(35) DEFAULT NULL COMMENT \'(DC2Type:phone_number)\', ADD landline_phone VARCHAR(35) DEFAULT NULL COMMENT \'(DC2Type:phone_number)\', ADD job_name VARCHAR(255) DEFAULT NULL, ADD job_department VARCHAR(255) DEFAULT NULL, ADD job_organization_name VARCHAR(255) DEFAULT NULL, ADD job_organization_size INT DEFAULT NULL, ADD job_organization_number_of_vehicles INT DEFAULT NULL, ADD job_organization_contacts JSON DEFAULT NULL, ADD job_organization_naf_code VARCHAR(255) DEFAULT NULL, ADD job_organization_naf_label VARCHAR(255) DEFAULT NULL, ADD address_street VARCHAR(255) DEFAULT NULL, ADD address_additional1 VARCHAR(255) DEFAULT NULL, ADD address_additional2 VARCHAR(255) DEFAULT NULL, ADD address_zip_code VARCHAR(255) DEFAULT NULL, ADD address_city VARCHAR(255) DEFAULT NULL, ADD optin_sms TINYINT(1) DEFAULT NULL, ADD optin_email TINYINT(1) DEFAULT NULL');
        $this->addSql('ALTER TABLE vehicle ADD purchase_type VARCHAR(255) DEFAULT NULL, ADD energy VARCHAR(255) DEFAULT NULL, ADD model VARCHAR(255) DEFAULT NULL, ADD registration_number VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE staff_size');
        $this->addSql('ALTER TABLE app_user DROP date_of_birth, DROP civ, DROP mobile_phone, DROP landline_phone, DROP job_name, DROP job_department, DROP job_organization_name, DROP job_organization_size, DROP job_organization_number_of_vehicles, DROP job_organization_contacts, DROP job_organization_naf_code, DROP job_organization_naf_label, DROP address_street, DROP address_additional1, DROP address_additional2, DROP address_zip_code, DROP address_city, DROP optin_sms, DROP optin_email');
        $this->addSql('ALTER TABLE vehicle DROP purchase_type, DROP energy, DROP model, DROP registration_number');
    }
}
