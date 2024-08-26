const db = require('../config/db');

const Sub = {
    getAllSubs: (callback) => {
        const query = `SELECT 
        Tipo,
        Nombre,
        MonthDay,
        Monto,
        Moneda,
        Estatus,
        Creado,
        Cancelado
        FROM subscriptions
        where Estatus = 'Activo'`;
        db.query(query, (err, results) => {
            // console.log('resultado',results)
            if (err) {
                return callback(err, null);
            }
            // Calcular el total
            
            let totales = {
                "totalGeneral" : results.reduce((total, sub) => {
                    return total + (sub.Monto * (sub.Moneda == 'USD' ? 7.7 : 1))
                }, 0),
                "totalUSD" : results.reduce((total, sub) => {
                    return total + (sub.Moneda == 'USD' ? parseFloat(sub.Monto) : 0)
                }, 0),
                "totalGTQ" : results.reduce((total, sub) => {
                    return total + (sub.Moneda == 'GTQ' ? parseFloat(sub.Monto) : 0)
                }, 0),
            }

            let response = {
                "totals" : totales,
                "rows" : results,
            }

            // let totales = {"totalGeneral" : totalGeneral}
            callback(null, response);
        });
    },

    // getAllSubs: (callback) => {
    //     const query = 'SELECT * FROM subscriptions';
    //     db.query(query, (err, results) => {
    //         // console.log('resultado',results)
    //         if (err) {
    //             return callback(err, null);
    //         }
    //         callback(null, results);
    //     });
    // },

    createSub: (req,callback) => {
        // console.log(callback)
        // console.log('BODY',req.body)

        // Tipo char(20),
        // Nombre char(30),
        // MonthDay int,
        // Monto numeric(6,2),
        // Moneda char(20),
        // Estatus char(20),
        // Creado date,
        // Cancelado date

        const query = `insert into subscriptions values('${req.body.type}','${req.body.plataform}','${req.body.monthday}','${req.body.monto}','${req.body.moneda}','${req.body.estatus}',DATE(NOW()),null)`;
        // console.log(query)
        db.query(query, (err, results) => {
            console.log('resultado',results)
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
};

module.exports = Sub;
