<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200305155717 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE offers_users (offer_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_4FF36D3C53C674EE (offer_id), INDEX IDX_4FF36D3CA76ED395 (user_id), PRIMARY KEY(offer_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE offers_users ADD CONSTRAINT FK_4FF36D3C53C674EE FOREIGN KEY (offer_id) REFERENCES offer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offers_users ADD CONSTRAINT FK_4FF36D3CA76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873EA76ED395');
        $this->addSql('ALTER TABLE offer DROP user_id');

        // TODO/WARNING: Offers currently linked to users will not have their link rebuild

        $this->addSql('ALTER TABLE offer ADD target_type VARCHAR(255) NOT NULL DEFAULT \'everyone\', ADD update_date DATETIME DEFAULT NULL');
        $this->addSql('UPDATE offer SET target_type = \'everyone\' WHERE discr = \'manual_offer\'');
        $this->addSql('UPDATE offer SET target_type = \'filtered\' WHERE discr = \'automatic_offer\'');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE offers_users');
        $this->addSql('ALTER TABLE offer ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873EA76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_29D6873EA76ED395 ON offer (user_id)');

        $this->addSql('ALTER TABLE offer DROP target_type, DROP update_date');
    }
}
