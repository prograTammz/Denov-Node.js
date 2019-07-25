const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  mongoose.connect('mongodb://admin:ANAbakrah98@127.0.0.1:27017/denov',{useNewUrlParser: true})
    .then(() => winston.info(`Connected to ${'fuckme'}...`));
}