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
    this.eventAddComment = this.eventAddComment.bind(this);
    const { getUserId } = this.props;
    this.state = {
      userId: getUserId
    }
  }

  eventAddComment(eventId,userId,text) {
    const postData = {
      event_id: eventId,
      user_id: userId,
      text: text,
      created: "2016-11-13T00:00:00.000Z"
    };
    api.post('eventcomments', postData)
      .catch((err)=> {
        console.warn(err)
      })
  }

  fetchComments() {
    const {eventId} = this.props;
    api('eventcomments', {"params": {"filter":{"where":{"event_id": eventId} }}})
      .then((response)=>{
        const eventComments = response.data;
        this.setState({
          ...this.state,
          eventComments: eventComments
        })
      })
      .catch((err)=>{
        console.warn(err)
      })
  }

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    const {eventId, getUserId} = this.props;
    return (
      <div>
        <button className="btn btn-warning" onClick={()=>{
          this.eventAddComment(eventId,getUserId)
        }
        }>Přidat komentář</button>
      </div>
    )
  }
}
