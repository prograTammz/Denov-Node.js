let Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const transaction =mongoose.model('transaction', new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum:['withdraw','deposit']
    },
    amount:{
        type:Number,
        min: 2000,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    status:{
        type: String,
        required: true,
        enum:['pending','handled','cancelled'],
        default: 'pending'
    },
    denovId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bankAccountId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}));

function validateTransaction(transaction) {
    const schema = {
        amount: Joi.number().min(2000).required(),
        type: Joi.string().valid('withdraw','deposit').required(),
        bankAccountId: Joi.objectId().required()
    };
  
    return Joi.validate(transaction, schema);
  }
  
  exports.Transaction = transaction; 
  exports.validateTransaction = validateTransaction;