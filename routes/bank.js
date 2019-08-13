const express = require('express');
const router = express.Router();
//nested routes.
const account = require('./bankRoutes/account');
const wiretransfer = require('./bankRoutes/wiretransfer');
const loan = require('./bankRoutes/loan');
const fee = require('./bankRoutes/fee');
const plan = require('./bankRoutes/plan');
const transaction = require('./bankRoutes/transaction');

router.use('/account',account);
router.use('/wiretransfer',wiretransfer);
router.use('/loan',loan);
router.use('/fee',fee);
router.use('/plan',plan)
router.use('/transaction',transaction)

module.exports = router;