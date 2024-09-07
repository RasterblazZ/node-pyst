const { response } = require('express');
const User = require('../models/subModel');

exports.getSubs = (req, res) => {
    User.getAllSubs((err, subs) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching subs' });
        }
        // console.log(subs)
        res.render('subscriptions', { subs });
    });
};

exports.getEvents = (req, res) => {
    User.getAllEvents((err, subs) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching events' });
        }

        res.json({subs})
    });
};

exports.createSub = (req, res) => {
    User.createSub(req,(err, users) => {
        if (err) {
            // console.log(req)
            return res.status(500).json({ error: 'Error fetching subs' });
        }else{
            res.redirect('/subs/home')
        }
    });
    
};