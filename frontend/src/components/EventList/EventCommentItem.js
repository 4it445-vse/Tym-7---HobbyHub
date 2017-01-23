import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import api from '../../api.js';


export class EventCommentItem extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.handleRemove = this.handleRemove.bind(this);
    this.state = {
      eventComment: null
    }
  }

  /**
  Function called when removing comment from event.
  */
  handleRemove() {
    const {eventComment, fetchComments, userId} = this.props;
    const {id} = eventComment;
    api.post('eventcomments/delete', {"user_id": userId, "comment_id": id})
        .then(()=> {
          fetchComments();
        }).catch(()=> {
          console.log('error occurred during comment removal');
        })
  }

  /**
  Returns css class to be set to element based on rating.
  @rating int
  */
  getRatingClass(rating) {
    if (rating === 1) {
      return 'inline-rating-comments rating-red';
    } else if (rating === 5) {
      return 'inline-rating-comments rating-green';
    } else {
      return 'inline-rating-comments';
    }
  }

  /**
  Calculates average rating on given user.
  */
  calculateRating(user) {
    const {ratings} = user;
    if (ratings.length === 0) {
      return 3;
    }
    let sum = 0;

    ratings.forEach(function (rating) {
      sum += rating.rating;
    });

    return Math.round(sum/ratings.length);
  }

  render() {
    const {eventComment, isRemovable} = this.props;
    const {user, created, text} = eventComment;
    const linkToProfile = `profile/${user.id}`;
    const rating = this.calculateRating(user);

    return (
      <div className="media comment_section">
        <div className="pull-left post_comments">
          <Link to={linkToProfile}> <img src={
            user.picture ?
            user.picture
            :
            '/' + process.env.PUBLIC_URL + 'images/avatar.png'
          } className="img-circle" alt=""/></Link>
        </div>
        <div className="media-body post_reply_comments">
        <span className="comment-name">{user.username}<span className={this.getRatingClass(rating)}>{rating}</span></span>

          {isRemovable && <button onClick={this.handleRemove} type="button" className="btn btn-xs btn-danger pull-right margin-left-10">
          <span className="glyphicon glyphicon-trash"></span>&nbsp;
          </button>}

        <span className="comment-time pull-right">{moment(created).format("HH:mm (DD. MMMM YYYY)")}</span>
        <p>{text}</p>
        </div>
      </div>
    );
  }
}
