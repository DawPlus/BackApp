CREATE TABLE dbdawplus.EXCEPTIONS (
	exception_id BIGINT auto_increment NOT NULL,
	title varchar(500) NOT NULL,
	exceptions LONGTEXT NULL,
	device_id varchar(100) NULL,
	save_date DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT Exception_PK PRIMARY KEY (exception_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
