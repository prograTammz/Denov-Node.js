const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
  let dbPass = process.env.DB_PASS
  mongoose.connect(`mongodb://admin:${dbPass}@127.0.0.1:27017/denov?authSource=admin`,{useNewUrlParser: true})
    .then(() => winston.info(`Connected to ${'fuckme'}...`));
}