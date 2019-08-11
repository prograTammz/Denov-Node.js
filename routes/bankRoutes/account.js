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
    Account.find({ denovId: req.user.id, _id: req.params.id }).sort('creationDate')
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
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
    Account.find({ status:"pending" }).sort('creationDate')
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});
router.put('/handle/:id',[auth,isBanker],(req,res)=>{
    Account.findByIdAndUpdate(req.params.id,{ status:"created" })
    .then((data)=>{
        res.send();
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});
router.delete('/close/:id',[auth,isBanker],(req,res)=>{
    Account.findByIdAndRemove(req.params.id)
    .then((data)=>{
        res.send();
    })
    .catch((err)=>{
        res.status(400).send(err);
    });
});
//for logged user
router.post('/',auth,(req,res)=>{

});
module.exports = router;