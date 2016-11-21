/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {EventList} from '../components/EventList/EventList.js';
import {connect} from 'react-redux'
import { Link } from 'react-router'

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

            <div className="row">
              <div className="col-xs-8 col-md-8">
                <h2>Události</h2>
              </div>

              <div className="col-xs-4 col-md-4">

                <Link className="pull-right btn btn-default"  to="/events/add">Vytvořit událost</Link>
              </div>
            </div>

        <div className="center wow fadeInDown">
          {events === null ?
            <div>Loading...</div> :
            <div>
              <EventList events={events}/>
            </div>
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
