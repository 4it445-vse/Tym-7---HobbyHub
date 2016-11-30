import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import {EventCommentItem} from './EventCommentItem'

export class EventCommentList extends Component {
  render() {
    const {eventComments} = this.props;
    return (
      <div>
        <h2>Komentáře</h2>
        {eventComments.map(eventComment =>
          <EventCommentItem eventComment={eventComment} key={eventComment.id}/>
        )}
      </div>
    );
  }
}
