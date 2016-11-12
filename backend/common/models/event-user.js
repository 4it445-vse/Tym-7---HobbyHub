var moment = require('moment');

module.exports = function(Eventuser) {

  Eventuser.signIn = (userId, eventId, cb)=>{
    try{
      var newEventUser = {
        created: moment().toDate(),
        resolved: moment().toDate(),
        event:eventId,
        user:userId
      }

      var eventUser = Eventuser.create(newEventUser)
        .then(()=>{
          cb(null,"You have successfully signed in!"+ userId +eventId)
        })
        .catch(()=>{
          cb("Bad data");
        })
    }
    catch(e){
      cb(e)
    }
  }

  Eventuser.signOut = (userId, eventId, cb)=>{
    cb(null,"signOut" + userId+", "+eventId)
  }

  Eventuser.remoteMethod(
    'signIn',{
      http: {
        path: "/signIn",
        verb: "post",
        errorStatus: 400
      },
      accepts:[
        {arg: "userId", type: "string"},
        {arg: "eventId", type: "string"},
      ],
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  )

  Eventuser.remoteMethod(
    'signOut',{
      http: {
        path: "/signOut",
        verb: "post",
        errorStatus: 400
      },
      accepts:[
        {arg: "userId", type: "string"},
        {arg: "eventId", type: "string"},
      ],
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  )

};
