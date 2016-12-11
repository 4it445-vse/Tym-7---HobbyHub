import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';


export class EventCommentItem extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.state = {
      eventComment: null
    }
  }


  render() {
    const { eventComment } = this.props;
    const { user, created, text, id } = eventComment;

    return (
      <div className="media comment_section">
          <div className="pull-left post_comments">
              <a href="#"><img src={'/' + process.env.PUBLIC_URL + 'images/avatar.png'} className="img-circle" alt="" /></a>
          </div>
          <div className="media-body post_reply_comments">
              <span className="comment-name">{user.username}</span>
              <span className="comment-time pull-right">{moment(created).format("HH:mm (DD. MMMM YYYY)")}</span>
              <p>{text}</p>
          </div>
      </div>
    );
  }
}
