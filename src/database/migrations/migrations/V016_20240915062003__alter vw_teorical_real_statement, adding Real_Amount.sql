ALTER VIEW vw_teorical_real_statement

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
  sum(b.Monto) Monto_Teorico,
  amount Monto_Real
FROM day_list a
LEFT OUTER JOIN (
	SELECT 
  MonthDay,
  SUM(CASE 
        WHEN Tipo != 'Payment' THEN (Monto*y.currency) * -1 
        ELSE Monto 
      END) AS Monto
	FROM vw_statement x
    INNER JOIN currency y
    ON x.Moneda = y.name
	GROUP BY MonthDay
) b
ON a.day_number = b.MonthDay
Left outer join (
	select diary_date,amount from diary
) c
ON a.full_date = c.diary_date
group by 
day_number,
full_date,
b.Monto,
amount
;