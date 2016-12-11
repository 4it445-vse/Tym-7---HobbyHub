'use strict';

module.exports = function (Event) {

  Event.afterRemote("create", (context, remoteMethodOutput, next) => {
    console.log("remoteMethodOutput", remoteMethodOutput)
    next();
  })

  Event.filter = (dateFrom, dateTo, checkboxStatus, checkboxCapacity, cb)=> {
    Event.find({
      where:{
        and:[
          { date: {gt: dateFrom} },
          { date: {lt: dateTo}}
        ]
      }
    }, (error, Event) =>{
      console.log(error)
      console.log(Event)
    })
    cb(null,'joo filter')
  }

  Event.remoteMethod(
    'filter', {
      http: {
        path: "/filter",
        verb: "post",
        errorStatus: 400
      },
      accepts: [
        {arg: "dateFrom", type: "date"},
        {arg: "dateTo", type: "date"},
        {arg: "checkboxStatus", type: "any"},
        {arg: "checkboxCapacity", type: "any"},
      ],
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  )
};
