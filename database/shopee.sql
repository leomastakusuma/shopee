
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `tax_code` int(11) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tax_code` (`tax_code`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`tax_code`) REFERENCES `tax` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `orders` (`id`, `name`, `tax_code`, `price`, `create_date`)
VALUES
	(1,'Big Mac',1,1000,'2018-10-04 16:25:55');

CREATE TABLE `tax` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `tax` (`id`, `name`)
VALUES
	(1,'Food & Beverage'),
	(2,'Tobacco'),
	(3,'Entertainment');

