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
import {getUserId} from '../../components/Login/reducers.js';
import {connect} from 'react-redux'
import {ListOfUsersForm} from '../../components/EventDetailAdmin/ListOfUsersForm'

export class EventDetailPageRaw extends Component {

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
    api('events/' + eventId, {"params": {"filter": {"include": ["users", "user"]}}})
      .then((response)=> {
        self.setState({
          event: response.data
        })
      }).catch((e)=> {
      console.warn(eventId, e);
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

  getSignedUsersCount() {
    return this.state.event.users.reduce((prev, current)=> {
      if (current.status === 'accepted') return prev + 1
    }, 0);
  }

  isEventCreatedByMe(event) {
    return (event && event.user && (event.user.id === this.props.getUserId))
  }

  fetchComments() {
    const {eventId} = this.props.params;
    console.log('eID', eventId);
    api('eventcomments', {"params": {"filter": {"where": {"event_id": eventId}, "include": ["user", "users"]}}})
      .then((response)=> {
        const eventComments = response.data;
        this.setState({
          ...this.state,
          eventComments: eventComments
        })
      })
      .catch((err)=> {
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
            <div className="row first-header-row">

              <div className="col-md-4">
                <a className="btn btn-default" href="/">Zpět na výpis</a>

              </div>

              <div className="col-md-12">
                <h1 className="text-center">{event.name}</h1>
              </div>

              <div className="col-xs-12 col-md-4">
                {event.picture ?
                  <img className="col-xs-12 col-md-12" src={event.picture} alt="{name}"/> :
                  ''
                }
                <div className="col-md-12">
                  {/*<GoogleMap coordinates={coordinates}/> <EventAddComment eventId={event.id}/>*/}

                </div>
              </div>

              <div className="col-xs-12 col-md-5">
                <div className="col-md-12">
                  <div className="col-md-12"><b>Autor</b> Ferda</div>
                  <div className="col-md-12"><b>Datum</b> {moment(event.date).format("DD MMMM YYYY")}</div>
                  <div className="col-md-12"><b>Kapacita</b> {this.getSignedUsersCount()} / {event.capacity}</div>

                  <div className="col-md-12">
                    <div className="">{event.description}</div>
                  </div>
                </div>
              </div>

              <div className="col-md-2">
                <label><b>Kategorie</b></label>
                <div className="col-md-12">
                  <ul className="tag-cloud col-md-12">
                    {event.tags.split(",").map((tag, index)=>
                      <li className="col-md-12" key={index}><a className="btn btn-xs btn-primary" href="#">{tag}</a></li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row second-row-detail-page">
              <div className="col-md-7">
                {
                  this.isEventCreatedByMe(event)
                    ?
                    <ListOfUsersForm eventId={event.id}/>
                    :
                    <EventSignIn eventId={event.id} isFull={event.capacity <= this.getSignedUsersCount()}/>
                }
              </div>

              <div className="col-md-5">
                <EventCommentList eventComments={eventComments}/>

                <div>
                  <EventAddComment eventId={event.id}/>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {login} = state;
  return {
    getUserId: getUserId(login),
  };
}

export const EventDetailPage = connect(
  mapStateToProps,
  {}
)(EventDetailPageRaw);

