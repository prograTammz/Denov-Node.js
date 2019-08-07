const Joi = require('joi');
const mongoose = require('mongoose');

const News = mongoose.model('news', new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: { 
    type: String, 
    required: true
  },
  date: { 
    type: Date, 
    required: true,
    default: Date.now()
  },
  author: { 
    type: String,
    required: true
  }
}));

function validateNews(News) {
  const schema = {
    title: Joi.string().required(),
    body: Joi.string().required(),
  };

  return Joi.validate(News, schema);
}

exports.News = News; 
exports.validate = validateNews;