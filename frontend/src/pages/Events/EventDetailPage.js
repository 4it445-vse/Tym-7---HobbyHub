/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../../api.js';
import moment from 'moment';
import {EventSignIn} from '../../components/EventList/EventSignIn'
import {EventAddComment} from '../../components/EventList/EventAddComment'
import {GoogleMap} from '../../components/GoogleMaps/GoogleMap'
import {EventCommentList} from '../../components/EventList/EventCommentList'

export class EventDetailPage extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.state = {
      event: null
    };
  }

  fetchEventDetailData() {
    const {eventId} = this.props.params;
    const self = this;
    api('events/' + eventId, {"params": {"filter":{"include": "users"}}})
      .then((response)=> {
        self.setState({
          event: response.data
        })
      }).catch((e)=> {
        console.warn(eventId,e);
    })
  }

  componentDidMount() {
    this.fetchEventDetailData();
    this.fetchComments();
  }

  getCoordinates() {
    if (this.state.event) {
      return {
        latitude: this.state.event.latitude,
        longitude: this.state.event.longitude
      }
    }
  }

  getSignedUsersCount(event) {
    var count = 0;
    for (var key in event.users) {
      if (event.users[key].status === 'confirmed') {
        count++;
      }
    }

    return count;
  }

  fetchComments() {
    const {eventId} = this.props;
    console.log('eID', eventId);
    api('eventcomments', {"params": {"filter":{"where":{"event_id": eventId}, "include": "user" }}})
      .then((response)=>{
        const eventComments = response.data;
        this.setState({
          ...this.state,
          eventComments: eventComments
        })
      })
      .catch((err)=>{
        console.warn(err)
      })
  }

  render() {
    const {event, eventComments} = this.state;
    const coordinates = this.getCoordinates();
    return (
      <div className="container content-container">

        {event === null ?
          <h1>Načítám...</h1> :

          <div>

            <div className="col-md-4">
            <a className="btn btn-default" href="/">Zpět na výpis</a>

            </div>

            <div className="col-md-8">
              <h1 className="pull-left">{event.name}</h1>
            </div>
            <div className="row"></div>

            <div className="col-xs-12 col-md-4">
              {event.picture ?
                <img className="col-xs-12 col-md-12" src={event.picture} alt="{name}"/> :
                ''
              }
              <div className="col-md-12">
                {/*<GoogleMap coordinates={coordinates}/> <EventAddComment eventId={event.id}/>*/}
              </div>
            </div>

            <div className="col-xs-12 col-md-8">
              <div className="col-md-12">
                <div className="col-md-12"><b>Autor</b> Ferda</div>
                <div className="col-md-12"><b>Datum</b> {moment(event.date).format("DD MMMM YYYY")}</div>
                <div className="col-md-12"><b>Kapacita</b> {this.getSignedUsersCount(event)} / {event.capacity}</div>
                <div className="col-md-12">
                  <label><b>Kategorie</b></label>
                  <div className="col-md-12">
                    <ul className="tag-cloud">
                      {event.tags.split(",").map((tag, index)=>
                        <li key={index}><a className="btn btn-xs btn-primary" href="#">{tag}</a></li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="">{event.description}</div>
                </div>
              </div>

              <div className="col-md-12">
                <EventSignIn eventId={event.id} isFull={event.capacity <= this.getSignedUsersCount(event)}/>
              </div>

              <EventCommentList eventComments={eventComments} />

                <div id="contact-page clearfix">
                  <div className="message_heading">
                      <h4>Přidat komentář</h4>
                  </div>

                  <EventAddComment eventId={event.id}/>

                </div>

            </div>
          </div>
        }
      </div>
    );
  }
}
