let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const wiretransfer =mongoose.model('wiretransfer', new mongoose.Schema({
    senderFirst:{
        type: String,
        required: true,
    },
    senderLast:{
        type: String,
        required: true
    },
    recieverFirst:{
        type: String,
        required: true
    },
    recieverLast:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true,
        min: 2000
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    recieveId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}));

function validateWireTransfer(wiretransfer) {
    const schema = {
      recieverFirst: Joi.string().required(),
      recieverLast: Joi.string().required(),
      amount: Joi.number().min(2000).required()
    };
  
    return Joi.validate(wiretransfer, schema);
  }
  
  exports.wiretransfer = wiretransfer; 
  exports.validate = validateWireTransfer;