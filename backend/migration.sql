--
-- Fichier à utiliser pour migrer les données de l'ancien mysuzuki.fr
-- Etape 1 : suivre les instructions données ci-après
-- Etape 2 : Sourcer le fichier en faisant platform sql < migration.sql
--

--
-- Structure de la table `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `cus_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cus_crmId` varchar(25) NOT NULL,
  `cus_civility` varchar(5) NOT NULL,
  `cus_lastname` varchar(150) NOT NULL,
  `cus_firstname` varchar(150) NOT NULL,
  `cus_address` varchar(150) NOT NULL,
  `cus_postalCode` varchar(10) NOT NULL,
  `cus_city` varchar(150) NOT NULL,
  `cus_country` varchar(50) NOT NULL,
  `cus_email` varchar(200) NOT NULL,
  `cus_password` varchar(250) NOT NULL,
  `cus_phone` varchar(10) NOT NULL,
  `cus_mobile` varchar(10) NOT NULL,
  `cus_fax` varchar(10) NOT NULL,
  `cus_birthDate` date,
  `cus_dealer` varchar(6) NOT NULL,
  `cus_registrationDate` datetime NOT NULL,
  `cus_enabled` tinyint(1) NOT NULL,
  `cus_deleted` tinyint(1) NOT NULL,
  `cus_lastUpdate` datetime NOT NULL,
  PRIMARY KEY (`cus_id`),
  UNIQUE KEY `uniqueEmail` (`cus_email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12384 ;

-----------------------------------------------------------------------------

--
-- TODO : Insérer ici les instructions INSERT INTO récupérées du dump de l'ancienne base de données
-- TODO : Remplacer tous les '0000-00-00' par null
--

-----------------------------------------------------------------------------

--
-- Copie des informations à migrer depuis l'ancien Suzuki dans not table app_user
--

INSERT INTO app_user (external_id, last_name, password, email, signed_up_at, updated_at, migrated, enabled)
SELECT cus_crmId, cus_lastname, cus_password, cus_email, cus_registrationDate, NOW(), 1, 0
FROM customer;

--
-- Suppression des anciennes données et de la table customer
--

TRUNCATE customer;

DROP TABLE customer;
