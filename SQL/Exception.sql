CREATE TABLE dbforesthealing113.EXCEPTIONS (
	exceptionId BIGINT auto_increment NOT NULL,
	title varchar(500) NOT NULL,
	exceptions LONGTEXT NULL,
	deviceId varchar(100) NULL,
	saveDate DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT Exception_PK PRIMARY KEY (exceptionId)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
