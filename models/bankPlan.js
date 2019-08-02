const Joi = require('joi');
const mongoose = require('mongoose');
const bankPlan =mongoose.model('bankPlan', new mongoose.Schema({
    interest:{
        type: Number,
        required: true
    },
    durationDays:{
        type: Number,
        required:true
    },
    breakFees:{
        type: Number,
        required:true
    },
    bonus:{
        type: Number,
        required:true,
        default: 0
    },
    minimum:{
        type: Number,
        required: true,
        default:0
    },
    isCompound:{
        type: Boolean,
        required: true
    },
    deducationRate:{    
        type: Number,
        required:true,
        default: 0
    },
    allowance:{
        type: Number,
        required: true,
        default: 1
    }
}));

function validateBankPlan(bankPlan) {
    const schema = {
        interest: Joi.number().required(),
        durationDays: Joi.number().required(),
        breakFees: Joi.number().required(),
        bonus : Joi.number().required(),
        minimum: Joi.number().required(),
        isCompound: Joi.boolean().required(),
        deducationRate: Joi.number().required(),
        allowance: Joi.number().required()
    };
  
    return Joi.validate(bankPlan, schema);
  }
  
  exports.bankPlan = bankPlan; 
  exports.validate = validateBankPlan;