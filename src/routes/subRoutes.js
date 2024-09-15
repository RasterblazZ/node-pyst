const express = require('express');
const router = express.Router();
const subController = require('../controllers/subController');

router.get('/list', subController.getSubs);
router.get('/events/:date?', subController.getEvents);
router.post('/createSub', subController.createSub);
router.post('/createPay', subController.createPayment);
router.get('/rptteoricvreal', subController.getTvRStatement);
module.exports = router;