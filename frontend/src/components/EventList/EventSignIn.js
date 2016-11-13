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
    this.eventSignOut = this.eventSignOut.bind(this)
    this.eventSignIn = this.eventSignIn.bind(this)
    this.state = {
      isSignIn: null,
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
        this.setState({
          ...this.state,
          isSignIn: true
        })
        console.log(data);
      })
      .catch((err)=> {
        console.warn(err)
      })
  }

  eventSignOut(eventId,userId,token) {
    const postData = {
      event_id: eventId,
      user_id: userId,
    }
    api.post('eventusers/signOut?access_token='+token, postData)
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

  getIndex(value, arr, prop){
    for(var i = 0; i < arr.length; i++) {
      if(arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }

  fetchEvents(token){
    api('eventusers?access_token='+token)
      .then((response)=>{
        const events = response.data;
        const isSignIn =  this.getIndex(this.props.eventId,events,'id') >=0
        this.setState({
          ...this.state,
          isSignIn,
        })
      })
      .catch((err)=>{
        console.warn(err)
      })
  }

  componentDidMount(){
    this.fetchEvents(this.props.getAuthToken);
  }

  render() {
    const {eventId, getAuthToken, getUserId, isLoggedIn} = this.props;
    const {isSignIn} = this.state

    // console.log("getUserID",getUserId());
    console.log("GET AUTH TOKEN", isLoggedIn)

    return (
      <div>
        {
          isLoggedIn===false ?
            <button disabled="disabled">První se musíte přihlásit</button>
            :
            isSignIn ?
              <button onClick={()=>{
                this.eventSignOut(eventId,getUserId,getAuthToken)
              }
              }>Odhlásit se z události</button>
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