var moment = require('moment');

module.exports = function (Eventuser) {

  Eventuser.signOut = (user_id, event_id, cb)=> {
    Eventuser.findOne({where: {user_id}}, (err, eventUser)=> {
      if (!eventUser || !eventUser.id) {
        cb("error user not found")
        return;
      }
      Eventuser.destroyById(eventUser.id, (err)=> {
        if (err === null) {
          cb(null, "error")
        } else {
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


  Eventuser.beforeRemote("create", (context, remoteMethodOutput, next) => {
    console.log("remoteMethodOutput -- ", context.req.body)
    if(context && context.req && context.req.body.user_id && context.req.body.event_id){
      Eventuser.findOne({
          where: {
            user_id: context.req.body.user_id,
            event_id: context.req.body.event_id
          }
        },(err, EventUser)=>{
        if(EventUser && EventUser.id){
          const error = new Error();
          error.status = 403;
          error.message = 'You have already requested that event';
          next(error)
        }
      });
      next();
    }
  })

};
