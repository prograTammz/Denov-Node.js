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
        type: Boolean,
        required: true
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
    },
    count:{
        type: Number,
    },
    budget:{
        type: Number,
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}));

  
  exports.Room = Room; 