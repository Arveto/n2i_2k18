CREATE TABLE `users` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `faName` varchar(45) NOT NULL,
  `fiName` varchar(45) NOT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(128) NOT NULL,
  `inscriptionDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `admin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `messages` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`content` TEXT NOT NULL,
	`author` SMALLINT unsigned NOT NULL,
	`room` SMALLINT unsigned NOT NULL,
	`date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;

CREATE TABLE `messages` (
	`id` INT unsigned NOT NULL AUTO_INCREMENT,
	`name` TINYTEXT NOT NULL,
	`author` SMALLINT unsigned NOT NULL,
	`date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
