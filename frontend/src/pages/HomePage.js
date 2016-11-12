/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {EventList} from '../components/EventList/EventList.js';
import {connect} from 'react-redux'
import {addEvent} from '../components/EventList/actions.js';
import {GoogleMap} from '../components/GoogleMaps/GoogleMap'

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
      "attending": 2,
      "latitude": "50.0831937",
      "longitude": "14.4331146",
      "location": "Praha - Hlavní nádraží",
      "picture": "images/avatar.png",
      "created": "2016-10-29T00:00:00.000Z",
      "date": "2016-10-29T00:00:00.000Z",
      "tags": "tenis, sport, ferda",
      "status": "Přihlášen",
      "author_id": 1
    });
    //slowing down script because it is faster than db
    setTimeout(() => {
      this.fetchEvents()
    }, 250);
  }

  render() {
    const {events} = this.state;

    return (
      <div className="container content-container">
        <div className="center wow fadeInDown">
          <h2>Události</h2>

          /**
           * GOOGLE MAP COMPONENT USAGE
           */
          <div id="google-map"></div>
          <GoogleMap mapElement={document.getElementById('google-map')}/>


          <button
            onClick={() => this.onEventAdd()}
            type="button"
            className="btn btn-success"
          >
                    <span
                      className="glyphicon glyphicon-plus"
                      aria-hidden="true">
                    </span> Přidat událost
          </button>
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
  {addEvent}
)(HomePageRaw);
