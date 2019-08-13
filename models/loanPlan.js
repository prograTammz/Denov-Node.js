const Joi = require('joi');
const mongoose = require('mongoose');
const LoanPlan =mongoose.model('loanPlan', new mongoose.Schema({
    type:{
        type: String,
        required: true,
    },
    interestWeekly:{
        type: Number,
        required: true
    },
    interestDaily:{
        type: Number,
        required: true
    },
    minimum:{
        type: Number,
        required: true
    },
    maximum:{
        type: Number,
        required: true
    }


}));

function validateLoanPlan(LoanPlan) {
    const schema = {
        type: Joi.string().required(),
        interestDaily: Joi.number().required(),
        interestWeekly: Joi.number().required(),
        minimum: Joi.number().required(),
        maximum: Joi.number().required()
    };
  
    return Joi.validate(LoanPlan, schema);
  }
  
  exports.LoanPlan = LoanPlan; 
  exports.validateLoanPlan = validateLoanPlan;