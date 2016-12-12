'use strict';

const removeDiacritics = require('../helpers/removeDiacritics');

module.exports = function (Event) {

  Event.afterRemote("create", (context, remoteMethodOutput, next) => {
    next();
  });

  Event.filter = (dateFrom, dateTo, checkboxStatus, checkboxCapacity, name, tags, userId, cb) => {
    Event.find({
      where: {
        and: [
          {date: {gt: dateFrom}},
          {date: {lt: dateTo}}
        ]
      },
      include: "users"
    }, (error, Events) => {
      if (error) cb('sorry');
      const EventsFiltered = Events
        .filter(event => {
          //FILTERING BY TAGS
          const tagsTrimmed = tags.trim();
          if(tagsTrimmed.length===0) return true;
          const tagsArray = tags.split(',');
          for (let tag of tagsArray) {
            if (event.tags.indexOf(tag) == -1) {
              return false; //skip
            }
          }
          return true; //all tags are presented in Event
        })
        .filter(event => {
          //FILTERING BY NAME
          const nameTrimmed = name.trim();
          if(nameTrimmed.length===0) return true;
          const noSpecialCharsEventName = removeDiacritics(event.name);
          const noSpecialCharsSearchName = removeDiacritics(name);
          return noSpecialCharsEventName.indexOf(noSpecialCharsSearchName) >= 0;
        })
        .filter(event=>{
          //FILTERING BY STATUS (I AM LOGGED IN)
          const checkboxStatusBool = Boolean(checkboxStatus);
          if(!userId || !checkboxStatusBool) return true;
          const users = event.users();
          for(var i = 0; i < users.length; i++) {
            if(users[i].user_id === userId){
                  return true; //I am logged to current event
                }
          }
          return false; // No I am not logged into current event
        })
        .filter(event=>{
          // FILTERING BY FREE CAPACITY
          const checkboxCapacityBool = Boolean(checkboxCapacity);
          if(checkboxCapacityBool===false) return true;
          return event.users.length < event.capacity;
        });

      cb(null, EventsFiltered);
    })
  };

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
        {arg: "name", type: "string"},
        {arg: "tags", type: "string"},
        {arg: "userId", type: "number"}
      ],
      returns: {
        arg: 'events',
        type: 'string'
      }
    }
  )
};
