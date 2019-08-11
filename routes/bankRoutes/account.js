const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isBanker = require('../../middleware/banker');
const isAdmin = require('../../middleware/admin');
const {Account,validateAccount} = require('../../models/account');

router.get('/',auth,(req,res)=>{
    Account.find({ denovId: req.user.id }).sort('creationDate')
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});
router.get('/:id',(req,res)=>{

});
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

});
router.put('/handle/:id',[auth,isBanker],(req,res)=>{
    
});
router.delete('/close/:id',[auth,isBanker],(req,res)=>{

});
//for logged user
router.post('/',auth,(req,res)=>{

});
module.exports = router;