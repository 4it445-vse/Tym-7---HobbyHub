/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../../api.js';
import moment from 'moment';
import {EventSignIn} from '../../components/EventList/EventSignIn'
import {EventAddComment} from '../../components/EventList/EventAddComment'
import {EventCommentList} from '../../components/EventList/EventCommentList'
import {getUserId,isLoggedIn} from '../../components/Login/reducers.js';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import deepEqual from 'deep-equal';
import {ListOfUsersForm} from '../../components/EventDetailAdmin/ListOfUsersForm'

export class EventDetailPageRaw extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.state = {
      event: null
    };
    this.fetchComments = this.fetchComments.bind(this);
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
    //fetch data
    this.fetchEventDetailData();
    this.fetchComments()
    //set comments polling
    setInterval(function() {
      this.fetchComments();
    }.bind(this), 5000);
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
    return this.state.event.users.reduce((prev, user)=>{
      return user.status==="accepted" ? prev + 1 : prev;
    },0)
  }

  isEventCreatedByMe(event) {
    return (event && event.user && (event.user.id === this.props.getUserId))
  }

  fetchComments() {
    const {eventId} = this.props.params;
    api('eventcomments', {"params": {"filter": {"where": {"event_id": eventId}, "include": ["user"], "order": "created desc"}}})
      .then((response) => {
        console.log(response);
        const eventComments = response.data;
        //This fixes console warning
        if (deepEqual(this.state.eventComments, eventComments) === false) {
          this.setState({
            ...this.state,
            eventComments: eventComments
          })
        }else{
          console.log("no new comments")
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  render() {
    const {event, eventComments} = this.state;
    const {isLoggedIn} = this.props;
    const coordinates = this.getCoordinates();
    const linkToProfile = (event && event.user)? `/profile/${event.user.id}`:``;
    const linkToEditEvent = (event)?  `/events/edit/${event.id}` : '';

    return (
      <div className="container content-container">

        {event === null ?
          <h1>Načítám...</h1> :

          <div>


            <div className="event-name-wrap">
                    {event.picture ?
                      <img className="" src={event.picture} alt="{name}"/> :
                      ''
                    }
              <div className="event-name-overlay">
                    <div className="col-md-12 top-buffer">
                      <a className="btn btn-default pull-right event-back" href="/">Zpět na výpis</a>
                    </div>
                <div className="event-name-inner">

                  <div className="col-xs-12 col-md-12">
                      <h1 className="pull-left h1-height">{event.name}</h1>
                  </div>
                  <div className="row"></div>

                  <div className="col-xs-12 col-md-12">
                    <ul className="tag-cloud col-md-12">
                      {event.tags.split(",").map((tag, index)=>
                        <li className="float" key={index}><a className="btn btn-xs btn-primary" href="#">{tag}</a></li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="row top-buffer"></div>




            <div className="col-xs-12 col-md-3">
              <div className="col-md-12">
                Pořádá <b>Ferda</b>
              </div>
              <div className="col-md-12">
                Datum <b>{moment(event.date).format("DD. MMMM YYYY")}</b>
              </div>
              <div className="col-md-12">
                Počet míst <b>{this.getSignedUsersCount()} / {event.capacity}</b>
              </div>
              <div className="col-md-12">
              </div>
              <div className="col-md-12">
                {/*<GoogleMap coordinates={coordinates}/> <EventAddComment eventId={event.id}/>*/}

              </div>

              {
                this.isEventCreatedByMe(event)
                  ?
                  <div className="col-md-7">

                  </div>
                  :
                  <div className="col-md-2">
                    <EventSignIn eventId={event.id} isFull={event.capacity <= this.getSignedUsersCount()}/>
                  </div>
              }

            </div>



            <div className="col-xs-12 col-md-9">

              <div className="event-description">{event.description}</div>
                  {
                    this.isEventCreatedByMe(event)
                      ?
                      <div className="col-md-12">
                        <ListOfUsersForm eventId={event.id}/>
                      </div>
                      :
                      <div>

                      </div>
                  }

                <div className="row"></div>

                  {isLoggedIn &&
                  <div className={this.isEventCreatedByMe(event)?"col-md-12":"ol-md-12"}>
                    <EventCommentList eventComments={eventComments}/>
                    <div>
                      <EventAddComment eventId={event.id} fetchComments={this.fetchComments}/>
                    </div>
                  </div>}

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
    isLoggedIn: isLoggedIn(login)
  };
}

export const EventDetailPage = connect(
  mapStateToProps,
  {}
)(EventDetailPageRaw);
