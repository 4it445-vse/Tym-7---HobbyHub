import React, {Component} from 'react';

import {EventListItem} from './EventListItem.js';

export class EventList extends Component {
  render() {
    const {events, userId, signedEventIds} = this.props;
    return (

            <div className="events">
              {events.map(event =>
                <EventListItem event={event} key={event.id} userId={userId} signedEventIds={signedEventIds}/>
              )}
            </div>

    );
  }
}
