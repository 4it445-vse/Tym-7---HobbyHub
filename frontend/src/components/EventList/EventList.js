import React, { Component } from 'react';

import { EventListItem } from './EventListItem.js';

export class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <div className="events">
        {events.map(event =>
          <EventListItem event={event} key={event.id}/>
        )}
      </div>
    );
  }
}
