import React, { Component } from 'react';

export class EventListItem extends Component {
  render() {
    const { event } = this.props;
    const { tags, date } = event;
    return (
      <div className="event">
        <h2>
          Event
        </h2>
        <p>tags: <span className="price">{tags}</span></p>
        <p>{date}</p>
      </div>
    );
  }
}


