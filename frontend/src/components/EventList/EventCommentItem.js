import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import api from '../../api.js';


export class EventCommentItem extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      eventComment: null
    }
  }

  handleRemove(event) {
    const {eventComment, fetchComments, userId} = this.props;
    const {id} = eventComment;
    api.post('eventcomments/delete', {"user_id": userId, "comment_id": id})
        .then((response)=> {
          fetchComments();
        }).catch((e)=> {
          console.log('error occurred during comment removal');
        })
  }

  render() {
    const {eventComment, isRemovable} = this.props;
    const {user, created, text} = eventComment;
    const linkToProfile = `profile/${user.id}`;

    return (
      <div className="media comment_section">
        <div className="pull-left post_comments">
          <Link to={linkToProfile}> <img src={'/' + process.env.PUBLIC_URL + 'images/avatar.png'} className="img-circle" alt=""/></Link>
        </div>
        <div className="media-body post_reply_comments">
        <span className="comment-name">{user.username}</span>

          {isRemovable && <button onClick={this.handleRemove} type="button" className="btn btn-xs btn-danger pull-right">
          <span className="glyphicon glyphicon-trash"></span>&nbsp;
          </button>}

        <span className="comment-time pull-right">{moment(created).format("HH:mm (DD. MMMM YYYY)")}</span>
        <p>{text}</p>
        </div>
      </div>
    );
  }
}
