CREATE TABLE `FILE` (
  `file_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `original_name` varchar(500) DEFAULT NULL,
  `mimetype` varchar(100) DEFAULT NULL,
  `destination` varchar(500) DEFAULT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `path` varchar(500) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `team_id` bigint(20) DEFAULT NULL,
  `url` varchar(1000) NOT NULL,
  `type` int(1) NOT NULL COMMENT '1 : map , 2: guide, 3: etc',
  `save_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8