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
  isSuperAdmin: Boolean,
  isAdmin: Boolean,
  isOfficer: Boolean,
  isBanker: Boolean,
  isSaver: Boolean,
  isLoaner: Boolean,
  isTruckerHR: Boolean,
  isTrucker: Boolean,
  isInvestor: Boolean,
  isDriver: Boolean,
  isMiner: Boolean,
  isSeller: Boolean,
  isRecruiter: Boolean
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

function validateUser(user) {
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
exports.validate = validateUser;
exports.validateLogin = validateLogin;