/**
 * Created by Honza on 12.11.2016.
 */
import React, {Component} from 'react'
import api from '../../api'
export class EventSignIn extends Component {

  constructor(props) {
    super(props)
    this.eventLogout = this.eventLogout.bind(this)
    this.eventSignIn = this.eventSignIn.bind(this)
    this.state = {
      isSignIn: null
    }
  }

  eventSignIn() {
    const postData={
        userId:"1",
        eventId:"1"
    }
    api.post('eventusers/signIn',postData)
      .then((data)=> {
        console.log(data);
      })
      .catch((err)=>{
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
    const {eventId, userId} = this.props;
    const isSignIn = false;

    return (
      <div>
        {isSignIn ?
          <button onClick={this.eventLogout}>SignOut</button>
          :
          <button onClick={event=> {
            this.eventSignIn(event, eventId, userId)
          }}> SignIn</button>
        }
      </div>
    )
  }
}