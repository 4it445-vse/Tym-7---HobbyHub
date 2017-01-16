'use strict';
var moment = require('moment');

const removeDiacritics = require('../helpers/removeDiacritics');

module.exports = function (Event) {

  Event.afterRemote("create", (context, remoteMethodOutput, next) => {
    next();
  });

  Event.filter = (
    dateFrom,
    dateTo,
    checkboxStatus,
    checkboxCapacity,
    name,
    tags,
    signedUserId,
    showPast,
    authorId,
    preferedTags,
    cb) => {

    var searchArray = {};
    searchArray['include'] = ['users', 'user'];

    if (!Boolean(showPast) || dateFrom || dateTo) {
      searchArray['where'] = {and: []};
    }

    if (!Boolean(showPast)) {
      searchArray['where']['and'].push({date: {gt: moment()}});
    }

    if (dateFrom) {
      searchArray['where']['and'].push({date: {gt: dateFrom}});
    }

    if (dateTo) {
      searchArray['where']['and'].push({date: {lt: dateTo}});
    }

    Event.find(
    searchArray
    , (error, Events) => {
      if (error) cb('sorry');
      const EventsFiltered = Events
        .filter(event => {
          //FILTERING BY TAGS
          // event matches if it contains ALL selected tags
          const tagsTrimmed = tags.trim();
          if (tagsTrimmed.length===0) return true;
          const tagsArray = tags.split(',');
          for (let tag of tagsArray) {
            if (event.tags.indexOf(tag) == -1) {
              return false; //skip
            }
          }
          return true; //all tags are presented in Event
        })
        .filter(event => {
          //FILTERING BY PREFERED TAGS
          // event matches if it contains ANY of the selected tags
          if (!preferedTags) { // if no prefered tags are set, all events are accepted
            return true;
          }
          const preferedTagsTrimmed = preferedTags.trim();
          if (preferedTagsTrimmed.length===0) return true; // not filtering by preference
          const preferedTagsArray = preferedTags.split(',');

          for (let preferedTag of preferedTagsArray) {
            if (event.tags.indexOf(preferedTag) != -1) {
              return true; // a prefered tag found on event
            }
          }
          return false; // no prefered tag is present on event
        })
        .filter(event => {
          // filter by authorId
          const user = event.user();
          if (authorId && user.id !== authorId) {
            return false;
          }
          return true;
        })
        .filter(event => {
          //FILTERING BY NAME
          const nameTrimmed = name.trim();
          if (nameTrimmed.length===0) return true;
          const noSpecialCharsEventName = removeDiacritics(event.name);
          const noSpecialCharsSearchName = removeDiacritics(name);
          return noSpecialCharsEventName.indexOf(noSpecialCharsSearchName) >= 0;
        })
        .filter(event=>{
          //FILTERING BY STATUS (I AM LOGGED IN)
          const checkboxStatusBool = Boolean(checkboxStatus);
          if (!signedUserId || !checkboxStatusBool) return true;
          const users = event.users();
          for(var i = 0; i < users.length; i++) {
            if (users[i].user_id === signedUserId){
                  return true; //I am logged to current event
                }
          }
          return false; // No I am not logged into current event
        })
        .filter(event=>{
          // FILTERING BY FREE CAPACITY
          const checkboxCapacityBool = Boolean(checkboxCapacity);
          if (checkboxCapacityBool===false) return true;
          return event.users().length < event.capacity;
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
        {arg: "signedUserId", type: "any"},
        {arg: "showPast", type: "any"},
        {arg: "authorId", type: "any"},
        {arg: 'preferedTags', type: "any"}
      ],
      returns: {
        arg: 'events',
        type: 'string'
      }
    }
  )
};
