let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const Account =mongoose.model('account', new mongoose.Schema({
    isMain:{
        type: Boolean,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "pending",
        enum: ["pending","created"]
    },
    principle:{
        type: Number,
        required: true,
        min:5000
    },
    currentBalance:{
        type: Number,
        required: true
    },
    planId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    denovId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    creationDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    lastUpdated:{
        type: Date,
        required: true,
        default: Date.now()
    },
    bonus: {
        type: Number,
        default: 0
    },
    allowanceDays:{
        type: Number,
        required: true
    },
    updateDays:{
        type:Number,
        default: 1
    },
    breakFees:{
        type:Number,
        default: 0
    },
    deduceRate: {
      type: Number,
      default: 0  
    },
    interest:{
        type: Number,
        required: true,
    },
    lowestBalance:{
        type: Number,
        required: true
    }



}));

function validateAccount(account) {
    const schema = {
        principle: Joi.number().min(5000).required(),
        planId: Joi.objectId().required(),
        isMain: Joi.boolean().required()
    };
  
    return Joi.validate(account, schema);
  }
  
  exports.Account = Account; 
  exports.validateAccount = validateAccount;