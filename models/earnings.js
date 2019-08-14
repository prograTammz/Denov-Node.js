const Joi = require('joi');
const mongoose = require('mongoose');
const earning =mongoose.model('earning', new mongoose.Schema({
    source:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    }
}));

function validateEarning(earning) {
    const schema = {
        source: Joi.string().required(),
        cost: Joi.number().required()
    };
  
    return Joi.validate(earning, schema);
  }
  
  exports.Earning = earning; 
  exports.validate = validateEarning;