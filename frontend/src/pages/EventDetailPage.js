/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';

export class EventDetailPage extends Component {
  render() {
    const {event} = this.props.params
    return (
      <div>
        <h1>Detail of given event: {event} </h1>
      </div>
    );
  }
}
