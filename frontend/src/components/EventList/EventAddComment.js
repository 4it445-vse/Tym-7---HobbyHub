/**
 * Created by Honza on 12.11.2016.
 */
import React, {Component} from 'react'
import api from '../../api'
import {getUserId, getAuthToken, isLoggedIn} from '../Login/reducers.js';
import {connect} from 'react-redux';
import moment from 'moment';


export class EventAddCommentRaw extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.commentSuccess = this.commentSuccess.bind(this);
    this.state = {
      userId: this.props.getUserId,
      eventId: this.props.eventId
    }
  }

  /**
  Calls api post method to create new comment on Event.
  */
  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eventCommentData = {
      created: moment().toDate(),
      text: formData.get('message'),
      user_id: this.state.userId,
      event_id: this.state.eventId
    };


    api.post('eventcomments', eventCommentData)
      .then(this.commentSuccess)
      .catch(error => {
        this.commentError(error);
      });
  }

  /**
  Called when comment is added successfully
  */
  commentSuccess() {
    const {fetchComments} = this.props;
    const {message} = this.refs;
    message.value = "";
    fetchComments();
  }

  /**
  Called on event comment failure.
  */
  commentError() {
    console.log('com err');
  }

  render() {
    return (
      <div>
        <form id="main-contact-form" className="contact-form" name="contact-form" onSubmit={this.handleSubmit}
              role="form">
          <div className="row">
            <div className="form-group comments-add col-md-12">
              <textarea name="message" id="message" required="required" className="form-control" rows="1" ref="message"></textarea>
              <button type="submit" className="btn pull-right btn-success btn-sm form-control add-comment-button">Přidat
                komentář
              </button>
            </div>
          </div>
        </form>


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

export const EventAddComment = connect(
  mapStateToProps,
  {}
)(EventAddCommentRaw);
