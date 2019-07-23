const express = require('express');
const winston = require('winston');
const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));


app.use(express.json());
app.use('/api/users', users);
module.exports = server;