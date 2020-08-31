CREATE TABLE dbforesthealing113.EXAMPLE (
	example_id BIGINT auto_increment NOT NULL,
	question_id BIGINT NOT NULL,
	content LONGTEXT NOT NULL,
	isAnswer varchar(1) NOT NULL,
	update_date DATETIME NULL,
	CONSTRAINT EXAMPLE_PK PRIMARY KEY (example_id),
	CONSTRAINT EXAMPLE_FK FOREIGN KEY (question_id) REFERENCES dbforesthealing113.QUESTION(question_id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
