const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isBanker = require('../../middleware/banker');
const isAdmin = require('../../middleware/admin');

router.get('/',auth,(req,res)=>{

});
router.get('/:id',(req,res)=>{

});
//admin only routes
router.get('/all',[auth,isAdmin],(req,res)=>{
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