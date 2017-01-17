import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import {EventCommentItem} from './EventCommentItem'

export class EventCommentList extends Component {

  constructor(props) {
    super(props);
    this.isRemovable = this.isRemovable.bind(this);
  }

  /**
  Returns true if EventComment is removable by current user.
  */
  isRemovable(commentUserId) {
    const {authorId, userId} = this.props;
    return (userId == commentUserId || userId == authorId);
  }

  render() {
    const {eventComments, fetchComments, userId} = this.props;
    return (
      <div>
        {!eventComments?
          ""
          :
          eventComments.map(eventComment =>
            <EventCommentItem eventComment={eventComment} key={eventComment.id} fetchComments={fetchComments} userId={userId} isRemovable={this.isRemovable(eventComment.user_id)}/>
          )
        }
      </div>
    );
  }
}
