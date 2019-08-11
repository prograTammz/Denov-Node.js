const Joi = require('joi');
const mongoose = require('mongoose');

const types = ['transaction','account','eservice','investment','breaking'];

const fees =mongoose.model('fees', new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true,
    },
    issueDate:{
        type: Date,
        required: true,
        default: Date.now()
    },
    type:{
        type: String,
        enum: types,
        required: true
    }


}));

function validateFees(fees) {
    const schema = {
        name: Joi.string().required(),
        cost: Joi.number().required(),
        type: Joi.string().valid(types).required()
    };
  
    return Joi.validate(fees, schema);
  }
  
  exports.Fees = fees; 
  exports.validate = validateFees;