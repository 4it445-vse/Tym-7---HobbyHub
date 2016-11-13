/**
 * Created by Honza on 12.11.2016.
 */
import React, {Component} from 'react'
import api from '../../api'
import {getUserId, getAuthToken, isLoggedIn} from '../Login/reducers.js';
import {connect} from 'react-redux'


export class EventSignInRaw extends Component {

  constructor(props) {
    super(props)
    this.eventLogout = this.eventLogout.bind(this)
    this.eventSignIn = this.eventSignIn.bind(this)
    this.state = {
      isSignIn: null
    }
  }

  eventSignIn(eventId,userId,token) {
    const postData = {
      event_id: eventId,
      user_id: userId,
      status: "created",
      created: "2016-11-13T00:00:00.000Z",
      resolved: "2016-11-13T00:00:00.000Z",
    }
    api.post('eventusers?access_token='+token, postData)
      .then((data)=> {
        console.log(data);
      })
      .catch((err)=> {
        console.warn(err)
      })
  }

  eventLogout() {

  }

  componentDidMount() {

  }

  render() {
    const {eventId, getAuthToken, getUserId, isLoggedIn} = this.props;
    const isSignIn = false;

    // console.log("getUserID",getUserId());
    console.log("GET AUTH TOKEN", isLoggedIn)

    return (
      <div>
        {
          isLoggedIn===false ?
            <button disabled="disabled">První se musíte přihlásit</button>
            :
            isSignIn ?
              <button onClick={this.eventLogout}>Odhlásit se z události</button>
              :
              <button onClick={()=> {
                this.eventSignIn(eventId,getUserId,getAuthToken)
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