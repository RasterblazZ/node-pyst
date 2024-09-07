const express = require('express');
const router = express.Router();
const subController = require('../controllers/subController');

router.get('/list', subController.getSubs);
router.get('/events', subController.getEvents);
router.post('/create', subController.createSub);

module.exports = router;