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

    this.fetchComments = this.fetchComments.bind(this);
    //set comments polling
    const pollingId = setInterval(function() {
      this.fetchComments();
    }.bind(this), 5000);
    this.state = {
      event: null,
      pollingId
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
    //fetch data
    this.fetchEventDetailData();
    this.fetchComments();
  }

  componentWillUnmount() {
    clearInterval(this.state.pollingId);
  }

  getCoordinates() {
    if (this.state.event) {
      return {
        latitude: this.state.event.latitude,
        longitude: this.state.event.longitude
      }
    }
  }

  getSignedUsersCount(users) {
    if (!users || users === undefined) {
      return 0;
    }
    return users.reduce((prev, user)=>{
      return user.status==="accepted" ? prev + 1 : prev;
    },0)
  }

  isEventCreatedByMe(event, userId) {
    return (event && 'user' in event && 'id' in event.user && (event.user.id === userId))
  }

  fetchComments() {
    const {eventId} = this.props.params;
    api('eventcomments', {"params": {"filter": {"where": {"event_id": eventId}, "include": ["user"], "order": "created desc"}}})
      .then((response) => {
        const eventComments = response.data;
        //This fixes console warning
        if (deepEqual(this.state.eventComments, eventComments) === false) {
          this.setState({
            ...this.state,
            eventComments: eventComments
          })
        }else{
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  render() {
    const {event, eventComments} = this.state;
    const {isLoggedIn, getUserId} = this.props;
    const coordinates = this.getCoordinates();
    const authorId = event ? event.author_id : undefined;
    const userId = this.props.getUserId;
    const linkToProfile = (event && event.user)? `/profile/${authorId}`:``;
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
                Počet míst <b>{this.getSignedUsersCount(this.state.event.users)} / {event.capacity}</b>
              </div>
              <div className="col-md-12">
              </div>
              <div className="col-md-12">
                {/*<GoogleMap coordinates={coordinates}/> <EventAddComment eventId={event.id}/>*/}

              </div>

              {
                this.isEventCreatedByMe(event, getUserId)
                  ?
                  <div className="col-md-7">

                  </div>
                  :
                  <div className="col-md-2">
                    <EventSignIn eventId={event.id} isFull={event.capacity <= this.getSignedUsersCount(this.state.event.users)}/>
                  </div>
              }

            </div>



            <div className="col-xs-12 col-md-9">

              <div className="event-description">{event.description}</div>
                  {
                    this.isEventCreatedByMe(event, getUserId)
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
                  <div className={this.isEventCreatedByMe(event, getUserId)?"col-md-12":"ol-md-12"}>
                    <EventCommentList eventComments={eventComments} fetchComments={this.fetchComments} userId={userId} authorId={authorId}/>
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
