'use strict';

module.exports = function (Event) {

  Event.afterRemote("create", (context, remoteMethodOutput, next) => {
    console.log("remoteMethodOutput", remoteMethodOutput)
    next();
})

Event.filter = function(test) {
  const app = require('../../server/server.js');
  return(response)
}
};
