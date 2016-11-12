/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {EventList} from '../components/EventList/EventList.js';
import {connect} from 'react-redux'

export class HomePageRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      isLoading: 0
    };
  }

  fetchEvents() {
    api('events')
      .then((response) => {
        this.setState({events: response.data});
      });
  }

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    const {events} = this.state;

    return (
      <div className="container content-container">
        <div className="center wow fadeInDown">
          <h2>Události</h2>
          {events === null ?
            <div>Loading...</div> :
            <EventList events={events}/>
          }
        </div>
      </div>
    );
  }
}

export const HomePage = connect(
  () => ({}),
  {}
)(HomePageRaw);
