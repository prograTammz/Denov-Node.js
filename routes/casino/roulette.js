    const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//operations
const {fillAccount,chargeAccount} = require('../../operations/account');
//middleware
const isAdmin = require('../../middleware/admin');
const auth = require('../../middleware/auth');
const validObjectId = require('../../middleware/validObjectId');
const hasBankAccount = require('../../middleware/hasBankAccount');
//datamodels
const {Room,validateRoom} = require('../../models/rouletteRoom');
const {RoomSession,validateJoin,validateRedeem} = require('../../models/roomSession');

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
        res.status(400).send(error.details[0].message);
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
router.post('/join/:id',[auth,hasBankAccount,validObjectId], (req,res)=>{

    const {error} = validateJoin(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
    }

    session = new RoomSession({
        isDone: false,
        deposit: req.body.deposit,
        sessionStart: Date.now()
    })
    chargeAccount(req.account, req.body.deposit, `Casino/roulette:: deposit ${session._id}`)
    .then(()=>{
        return Room.findOneAndUpdate({_id: req.params.id}, {$inc: {count: 1}});
    })
    .then(()=>{
        return session.save();
    })
    .then(session=>{
        let token = jwt.sign({session}, process.env.API_KEY);
        res.send(token);
    })
    .catch(err=>{
        res.status(400).send(err);
    })

    
});
router.post('/redeem',auth, (req,res)=>{
})

module.exports = router;