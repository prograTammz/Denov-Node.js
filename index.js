const express = require('express');
const winston = require('winston');
const cookieParser = require('cookie-parser')
const app = express();

const users = require('./routes/users');

require('./startup/db')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));


app.use(express.json());
app.use(cookieParser());
app.use('/api/users', users);
module.exports = server;