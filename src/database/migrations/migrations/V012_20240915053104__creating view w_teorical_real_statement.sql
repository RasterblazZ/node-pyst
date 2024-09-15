create view vw_teorical_real_statement
as
WITH RECURSIVE day_list AS (
  SELECT 
    1 AS day_number,
    DATE_FORMAT(CURDATE(), '%Y-%m-01') AS full_date
  UNION ALL
  SELECT 
    day_number + 1,
    DATE_ADD(full_date, INTERVAL 1 DAY)
  FROM day_list
  WHERE DATE_ADD(full_date, INTERVAL 1 DAY) <= LAST_DAY(CURDATE())
)
SELECT 
  day_number,
  full_date,
  b.MonthDay,
  sum(b.Monto) Monto
FROM day_list a
LEFT OUTER JOIN (
	SELECT 
  MonthDay,
  SUM(CASE 
        WHEN Tipo != 'Payment' THEN Monto * -1 
        ELSE Monto 
      END) AS Monto
	FROM vw_statement
	GROUP BY MonthDay
) b
ON a.day_number = b.MonthDay
group by 
day_number,
full_date,
b.Monto,
b.MonthDay
;