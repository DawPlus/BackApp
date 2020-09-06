CREATE TABLE dbforesthealing113.API (
	apiId BIGINT auto_increment NOT NULL,
	name varchar(100) NULL,
	url varchar(500) NULL,
	description varchar(1000) NULL,
	method varchar(10) NULL,
	CONSTRAINT API_PK PRIMARY KEY (API_ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_general_ci;
