const express = require('express');
const router = express.Router();
const {BankPlan,validateBankPlan} = require('../../models/bankPlan');
router.get('/loan',(req,res)=>{

})
router.get('/loan/:id',(req,res)=>{

})
router.post('/loan',(req,res)=>{

})

router.get('/saving',(req,res)=>{
    BankPlan.find().sort()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})
router.get('/saving/:id',(req,res)=>{
    BankPlan.findById(req.params.id)
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})
router.post('/saving',(req,res)=>{
    const {error} = validateBankPlan(req.body);
    if(error){
        res.status(400).send(error);
    }
    const plan = new BankPlan({
        interest: req.body.interest,
        durationDays: req.body.durationDays,
        breakFees: req.body.breakFees,
        bonus : req.body.bonus,
        minimum: req.body.minimum,
        isCompound: req.body.isCompound,
        deducationRate: req.body.deducationRate,
        allowance: req.body.allowance
    })
    plan.save()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})
module.exports = router;