var moment = require('moment');

module.exports = function (Eventuser) {

  Eventuser.signOut = (user_id, event_id, cb)=> {
    Eventuser.findOne({where: {user_id}}, (err, eventUser)=> {
      if (!eventUser || !eventUser.id) {
        cb(new Error("Do not cheat!"))
        return;
      }
      Eventuser.destroyById(eventUser.id, (err)=> {
        if (err === null) {
          cb(null,"deleted")
        } else {
          cb(new Error("Do not cheat!"))
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
          next(error);
        }else{
          next();
        }
      });
    }else{
      next();
    }
  })


  Eventuser.changeStatus = (new_event_status, event_id, cb)=> {
    Eventuser.updateAll({id:event_id},{status:new_event_status},(err,info)=>{
      console.log(err,info)
      if(err){
        cb(new Error("Do not cheat!"))
      }else{
        cb(null,"succes changed");
      }
    })
  }

  Eventuser.remoteMethod(
    'changeStatus', {
      http: {
        path: "/changeStatus",
        verb: "post",
        errorStatus: 400
      },
      accepts: [
        {arg: "new_event_status", type: "string", required: true},
        {arg: "event_id", type: "number", required: true},
      ],
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  )

};
