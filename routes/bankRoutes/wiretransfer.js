const express = require('express');
const router = express.Router();
const {Wiretransfer,validateWiretransfer} = require('../../models/wiretranfser');
const {Fees} = require('../../models/fees');
const {User} = require('../../models/users');
const {Earning} = require('../../models/earnings');
const {Account,validateAccount} = require('../../models/account');
const auth = require('../../middleware/auth');
const _ = require('lodash');
router.get('/',auth,(req,res)=>{
    let wiretranfsers= {};
    wiretranfsers.recieved = Wiretransfer.find({recieverFirst: req.user.firstName, recieverLast: req.user.lastName})
    .then((wiretranfser)=>{
        return wiretranfser;
    })
    wiretranfsers.sent = Wiretransfer.find({senderFirst: req.user.firstName, senderLast: req.user.lastName})
        .then((wiretranfsers)=>{
            return wiretranfsers
        })
    Promise.all([wiretranfsers.recieved,wiretranfsers.sent]).then((vals)=>{
        res.send({recieved: vals[0], sent: vals[1]});
    })
})
router.post('/',auth,(req,res)=>{
    const {error} = validateWiretransfer(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }
    let wiretranfser = new Wiretransfer({
        recieverFirst: req.body.recieverFirst,
        recieverLast: req.body.recieverLast,
        senderFirst: req.user.firstName,
        senderLast: req.user.lastName,
        amount: req.body.amount,
        accountId: req.body.accountId
    })
    //validate the sender's balance/account and the reciever's account
    Account.findById(req.body.accountId)
    .then((account)=>{
        if(account.status === "pending"){
            res.status(400).send("Your account is still pending, deposit the cash first.");
        }
        if(account.currentBalance < req.body.amount){
            res.status(400).send("You don't have enough balance, please deposit or reconsider your wiretransfer");
        }
        return User.findOne({firstName: req.body.recieverFirst, lastName: req.body.recieverLast})
        
    }).then((user)=>{
        return Fees.find({type: {$in: ["wiretransfer","transaction","eservice"]}})
        .then((fees)=>{
            const earnings = new Earning({
                source:"Banking wiretransfer fees",
                cost: _.sumBy(fees,'cost')
            });
            return earnings.save().then(()=>{
                return Account.findOneAndUpdate({denovId: user._id, isMain: true},{"$inc": {"currentBalance": req.body.amount - _.sumBy(fees,'cost')}});
            })  
        })  
    })
    .then((account)=>{
        if(!account){
            res.status(400).send("There was an error finding the reciever account");
        }else{
            return Account.findByIdAndUpdate(req.body.accountId,{"$inc": {"currentBalance": -req.body.amount}});
        }
    }).then(()=>{
        return wiretranfser.save();
    }).then(()=>{
        res.send();
    })
    
})
module.exports = router;