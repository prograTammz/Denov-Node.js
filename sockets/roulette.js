let io = require('../index');
const _ = require('lodash');
var numUsers = 0;

module.exports = function(socket,roulette){
  roulette.emit("spinning",{});
  setTimeout(()=>{
    let land = _.random(0,36)
      console.log(land);
      roulette.emit("wheel", land );
  },2000)
};