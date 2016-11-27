var moment = require('moment');

module.exports = function (Eventcomment) {

  Eventcomment.signOut = (user_id, event_id, cb)=> {
    Eventcomment.findOne({where: {user_id}}, (err, eventComment)=> {
      if(!eventComment || !eventComment.id){
        cb("error comment not found")
      }
      Eventcomment.destroyById(eventComment.id,(err)=>{
        if(err === null){
          cb(null,"error")
        }else{
          cb("successfully deleted")
        }
      })
    });
  }

  Eventcomment.remoteMethod(
    'delete', {
      http: {
        path: "/delete",
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
