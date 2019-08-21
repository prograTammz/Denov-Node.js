const express = require('express');
const winston = require('winston');
const app = express();
let  server = require('http').createServer(app);
let io = require('socket.io')(server)

require('./startup/db')();
require('./startup/routes')(app);


const roulette = io.of('/roulette')
roulette.on("connection", socket => {
    require('./sockets/roulette')(socket,roulette);
  });

const port = process.env.PORT || 8000;
server.listen(port, () => winston.info(`Listening on port ${port}...`));
