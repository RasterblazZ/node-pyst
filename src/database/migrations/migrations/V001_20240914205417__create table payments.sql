CREATE TABLE `payments` (
  `idpayments` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `monthDay` int DEFAULT NULL,
  PRIMARY KEY (`idpayments`)
)