const { response } = require('express');
const Sub = require('../models/subModel');

exports.getSubs = (req, res) => {
    Sub.getAllSubs((err, subs) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching subs' });
        }
        Sub.getSubTypes((errST, subTypes) => {
            if (errST) {
                return res.status(500).json({ error: 'Error fetching sub types' });
            }
            Sub.getAllPayments((errPay,payments) => {
                if (errPay) {
                    return res.status(500).json({ error: 'Error fetching paymenst' });
                }
                res.render('subscriptions', { subs, subTypes, payments});
            })
        })
    });
};

exports.getEvents = (req, res) => {
    Sub.getAllEvents((err, events) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching events' });
        }
        Sub.getAgrupationTotals((errAT,totals)=>{
            res.json({events,totals})
        })
    });
};

exports.getTvRStatement = (req, res) => {
    Sub.getTeoricStatatement((err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching statement' });
        }
        let previusTeoricValue = 0
        let previusRealValue = 0
        console.log(data)
        data = data.map( (row)=>{
            let newRow = {
                "day_number": row.day_number,
                "full_date": row.full_date,
                "teoric_amount" : (parseFloat(row.Monto_Teorico) || 0) + previusTeoricValue,
                "real_amount" : (parseFloat(row.Monto_Real) || previusRealValue),
            }
            // console.log(row.Monto , previusValue)
            previusTeoricValue = (parseFloat(row.Monto_Teorico) || 0) + previusTeoricValue
            previusRealValue = (parseFloat(row.Monto_Real) || previusRealValue)
            return newRow
            
        })
        res.json({data})
    });
};

exports.createSub = (req, res) => {
    Sub.createSub(req,(err, subs) => {
        if (err) {
            // console.log(req)
            return res.status(500).json({ error: `Error creating subs ${err}` });
        }else{
            res.redirect('/subs/list')
        }
    });
    
};

exports.createPayment = (req, res) => {
    Sub.createPayment(req,(err, subs) => {
        if (err) {
            // console.log(req)
            return res.status(500).json({ error: `Error creating payment ${err}` });
        }else{
            res.redirect('/subs/list')
        }
    });
    
};