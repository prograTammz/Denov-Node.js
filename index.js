const express = require('express');
const winston = require('winston');
const app = express();

const users = require('./routes/users');

require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 80;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;