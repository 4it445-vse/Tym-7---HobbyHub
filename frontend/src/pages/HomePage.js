/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {EventList} from '../components/EventList/EventList.js';
import {connect} from 'react-redux'
import {addEvent} from '../components/EventList/actions.js';

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

  onEventAdd() {
    const {addEvent} = this.props;
    //demo data for event adding
    addEvent({
      "name": "Tenis - dvojhra s Ferdou",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet gravida elit auctor tristique. Vestibulum tincidunt congue tortor, in laoreet odio tincidunt quis. Phasellus in enim dignissim, rhoncus odio at, venenatis ligula. Etiam vestibulum odio et tempus suscipit. Donec sit amet odio non metus ullamcorper congue eget in erat. Vivamus sollicitudin eleifend dolor sit amet congue. Maecenas eget mattis nisi, eu sagittis elit. Vivamus interdum tristique lorem id porttitor. Suspendisse sodales mauris a mauris posuere, eget bibendum odio mollis. Donec aliquam eu lacus eget rhoncus. Vivamus lectus sapien, maximus sed dui vitae, dignissim venenatis ante. Integer vel auctor turpis.",
      "capacity": 10,
      "latitude": "50.0831937",
      "longitude": "14.4331146",
      "location": "Praha - Hlavní nádraží",
      "picture": null,
      "created": "2016-10-29T00:00:00.000Z",
      "date": "2016-10-29T00:00:00.000Z",
      "tags": "tenis, sport, ferda"
    });
    //slowing down script because it is faster than db
    setTimeout(() => {
      this.fetchEvents()
    }, 250);
  }

  render() {
    const {events} = this.state;
    return (
      <div className="homepage">
        <section id="recent-works">
          <div className="container">
            <div className="center wow fadeInDown">
              <button
                onClick={() => this.onEventAdd()}
                type="button"
                className="btn btn-success"
              >
                    <span
                      className="glyphicon glyphicon-plus"
                      aria-hidden="true">
                    </span> Add Event
              </button>
              <h2>Eventy</h2>
              <div className="lead">
                {events === null ?
                  <div>Loading...</div> :
                  <EventList events={events}/>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export const HomePage = connect(
  () => ({}),
  {addEvent}
)(HomePageRaw);
