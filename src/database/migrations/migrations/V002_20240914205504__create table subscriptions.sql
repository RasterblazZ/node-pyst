CREATE TABLE `subscriptions` (
  `id_subscription`  int NOT NULL AUTO_INCREMENT, 
  `Tipo` char(20) DEFAULT NULL,
  `Nombre` char(30) DEFAULT NULL,
  `MonthDay` int DEFAULT NULL,
  `Monto` decimal(6,2) DEFAULT NULL,
  `Moneda` char(20) DEFAULT NULL,
  `Estatus` char(20) DEFAULT NULL,
  `Creado` date DEFAULT NULL,
  `Cancelado` date DEFAULT NULL,
  PRIMARY KEY(id_subscription)
)