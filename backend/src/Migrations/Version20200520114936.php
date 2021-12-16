<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200520114936 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE article_vehicle_model (article_id INT NOT NULL, vehicle_model_id INT NOT NULL, INDEX IDX_32E11D907294869C (article_id), INDEX IDX_32E11D90A467B873 (vehicle_model_id), PRIMARY KEY(article_id, vehicle_model_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle_model (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE article_vehicle_model ADD CONSTRAINT FK_32E11D907294869C FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE article_vehicle_model ADD CONSTRAINT FK_32E11D90A467B873 FOREIGN KEY (vehicle_model_id) REFERENCES vehicle_model (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE article_vehicle_model DROP FOREIGN KEY FK_32E11D90A467B873');
        $this->addSql('DROP TABLE article_vehicle_model');
        $this->addSql('DROP TABLE vehicle_model');
    }
}
