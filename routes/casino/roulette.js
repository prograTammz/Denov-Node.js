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
    let query = {};
    query.sort = { bet: 1};
    Room.find({},'count bet type isFixed _id',query)
    .then(rooms=>{
        res.send(rooms);
    })
    .catch(err=>{
        res.status(400).send(err);
    })
});
router.post('/room',[auth, isAdmin], (req,res)=>{
    const {error} = validateRoom(req.body);
    if (error){
        res.status.send(error.details[0].message);
    }
    let room = new Room({
        type: req.body.type,
        bet: req.body.bet,
        creatorId: req.user._id,
        startDate: Date.now(),
        expireDate: (Date.now() + 1000*3600*24),
        isFixed: true
    })
    room.save()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(400).send(err);
    })
});
router.delete('/room/:id',[auth, isAdmin], (req,res)=>{
    Room.findByIdAndDelete(req.params.id)
    .then(room=>{
        res.send();
    })
    .catch(err=>{
        res.status(400).send(err);
    })
});
//joining
router.post('/join/:id',[auth,hasBankAccount], (req,res)=>{

});
router.post('/redeem',auth, (req,res)=>{

})

module.exports = router;