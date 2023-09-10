CREATE DATABASE  IF NOT EXISTS `Task`;
USE `Task`;


DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `product`;


CREATE TABLE `product` (
   `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `img` Blob DEFAULT NULL,
  `price` DECIMAL(10,2) DEFAULT NULL,
  `user_id` int NOT NULL,
  constraint foreign key(user_id) references user(id) , 

  PRIMARY KEY (`id`)
);

