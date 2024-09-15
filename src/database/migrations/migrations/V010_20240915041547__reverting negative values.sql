ALTER VIEW `pst`.`vw_statement` AS
    SELECT 
        `b`.`Tipo` AS `Tipo`,
        `b`.`Nombre` AS `Nombre`,
        `b`.`MonthDay` AS `MonthDay`,
        `b`.`Monto` AS `Monto`,
        `b`.`Moneda` AS `Moneda`,
        `b`.`Estatus` AS `Estatus`,
        `b`.`Creado` AS `Creado`,
        `b`.`Cancelado` AS `Cancelado`
    FROM
        `pst`.`subscriptions` `b`
    WHERE
        (`b`.`Estatus` = 'Activo') 
    UNION ALL SELECT 
        'Payment' AS `Payment`,
        `a`.`nombre` AS `Nombre`,
        `a`.`monthDay` AS `MonthDay`,
        `a`.`monto` AS `Monto`,
        'GTQ' AS `GTQ`,
        'Activo' AS `Activo`,
        NULL AS `NULL`,
        NULL AS `NULL`
    FROM
        `pst`.`payments` `a`