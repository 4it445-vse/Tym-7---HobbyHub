'use strict';

const removeDiacritics = require('../helpers/removeDiacritics')

module.exports = function (Event) {

  Event.afterRemote("create", (context, remoteMethodOutput, next) => {
    console.log("remoteMethodOutput", remoteMethodOutput)
    next();
  })

  Event.filter = (dateFrom, dateTo, checkboxStatus, checkboxCapacity, name, tags, cb) => {
    Event.find({
      where: {
        and: [
          {date: {gt: dateFrom}},
          {date: {lt: dateTo}}
        ]
      }
    }, (error, Events) => {
      if (error) cb('sorry')
      const nameTrimmed = name.trim()
      const tagsTrimmed = tags.trim()
      const EventsFiltered = Events
        .filter(event => {
          if(tagsTrimmed.length===0) return true;
          const tagsArray = tags.split(',');
          for (let tag of tagsArray) {
            console.log("TAGS",event.tags.indexOf(tag))
            console.log("TAGS",event.tags, tag)
            if (event.tags.indexOf(tag) == -1) {
              return false; //skip
            }
          }
          return true; //all tags are presented in Event
        })
        .filter(event => {
          if(nameTrimmed.length===0) return true;
          const noSpecialCharsEventName = removeDiacritics(event.name);
          const noSpecialCharsSearchName = removeDiacritics(name);

          console.log("SPECIAL CHARS",noSpecialCharsEventName,noSpecialCharsSearchName)
          return noSpecialCharsEventName.indexOf(noSpecialCharsSearchName) >= 0;
        })

      console.log(EventsFiltered);
      cb(null, EventsFiltered);
    })
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
        {arg: "name", type: "string"},
        {arg: "tags", type: "string"},
      ],
      returns: {
        arg: 'events',
        type: 'string'
      }
    }
  )
};
