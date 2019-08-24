let Joi = require('joi');

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
    }
})); 

  exports.RoomSession = RoomSession;