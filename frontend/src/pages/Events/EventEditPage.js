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
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router';
import {EventForm} from '../../components/EventList/EventForm'
import deepEqual from 'deep-equal';
import {ListOfUsersForm} from '../../components/EventDetailAdmin/ListOfUsersForm'

export class EventEditPageRaw extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {
      event: null,
      eventState: "",
    };
  }

  fetchEvent() {
    const eventId = this.props.params.eventId;
    console.log("fetchong")
    api.get(`events/${eventId}`, {"params": {"filter": {"include": ["user"]}}})
      .then(response => {
        console.log(response);
        const {data} = response;
        if (data.user.id !== this.props.getUserId)
          throw new Error('this user cannot edit others event');

        this.setState({
          ...this.state,
          event: data
        })
      })
      .catch(error => {
        console.warn(error)
        browserHistory.push("/not-found");
      })
  }

  componentDidMount() {
    this.fetchEvent();
  }

  onFormSubmit(event) {
    const eventPut = {...event}
    delete eventPut.id
    delete eventPut.user
    api.put(`events/${event.id}`,eventPut)
      .then(response =>{
        console.log("response",response)
      }).catch(error=>{
        console.warn(error)
    })
    console.log("onFormSubmit", event)
  }

  render() {
    const formActions = {
      edit: true,
      remove: true
    }
    console.log(this.state.event)
    return (
      <div className="container content-container">
        {
          this.state.event
            ?
            <EventForm actions={formActions} onFormSubmit={this.onFormSubmit} eventState="" event={this.state.event}/>
            :
            ''
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

export const EventEditPage = connect(
  mapStateToProps,
  {}
)(EventEditPageRaw);
