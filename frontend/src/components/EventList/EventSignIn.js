/**
 * Created by Honza on 12.11.2016.
 */
import React, {Component} from 'react'
import api from '../../api'
import {getUserId, getAuthToken, isLoggedIn} from '../Login/reducers.js';
import {connect} from 'react-redux'


export class EventSignInRaw extends Component {

  constructor(props) {
    super(props);
    this.eventSignOut = this.eventSignOut.bind(this);
    this.eventSignIn = this.eventSignIn.bind(this);
    this.state = {
      isSignIn: null,
    }
  }

  eventSignIn(eventId,userId) {
    const postData = {
      event_id: eventId,
      user_id: userId,
      status: "pending",
      created: "2016-11-13T00:00:00.000Z",
      resolved: "2016-11-13T00:00:00.000Z"
    };
    api.post('eventusers', postData)
      .then((data)=> {
        this.setState({
          ...this.state,
          isSignIn: true
        });
      })
      .catch((err)=> {
        console.warn(err)
      })
  }

  eventSignOut(eventId,userId) {
    const postData = {
      event_id: eventId,
      user_id: userId,
    }
    api.post('eventusers/signOut', postData)
      .then((data)=> {
        this.setState({
          ...this.state,
          isSignIn: false
        })
      })
      .catch((err)=> {
        console.warn(err)
      })
  }

  fetchEvents() {
  //TODO should check if sighned in after login/logout -> maybe should move to render
    const {eventId, getUserId } = this.props;
    api('eventusers', {"params": {"filter":{"where":{"and": [{"user_id":getUserId},{"event_id": eventId} ]}}}})
      .then((response)=>{
        const eventUsers = response.data;
        const isSignIn = eventUsers.length > 0;
        this.setState({
          ...this.state,
          isSignIn,
        })
      })
      .catch((err)=>{
        console.warn(err)
      })
  }

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    const {eventId, getUserId, isLoggedIn, isFull} = this.props;
    const {isSignIn} = this.state;

    return (
      <div>
        {
          isLoggedIn===false ?
            <button className="btn btn-default" disabled="disabled">První se musíte přihlásit</button>
            :
            isSignIn ?
              <button className="btn btn-warning" onClick={()=>{
                this.eventSignOut(eventId,getUserId)
              }
              }>Odhlásit se z události</button>
              : isFull ?
                <button className="btn btn-default" disabled="disabled">Událost má již plnou kapacitu</button>
                :
              <button className="btn btn-success" onClick={()=> {
                this.eventSignIn(eventId,getUserId)
              }}>Přihlásit se na událost</button>
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  const {login} = state;
  return {
    getUserId: getUserId(login),
    getAuthToken: getAuthToken(login),
    isLoggedIn: isLoggedIn(login),
  };
}

export const EventSignIn = connect(
  mapStateToProps,
  {}
)(EventSignInRaw);