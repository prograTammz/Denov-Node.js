const express = require('express');
const router = express.Router();

const roulette = require('./casino/roulette');

router.use('/roulette',roulette);

module.exports = router;
