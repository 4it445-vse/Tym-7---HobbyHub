/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';

export class EventDetailPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      event: null
    }
  }

  fetchEventDetailData() {
    const {eventId} = this.props.params;
    api('events/' + eventId)
      .then((response)=> {
        this.setState({event: response.data})
      }).catch(()=> {

    })
  }

  componentDidMount() {
    this.fetchEventDetailData()
  }

  render() {
    const {event} = this.state
    return (
      <div>
        {event == null ?
          <h1>Načítám...</h1> :
          <h1>Detail of given event: {event.name} </h1>
        }
      </div>
    );
  }
}
