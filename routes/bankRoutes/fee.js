const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const validObjectId = require('../../middleware/validObjectId');
const {Fees,validate} = require('../../models/fees');
const _ = require('lodash');

router.get('/',(req,res)=>{
    Fees.find().sort('cost').exec()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
    
});

router.post('/',[auth,admin],(req,res)=>{
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const fee = new Fees({
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type
    })
    fee.save().then(data=>{
        res.send(data);
    })
})
router.put('/:id',[validObjectId,auth,admin],(req,res)=>{
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    Fees.findByIdAndUpdate(req.params.id,req.body,(err,data)=>{
        if(err){
            res.status(400).send(err.details[0].message);
        }
        res.send();
    })
})  

module.exports = router;

