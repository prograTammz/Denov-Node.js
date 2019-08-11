const express = require('express');
const router = express.Router();
const {Fees,validate} = require('../../models/fees');
const _ = require('lodash');

router.get('/',(req,res)=>{

});

router.post('/',(req,res)=>{
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
router.put('/',(req,res)=>{

})

module.exports = router;

