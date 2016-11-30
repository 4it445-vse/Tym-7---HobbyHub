/**
 * Created by Honza on 12.11.2016.
 */
import React, {Component} from 'react'
import api from '../../api'
import {getUserId, getAuthToken, isLoggedIn} from '../Login/reducers.js';
import {getEventState} from '../EventList/reducers.js';
import {connect} from 'react-redux'
import {eventSignIn,eventSignOut} from './actions';


export class EventSignInRaw extends Component {

  constructor(props) {
    super(props);
    const {getUserId} = this.props;
    this.state = {
      isSignIn: null,
      userId: getUserId,
      event: null,
    }
  }

  eventSignOut(eventId, userId) {
    const postData = {
      event_id: eventId,
      user_id: userId,
    }
    api.post('eventusers/signOut', postData)
      .then((data)=> {
        this.setState({
          ...this.state,
          event:null
        })
      })
      .catch((err)=> {
        console.warn(err)
      })
  }

  fetchEvents() {
    const {eventId, getUserId} = this.props;
    api('eventusers', {"params": {"filter": {"where": {"and": [{"user_id": getUserId}, {"event_id": eventId}]}}}})
      .then((response)=> {
        const eventUsers = response.data;
        const isSignIn = eventUsers.length > 0;
        this.setState({
          ...this.state,
          isSignIn,
          userId: getUserId
        })
      })
      .catch((err)=> {
        console.warn(err)
      })
  }

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    const {eventId, getUserId, isLoggedIn, isFull, eventState} = this.props;
    console.log(eventState);
    const {isSignIn} = this.state;
    const isWaiting = false;
    if (this.state.userId !== getUserId) {
      this.fetchEvents();
    }

    return (
      <div>
        {
          isLoggedIn === false ?
            <button className="btn btn-default" disabled="disabled">První se musíte přihlásit</button>
            :
            isSignIn ?
              <button className="btn btn-warning" onClick={()=>{
                this.eventSignOut(eventId,getUserId)
              }}>Odhlásit se z události</button>
              : isFull ?
              <button className="btn btn-default" disabled="disabled">Událost má již plnou kapacitu</button>
              : isWaiting ?
              <div>I am waiting</div>
              :
              <button className="btn btn-success" onClick={()=> {
                this.props.eventSignIn(eventId,getUserId)
              }}>Přihlásit se na událost</button>
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {login, eventUser} = state;
  return {
    getUserId: getUserId(login),
    getAuthToken: getAuthToken(login),
    isLoggedIn: isLoggedIn(login),
    eventState: getEventState(eventUser)
  };
}

export const EventSignIn = connect(
  mapStateToProps,
  {
    eventSignIn,
    eventSignOut
  }
)(EventSignInRaw);