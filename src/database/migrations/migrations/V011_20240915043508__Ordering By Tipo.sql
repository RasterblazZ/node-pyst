alter view vw_TypeAgrupation
as

select Tipo,sum(Monto*b.currency) SubTotal from vw_statement a
INNER JOIN currency b
ON a.Moneda = b.name
group by Tipo
order by Tipo asc