import React, {Component} from 'react';

import {EventListItem} from './EventListItem.js';

export class EventList extends Component {
  render() {
    const {events} = this.props;

    return (
      <section id="portfolio">
        <div className="row">
          <div className="portfolio-items">
            <div className="events">
              {events.map(event =>
                <EventListItem event={event} key={event.id}/>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
