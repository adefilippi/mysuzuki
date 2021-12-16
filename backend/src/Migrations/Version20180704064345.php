<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180704064345 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE article (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, category VARCHAR(255) NOT NULL, publish_date DATETIME NOT NULL, excerpt VARCHAR(140) NOT NULL, body LONGTEXT NOT NULL, image VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE article_article (article_source INT NOT NULL, article_target INT NOT NULL, INDEX IDX_EFE84AD1354DE8F3 (article_source), INDEX IDX_EFE84AD12CA8B87C (article_target), PRIMARY KEY(article_source, article_target)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE article_article ADD CONSTRAINT FK_EFE84AD1354DE8F3 FOREIGN KEY (article_source) REFERENCES article (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE article_article ADD CONSTRAINT FK_EFE84AD12CA8B87C FOREIGN KEY (article_target) REFERENCES article (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE article_article DROP FOREIGN KEY FK_EFE84AD1354DE8F3');
        $this->addSql('ALTER TABLE article_article DROP FOREIGN KEY FK_EFE84AD12CA8B87C');
        $this->addSql('DROP TABLE article');
        $this->addSql('DROP TABLE article_article');
    }
}
