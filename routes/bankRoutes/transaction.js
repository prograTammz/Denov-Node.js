const express = require('express');
const router = express.Router();
//Models
const {Transaction,validateTransaction } = require('../../models/transactions');
const {Account,validateAccount} = require('../../models/account');
const {Fees} = require('../../models/fees');
const {User} = require('../../models/users');
const {Earning} = require('../../models/earnings');
//MiddleWares
const auth = require('../../middleware/auth');
const banker = require('../../middleware/banker');
const admin = require('../../middleware/admin');
const validateObjectId = require('../../middleware/validObjectId');
const _ = require('lodash');
//admin routes
router.get('/all',(req,res)=>{

});
router.get('/pending',(req,res)=>{

})
router.put('/verify',(req,res)=>{

})
//user routes
router.get('/',(req,res)=>{

})
router.put('/id',(req,res)=>{
    
})
router.post('/',(req,res)=>{

})
router.delete('/',(req,res)=>{

})



module.exports = router;
