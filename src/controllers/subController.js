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
    Sub.getAllEvents((err, subs) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching events' });
        }

        res.json({subs})
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