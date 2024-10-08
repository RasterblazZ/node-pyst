const db = require('../config/db');

const Sub = {
    getSubTypes: (callback) => {
        const query = `SELECT * FROM subscription_type`;
        db.query(query, (err, rows) => {
            if (err)
                return callback(err, null);

            // let totales = {"totalGeneral" : totalGeneral}
            callback(null, rows);
        });
    },

    getAllSubs: (callback) => {
        const query = `SELECT * FROM subscriptions where Estatus = 'Activo'`;
        db.query(query, (err, rows) => {
            if (err)
                return callback(err, null);

            // Calcular el total
            let totals = {
                "totalGeneral" : rows.reduce((total, sub) => {
                    return total + (sub.Monto * (sub.Moneda == 'USD' ? 7.7 : 1))
                }, 0),
                "totalUSD" : rows.reduce((total, sub) => {
                    return total + (sub.Moneda == 'USD' ? parseFloat(sub.Monto) : 0)
                }, 0),
                "totalGTQ" : rows.reduce((total, sub) => {
                    return total + (sub.Moneda == 'GTQ' ? parseFloat(sub.Monto) : 0)
                }, 0),
            }

            let response = {totals,rows}

            // let totales = {"totalGeneral" : totalGeneral}
            callback(null, response);
        });
    },

    getAllPayments: (callback) => {
        // TODO: use diferent models for every table
        const query = `SELECT * FROM payments`;
        db.query(query, (err, rows) => {
            if (err)
                return callback(err, null);

            // Calcular el total
            let totals = {
                "totalGeneral" : rows.reduce((total, pay) => {
                    return total + (pay.monto)
                }, 0),
            }

            let response = {totals,rows}

            // let totales = {"totalGeneral" : totalGeneral}
            callback(null, response);
        });
    },

    getEventsByDate: (date,callback) => {
        let dateValues = date.split('-')
        // TODO: there is a bug when replacing the 0 on '30' will show you '03' events
        const query = `SELECT * FROM vw_statement where Estatus = 'Activo' and MonthDay = '${dateValues[2].replace('0','')}'`;
        // console.log(query)
        db.query(query, (err, rows) => {
            if (err)
                return callback(err, null);
            let response = {rows}
            callback(null, response);
        });
    },

    getAllEvents: (callback) => {
        const query = `SELECT * FROM vw_statement where Estatus = 'Activo'`;
        db.query(query, (err, rows) => {
            if (err)
                return callback(err, null);

            // Calcular el total
            let totals = {
                "totalGeneral" : rows.reduce((total, sub) => {
                    return total + (sub.Monto * (sub.Moneda == 'USD' ? 7.7 : 1))
                }, 0),
                "totalUSD" : rows.reduce((total, sub) => {
                    return total + (sub.Moneda == 'USD' ? parseFloat(sub.Monto) : 0)
                }, 0),
                "totalGTQ" : rows.reduce((total, sub) => {
                    return total + (sub.Moneda == 'GTQ' ? parseFloat(sub.Monto) : 0)
                }, 0),
            }

            let response = {totals,rows}
            callback(null, response);
        });
    },

    getTeoricStatatement: (callback) => {
        const query = `SELECT * FROM vw_teorical_real_statement`;
        db.query(query, (err, rows) => {
            if (err)
                return callback(err, null);
            callback(null, rows);
        });
    },

    getAgrupationTotals: (callback) => {
        const query = `SELECT * FROM vw_TypeAgrupation`;
        db.query(query, (err, rows) => {
            if (err)
                return callback(err, null);

            let response = {rows}
            callback(null, response);
        });
    },

    createSub: (req,callback) => {

        const query = `insert into subscriptions values(null,'${req.body.type}','${req.body.plataform}','${req.body.monthday}','${req.body.monto}','${req.body.moneda}','${req.body.estatus}',DATE(NOW()),null)`;
        // console.log(query)
        db.query(query, (err, results) => {
            // console.log('resultado',results)
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    createPayment: (req,callback) => {

        const query = `insert into payments values(null,'${req.body.name}','${req.body.monto}','${req.body.monthday}')`;
        // console.log(query)
        db.query(query, (err, results) => {
            // console.log('resultado',results)
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    createRealAmount: (req,callback) => {

        const query = `insert into diary values (null,'${req.body.accountType}','${req.body.date}','${req.body.amount}')`;
        // console.log(query)
        db.query(query, (err, results) => {
            // console.log('resultado',results)
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
};

module.exports = Sub;
