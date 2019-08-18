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
router.put('/:id',(req,res)=>{
    
})
router.post('/',auth,(req,res)=>{
    //checking is the provided body has an error
    const {error} = validateTransaction(req.body);
    if(error){
        res.status(400).send(error);
    }
    //Creating a transaction object
    const transaction = new Transaction({
        amount: req.body.amount,
        type: req.body.type,
        bankAccountId: req.body.bankAccountId,
        denovId: req.user._id
    })
    //saving the transaction to the DB
    transaction.save()
        .then(()=>{
            res.send()
        })
        .catch((err)=>{
            res.status(400).send(err);
        })
})
router.delete('/',(req,res)=>{

})



module.exports = router;
