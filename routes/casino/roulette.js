const express = require('express');
const router = express.Router();
//operations
const {fillAccount,chargeAccount} = require('../../operations/account');
//middleware
const isAdmin = require('../../middleware/admin');
const auth = require('../../middleware/auth');
const validObjectId = require('../../middleware/validObjectId');
const hasBankAccount = require('../../middleware/hasBankAccount');
//datamodels
const {Room,validateRoom} = require('../../models/rouletteRoom');
const RoomSession = require('../../models/roomSession');

//rooms routes
router.get('/room',(req,res)=>{

});
router.post('/room',[auth, isAdmin], (req,res)=>{

});
router.delete('room',[auth, isAdmin], (req,res)=>{
    
});
//joining
router.post('/join/:id',[auth,hasBankAccount], (req,res)=>{

});
router.post('/redeem',auth, (req,res)=>{
    
})

module.exports = router;