var moment = require('moment');

module.exports = function (Eventuser) {

  Eventuser.signOut = (user_id, event_id, cb)=> {
    Eventuser.findOne({where: {user_id}}, (err, eventUser)=> {
      if(!eventUser || !eventUser.id){
        cb("error user not found")
      }
      Eventuser.destroyById(eventUser.id,(err)=>{
        if(err === null){
          cb(null,"error")
        }else{
          cb("successfully deleted")
        }
      })
    });
  }

  Eventuser.remoteMethod(
    'signOut', {
      http: {
        path: "/signOut",
        verb: "post",
        errorStatus: 400
      },
      accepts: [
        {arg: "user_id", type: "number"},
        {arg: "event_id", type: "number"},
      ],
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  )

};
