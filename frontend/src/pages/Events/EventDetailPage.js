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
    const linkToProfile = (event && event.user)? `profile/${event.user.id}`:``;

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
                  <div className="col-md-12"><b>Autor</b> <Link to={linkToProfile}>{event.user.username}</Link></div>
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
                {
                  this.isEventCreatedByMe(event)
                    ?
                    <div className="col-md-7">
                      <ListOfUsersForm eventId={event.id}/>
                    </div>
                    :
                    <div className="col-md-2">
                      <EventSignIn eventId={event.id} isFull={event.capacity <= this.getSignedUsersCount()}/>
                    </div>
                }

              {isLoggedIn &&
              <div className={this.isEventCreatedByMe(event)?"col-md-5":"col-md-offset-1 col-md-8"}>
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
