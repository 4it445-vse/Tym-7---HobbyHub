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

  eventSignIn() {
    const postData = {
      eventId: "1"
    }
    api.post('eventusers/signIn', postData)
      .then((data)=> {
        console.log(data);
      })
      .catch((err)=> {
        console.warn(err)
      })
  }

  eventLogout() {

  }

  eventSignInStatus() {
    api.post('blah', ()=> {

    })
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
              <button onClick={event=> {
                this.eventSignIn(event, eventId)
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