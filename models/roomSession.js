let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const RoomSession =mongoose.model('roomSession', new mongoose.Schema({
    isDone:{
        type: Boolean,
        required: true
    },
    deposit:{
        type: Number,
        required: true
    },
    withdraw:{
        type: Number
    },
    sessionStart:{
        type: Date,
        required: true
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})); 
    function validateJoin(roomSession){
        const schema = {
            deposit: Joi.number().positive().required(),
            roomId: Joi.objectId().required()
        }
        return Joi.validate(roomSession, schema);
    }   
  exports.RoomSession = RoomSession;
  exports.validateJoin = validateJoin;
