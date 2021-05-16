# Table user_follow_through
# ------------------------------------------------------------

CREATE TABLE `User_follow_through` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `follower_user` int(11) unsigned NOT NULL,
  `followed_user` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`follower_user`) REFERENCES User(`id`),
  FOREIGN KEY (`followed_user`) REFERENCES User(`id`),
  UNIQUE KEY(`follower_user`, `followed_user`)
);



# Table Tweet
# ------------------------------------------------------------

CREATE TABLE `Tweet` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tweet` text,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`createdBy`) REFERENCES User(`id`)
);



# Table User
# ------------------------------------------------------------

CREATE TABLE `User` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL DEFAULT '',
  `password` varchar(11) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE(`username`)
);

