/**
 * Created by honza on 01/12/16.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import api from '../../api.js';

export class ListOfUsersRowPublic extends Component {
  constructor(props) {
    super(props);
    this.sendRating = this.sendRating.bind(this);
  }

  /**
  Returns true if given User (userId) can rate other User (user). He can rate him
  if he is signed to same Event and Event happened in past.
  */
  canUserRate(userId, user, participated, eventDate) {
    const d1 = new Date();
    const d2 = new Date(eventDate);
    if (!userId || user.id === userId || !participated || d2 > d1) {
      return false;
    }
    const {ratings} = user;
    let result = true;
    ratings.forEach(function (rating) {
      if (rating.author_id === userId) {
        result = false;
      }
    });

    return result;
  }

  /**
  Returns css class to be set to element based on rating.
  @rating int
  */
  getRatingClass(rating) {
    if (rating === 1) {
      return 'inline-rating rating-red';
    } else if (rating === 5) {
      return 'inline-rating rating-green';
    } else {
      return 'inline-rating';
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

  /**
    Calls api post method when user (authorId) rates another user (ownerId).
  */
  sendRating(rating, ownerId, authorId) {
    api.post('ratings', {
      "rating": rating,
      "owner_id": ownerId,
      "author_id": authorId
    }).then(() => {
        const {fetchEventUsers} = this.props;
        fetchEventUsers();
    });
  }

  render() {
    const {user, userId, participated, eventDate} = this.props;
    const profileLink = "/profile/"+user.id;
    const rating = this.calculateRating(user);
    return (
      <tr>

        <td>
          <Link to={profileLink} className="public-line">
            {user.username} <span className={this.getRatingClass(rating)}>{rating}</span>
          </Link>
          {this.canUserRate(userId, user, participated, eventDate) && <span>
            <a onClick={(e)=>{
              e.preventDefault();
              this.sendRating(1, user.id, userId)
            }} href=""><img alt="dislike" className="thumbs" src="/images/dislike.png" /></a>
            <a onClick={(e)=>{
              e.preventDefault();
              this.sendRating(5, user.id, userId)
            }} href=""><img alt="like" className="thumbs" src="/images/like.png" /></a>
          </span>}
        </td>

      </tr>
    )
  }
}
