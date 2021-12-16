<?php declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180613143602 extends AbstractMigration
{

    public function up(Schema $schema) : void
    {
        $this->addSql("INSERT INTO staff_size (id, label) VALUES (1, 'Unités non employeuses'), (2, '0 salarié'), (3 , '1 ou 2 salariés'), (4 , '3 à 5 salariés'), (5 , '6 à 9 salariés'), (6 , '10 à 19 salariés'), (7 , '20 à 49 salariés'), (8 , '50 à 99 salariés'), (9 , '100 à 199 salariés'), (10 , '200 à 249 salariés'), (11 , '250 à 499 salariés'), (12 , '500 à 999 salariés'), (13 , '1 000 à 1 999 salariés'), ( 14 ,'2 000 à 4 999 salariés'), (15 , '5 000 à 9 999 salariés'), (16 , '10 000 salariés et plus')");
    }

    public function down(Schema $schema) : void
    {
        $this->addSql("DELETE FROM staff_size");
    }
}
