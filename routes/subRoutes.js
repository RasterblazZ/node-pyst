const express = require('express');
const router = express.Router();
const subController = require('../controllers/subController');

router.get('/home', subController.getSubs);
router.post('/create', subController.createSub);

module.exports = router;