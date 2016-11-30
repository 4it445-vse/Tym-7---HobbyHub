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
              <h3>{user.username}</h3>
              <h4>{moment(created).format("DD MMMM YYYY    HH:mm")}</h4>
              <p>{text}</p>
          </div>
      </div>
    );
  }
}
