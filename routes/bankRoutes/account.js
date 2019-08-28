const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../../middleware/auth');
const isBanker = require('../../middleware/banker');
const isAdmin = require('../../middleware/admin');
const {Account,validateAccount} = require('../../models/account');
const {BankPlan, validatePlan} = require('../../models/bankPlan');
const validObjectId = require('../../middleware/validObjectId');
const {Fees} = require('../../models/fees');
const {User} = require('../../models/users');
const {Earning} = require('../../models/earnings');
//admin only routes
router.get('/all',[auth,isAdmin],(req,res)=>{
    Account.find().sort('creationDate')
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
});
//banker task routes
router.get('/pending',[auth,isBanker],(req,res)=>{

    Account.find({ status:"pending" }).sort('creationDate')
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});
router.get('/',auth,(req,res)=>{
    Account.find({ denovId: req.user._id }).sort('creationDate')
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});
router.get('/:id',[validObjectId,auth],(req,res)=>{
    Account.find({ denovId: req.user._id, _id: req.params.id }).sort('creationDate')
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});
router.put('/handle/:id',[validObjectId,auth,isBanker],(req,res)=>{
    
    Fees.find({type: {$in: ["account","transaction","eservice"]}})
    .then((fees)=>{
       return  _.sumBy(fees,'cost');
    }).then((fees)=>{
        const earnings = new Earning({
            source:"Banking account creation fees",
            cost: fees
        });
        earnings.save()
        return Account.findByIdAndUpdate(req.params.id,{ status:"created", lastUpdated: Date.now(), "$inc": {"currentBalance": -fees , "principle": -fees, "lowestBalance": -fees} })
    }).then((account)=>{
        return User.findByIdAndUpdate(account.denovId,{isSaver: "true"})
    }).then(()=>{
        res.send();
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
    
});
router.delete('/close/:id',[validObjectId,auth,isBanker],(req,res)=>{
    Account.findByIdAndRemove(req.params.id)
    .then((account)=>{
        return Account.findOne({denovId: account.denovId, status:"created"}).count()
            .then((count)=>{
                if(count === 0){
                    return User.findByIdAndUpdate(account.denovId,{isSaver: "false"});
                }
                res.send();
            })
    })
    .then(()=>{
        res.send()
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});
//for logged user
router.post('/',auth,(req,res)=>{
    const {error} = validateAccount(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    BankPlan.findOne({_id: req.body.planId})
    .then((plan)=>{
        const account = new Account({
            isMain: req.body.isMain,
            principle: req.body.principle,
            currentBalance: req.body.principle,
            lowestBalance: req.body.principle,
            planId: req.body.planId,
            denovId: req.user._id,
            bonus: plan.bonus,
            allowanceDays: plan.allowance,
            updateDays: plan.updateDays,
            breakFees: plan.breakFees,
            deduceRate: plan.deduceRate,
            interest: plan.interest,
            creationDate: Date.now()
        })
        account.save().then((data)=>{
            res.send(data);
        })
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
    
});
module.exports = router;