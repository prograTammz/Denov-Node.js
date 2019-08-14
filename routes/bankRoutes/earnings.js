const express = require('express');
const router = express.Router();
const {Earning,validate} = require('../../models/earnings')
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
router.get('/',[auth,admin],(req,res)=>{
    Earning.find().sort("-date")
    .then((earnings)=>{
        res.send(earnings);
    }).catch((err)=>{
        res.status(400).send(err);
    })
})
router.post('/',[auth,admin],(req,res)=>{
    const {error} = validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }
    const earning = new Earning({
        source: req.body.source,
        cost: req.body.cost
    })
    earning.save().then(()=>{
        res.send();
    })
})
module.exports = router;