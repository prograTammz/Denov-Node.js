const Joi = require('joi');
const mongoose = require('mongoose');
const Item =mongoose.model('Item', new mongoose.Schema({
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

function validateItem(item) {
    const schema = {
        type: Joi.string().required(),
        interestDaily: Joi.number().required(),
        interestWeekly: Joi.number().required(),
        minimum: Joi.number().required(),
        maximum: Joi.number().required()
    };
  
    return Joi.validate(item, schema);
  }
  
  exports.Item = Item; 
  exports.validate = validateItem;