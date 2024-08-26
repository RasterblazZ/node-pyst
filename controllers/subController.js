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
    User.getAllSubs((err, subs) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching subs' });
        }
        res.json({ subs });
    });
};

exports.getSubsJson = (req, res) => {
    User.getAllSubs((err, subs) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching subs' });
        }else{
            return subs
        }
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