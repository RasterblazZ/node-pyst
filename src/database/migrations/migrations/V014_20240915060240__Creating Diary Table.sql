create table `pst`.`diary`
(
    id_diary int NOT NULL auto_increment,
    account_type char(10),
    diary_date date,
    amount DECIMAL(5,2),
    PRIMARY KEY(id_diary)
)