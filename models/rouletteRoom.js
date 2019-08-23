let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const Room =mongoose.model('room', new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum:['individual','casino']
    },
    isFixed:{
        type: Boolean
    },
    bet:{
        type:Number,
        required: true,
    },
    startDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    expireDate:{
        type: Date,
        required: true,
        default: (Date.now() + 1000*3600*24)
    },
    count:{
        type: Number,
        default: 0
    },
    budget:{
        type: Number,
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}));

function validateRoom(room) {
    const schema = {
        bet: Joi.number().min(100).max(5000).required(),
        type: Joi.string().valid('individual','casino').required(),
        creatorId: Joi.objectId().required()
    };
  
    return Joi.validate(room, schema);
}  
  exports.Room = Room; 
  exports.validateRoom = validateRoom;