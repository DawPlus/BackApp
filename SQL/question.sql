CREATE TABLE dbforesthealing113.QUESTION (
	question_id BIGINT auto_increment NOT NULL,
	title varchar(1000) NOT NULL,
	content LONGTEXT NOT NULL,
	`type` varchar(1) NOT NULL,
	`map` varchar(1000) NULL,
	guide varchar(1000) NULL,
	video varchar(1000) NULL,
	update_date DATETIME NULL,
	CONSTRAINT QUESTION_PK PRIMARY KEY (question_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
