/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../../api.js';
import moment from 'moment';
import {EventSignIn} from '../../components/EventList/EventSignIn'
import {EventAddComment} from '../../components/EventList/EventAddComment'
import {EventCommentList} from '../../components/EventList/EventCommentList'
import {getUserId, isLoggedIn} from '../../components/Login/reducers.js';
import {GoogleMap} from '../../components/GoogleMaps/GoogleMap';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router';
import deepEqual from 'deep-equal';
import {EventForm} from '../../components/EventList/EventForm';
import {ListOfUsersForm} from '../../components/EventDetailAdmin/ListOfUsersForm';
import Modal from 'react-modal';
import {ListOfUsersFormPublic} from '../../components/EventDetailPublic/ListOfUsersFormPublic';
import { Link } from 'react-router';

export class EventDetailPageRaw extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');

    this.fetchComments = this.fetchComments.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.showEdit = this.showEdit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    //set comments polling
    const pollingId = setInterval(function () {
      this.fetchComments();
    }.bind(this), 5000);
    this.state = {
      event: null,
      openEditModal: false,
      pollingId
    };
  }

  /**
  Loads details of currently viewed Event from api. These details are saved in state.
  */
  fetchEventDetailData() {
    const {eventId} = this.props.params;
    const self = this;
    api('events/' + eventId, {"params": {"filter": {"include": ["users", "user"]}}})
      .then((response) => {
        self.setState({
          event: response.data
        })
      }).catch((e) => {
      console.warn(eventId, e);
    })
  }

  /**
  Deletes currently viewed Event by api delete request.
  */
  removeEvent(e) {
    e.preventDefault();
    const confirm = window.confirm('Opravdu chcete odstranit událost?');
    if (confirm === true) {
      api.delete(`events/${this.props.params.eventId}`)
        .then(() => {
          browserHistory.push("/");
        })
        .catch((e) => {
          console.warn(e);
        })
    }
  }

  componentDidMount() {
    //fetch data
    this.fetchEventDetailData();
    this.fetchComments();
  }

  componentWillUnmount() {
    clearInterval(this.state.pollingId);
  }

  /**
  Returns array of latitude and longitude of currently viewed Event.
  */
  getCoordinates() {
    if (this.state.event) {
      return {
        latitude: this.state.event.latitude,
        longitude: this.state.event.longitude
      }
    }
  }

  /**
  Returns count (int) of Users signed to currently viewed event, that are in "accepted" state.
  */
  getSignedUsersCount(users) {
    if (!users || users === undefined) {
      return 0;
    }
    return users.reduce((prev, user) => {
      return user.status === "accepted" ? prev + 1 : prev;
    }, 0)
  }

  /**
  This function launches modal window for event editation.
  */
  showEdit(e) {
    e.preventDefault();
    this.setState({
      ...this.state,
      openEditModal: true
    })
  }

  /**
  This function is called on event form submit. Calls api.put to update current event.
  */
  onFormSubmit(event) {
    const eventPut = {...event};
    delete eventPut.id;
    delete eventPut.user;
    api.put(`events/${event.id}`, eventPut)
      .then(() => {
        this.setState({
          ...this.state,
          openEditModal:false
        });
      }).catch(error => {
      console.warn(error);
    });
  }

  /**
  Returns true if given event was created by given user, false otherwise.
  */
  isEventCreatedByMe(event, userId) {
    return (event && 'user' in event && 'id' in event.user && (event.user.id === userId))
  }

  /**
  Loads comments on current event and stores them in state.
  */
  fetchComments() {
    const {eventId} = this.props.params;
    api('eventcomments', {
      "params": {
        "filter": {
          "where": {"event_id": eventId},
          "include": [{"user":"ratings"}],
          "order": "created desc"
        }
      }
    })
      .then((response) => {
        const eventComments = response.data;
        //This fixes console warning
        if (deepEqual(this.state.eventComments, eventComments) === false) {
          this.setState({
            ...this.state,
            eventComments: eventComments
          })
        } else {
        }
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  /**
  Closes modal window for event editation.
  */
  closeModal() {
    this.setState({
      ...this.state,
      openEditModal:false
    })
  }

  render() {
    const {event, eventComments} = this.state;
    const {isLoggedIn, getUserId} = this.props;
    const authorId = event ? event.author_id : undefined;
    const userId = this.props.getUserId;
    const linkToProfile = (event && event.user) ? `/profile/${authorId}` : ``;

    return (
      <div className="container content-container">
        {event === null ?
          <h1>Načítám...</h1> :
          <div>


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
                        {event.tags.split(",").map((tag, index) =>
                          <li className="float" key={index}><a className="btn btn-xs btn-primary" href="#">{tag}</a>
                          </li>
                        )}
                        {this.isEventCreatedByMe(event, getUserId)
                          ?
                          <li className="float-right">
                            <a href="" className="btn btn-xs btn-primary"
                               onClick={this.showEdit}>
                              <i className="fa fa-pencil-square-o fa-lg"></i> Upravit
                            </a>
                            <a href="" className="btn btn-xs btn-primary btn-warning" onClick={this.removeEvent}>
                              <i className="fa fa-trash-o fa-lg"></i> Odstranit
                            </a>
                          </li>
                          :
                          ""
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row top-buffer"></div>
              <div className="col-xs-12 col-md-3">
                <div className="col-md-12 no-margin">
                  Pořádá <b><Link to={linkToProfile}>{event.user ? event.user.username : 'Anonymous'}</Link></b>
                </div>
                <div className="col-md-12 no-margin">
                  Datum <b>{moment(event.date).format("DD. MMMM YYYY")}</b>
                </div>
                <div className="col-md-12 no-margin">
                  Počet míst <b>{this.getSignedUsersCount(this.state.event.users)} / {event.capacity}</b>
                </div>
                <div className="col-md-12">
                  <GoogleMap
                    coordinates={{
                      latitude: event.latitude,
                      longitude: event.longitude
                    }}
                    title={event.name}
                    elementId='google-map-detail'
                  />
                </div>
                {
                  this.isEventCreatedByMe(event, getUserId)
                    ?
                    <div className="col-md-12">

                    </div>
                    :
                    <div className="col-md-12  no-margin top-buffer">
                      {moment(event.date).add(1,'days').isAfter(moment())
                        ?
                        <EventSignIn eventId={event.id}
                                     isFull={event.capacity <= this.getSignedUsersCount(this.state.event.users)}/>
                        :
                        null
                      }
                    </div>
                }
                {(isLoggedIn && !this.isEventCreatedByMe(event, getUserId)) &&
                <div className="col-md-12 no-margin">
                  <ListOfUsersFormPublic eventId={event.id} userId={userId} eventDate={event.date}/>
                </div>
                }
              </div>

            <div className="col-xs-12 col-md-9">
              <div className="event-description">{event.description}</div>
                  {
                    this.isEventCreatedByMe(event, getUserId)
                      ?
                      <div className="col-md-12">
                        <ListOfUsersForm eventId={event.id} userId={userId} eventDate={event.date}/>
                      </div>
                      :
                      null
                  }

                <div className="row"></div>
                {isLoggedIn &&
                <div className={this.isEventCreatedByMe(event, getUserId) ? "col-md-12" : "ol-md-12"}>
                  <EventCommentList eventComments={eventComments} fetchComments={this.fetchComments} userId={userId}
                                    authorId={authorId}/>
                  <div>
                    <EventAddComment eventId={event.id} fetchComments={this.fetchComments}/>
                  </div>
                </div>}
              </div>
            </div>

            {
              this.state.openEditModal === true ?

                <Modal
                  isOpen={this.state.openEditModal}
                  contentLabel="Úprava události"
                  onRequestClose={this.closeModal}
                >
                  <div className="container content-container">
                    <i onClick={this.closeModal} className="fa fa-times text-danger close-modal"/>
                    <EventForm
                      actions={{
                        edit: true,
                        remove: true
                      }}
                      onFormSubmit={this.onFormSubmit}
                      eventState=""
                      event={event}/>
                  </div>
                </Modal>
                :
                null
            }
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
