const express = require('express');
const router = express.Router();
const subController = require('../controllers/subController');

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.redirect('/home/dashboard')
});

// Ruta para la página de inicio
router.get('/dashboard', (req, res) => {
    let subs = subController.getSubsJson()
    console.log(subs)
    res.render('index');
});

// router.get('/home', subController.getSubs);
// router.post('/create', subController.createSub);

module.exports = router;