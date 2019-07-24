const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  joinDate:{
    type:Date,
    required: true,
    default: Date.now
  },
  dBalance:{
    type:Number,
    default: 0
  },
  mainAccount:{
    type: mongoose.Schema.Types.ObjectId
  },
  isSuperAdmin:{
    type: Boolean,
    default: false
  },
  isAdmin: {
    type:Boolean,
    default: false
  },
  isOfficer: {
    type:Boolean,
    default: false
  },
  isBanker: {
    type:Boolean,
    default: false
  },
  isSaver: {
    type:Boolean,
    default: false
  },
  isLoaner: {
    type:Boolean,
    default: false
  },
  isTruckerHR: {
    type:Boolean,
    default: false
  },
  isTrucker: {
    type:Boolean,
    default: false
  },
  isInvestor: {
    type:Boolean,
    default: false
  },
  isDriver: {
    type:Boolean,
    default: false
  },
  isMiner: {
    type:Boolean,
    default: false
  },
  isSeller: {
    type:Boolean,
    default: false
  },
  isRecruiter: {
    type:Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign(
      { 
        _id: this._id,
        isSuperAdmin: this.isSuperAdmin,
        isAdmin: this.isAdmin,
        isOfficer: this.isOfficer,
        isTruckerHR: this.isTruckerHR,
        isBanker: this.isBanker,
        isTrucker: this.isTrucker,
        isSaver: this.isSaver,
        isLoaner: this.isLoaner,
        isInvestor: this.isInvestor,
        isDriver: this.isDriver,
        isMiner: this.isMiner,
        isSeller: this.isSeller,
        isRecruiter: this.isRecruiter
      }, process.env.API_KEY);
    return token;
  }

const User = mongoose.model('User', userSchema);

function validateRegister(user) {
  const schema = {
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}
function validateLogin(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

exports.User = User; 
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;