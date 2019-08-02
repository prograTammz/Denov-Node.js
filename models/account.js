const Joi = require('joi');
const mongoose = require('mongoose');
const Account =mongoose.model('account', new mongoose.Schema({
    status:{
        type: String,
        required: true,
        default: "pending",
        enum: ["pending","created"]
    },
    balance:{
        type: Number,
        required: true,
        min:5000
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
    }


}));

function validateAccount(account) {
    const schema = {
        balance: Joi.number().min(5000).required(),
        planId: Joi.ObjectId().required(),
    };
  
    return Joi.validate(account, schema);
  }
  
  exports.account = account; 
  exports.validate = validateAccount;