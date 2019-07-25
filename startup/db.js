const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  mongoose.connect('mongodb://admin:ANAbakrah98@host:port/',{useNewUrlParser: true})
    .then(() => winston.info(`Connected to ${'fuckme'}...`));
}