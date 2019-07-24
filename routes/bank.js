const express = require('express');
const router = express.Router();
//nested routes.
const account = require('./bankRoutes/account');
const wiretransfer = require('./bankRoutes/wiretransfer');
const loan = require('./bankRoutes/loan');

router.use('/account',account);
router.use('/wiretransfer',wiretransfer);
router.use('/loan',loan);

module.exports = router;