var moment = require('moment');

module.exports = function (Eventcomment) {

  Eventcomment.delete = (user_id, comment_id, cb)=> {
    Eventcomment.findOne({where: {id: comment_id}, include: ["event"]}, (err, eventComment)=> {
      if(!eventComment || !eventComment.id){
        cb(new Error("error comment not found"));
        return;
      }
      //check if user is owner of event or owner of comment
      if (eventComment.user_id == user_id || (eventComment.event && eventComment.event().author_id == user_id)) {
        Eventcomment.destroyById(eventComment.id,(err)=>{
          if(err === null){
            cb(null, "successfully deleted")
          }else{
            cb(new Error("error"))
          }
        });
        return;
      }

      cb(new Error("error cannot delete comments of others"));
    });
  };

  Eventcomment.remoteMethod(
    'delete', {
      http: {
        path: "/delete",
        verb: "post",
        errorStatus: 400
      },
      accepts: [
        {arg: "user_id", type: "number"},
        {arg: "comment_id", type: "number"}
      ],
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  )

};
