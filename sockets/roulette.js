let io = require('../index');
const _ = require('lodash');
var numUsers = 0;

module.exports = function(socket,roulette){
  socket.emit("wheel", _.random(0,36))
  socket.on("connected", data =>{
  }),
  socket.on("spin", data=>{
    roulette.emit("wheel", _.random(0,36))
  })
};