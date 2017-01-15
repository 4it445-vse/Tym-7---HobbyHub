/**
 * Created by honza on 01/12/16.
 */
import React, {Component} from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import api from '../../api.js';

export class ListOfUsersRowPublic extends Component {
  constructor(props) {
    super(props);
    this.sendRating = this.sendRating.bind(this);
  }

  canUserRate(userId, user, participated, eventDate) {
    var d1 = new Date();
    var d2 = new Date(eventDate);
    if (!userId || user.id === userId || !participated || d2 > d1) {
      return false;
    }
    const {ratings} = user;
    var result = true;
    ratings.forEach(function (rating) {
      if (rating.author_id === userId) {
        result = false;
      }
    });

    return result;
  }

  getRatingClass(rating) {
    if (rating === 1) {
      return 'inline-rating rating-red';
    } else if (rating === 5) {
      return 'inline-rating rating-green';
    } else {
      return 'inline-rating';
    }
  }

  calculateRating(user) {
    const {ratings} = user;
    if (ratings.length == 0) {
      return 3;
    }
    var sum = 0;

    ratings.forEach(function (rating) {
        sum += rating.rating;
    });

    return Math.round(sum/ratings.length);
  }

  sendRating(rating, ownerId, authorId) {
    api.post('ratings', {
      "rating": rating,
      "owner_id": ownerId,
      "author_id": authorId
    }).then((response) => {
        const {fetchEventUsers} = this.props;
        fetchEventUsers();
    });
  }

  render() {
    const {status, created, user, onChangeEventUserState, userId, participated, eventDate} = this.props;
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
            }} href=""><img className="thumbs" src="/images/dislike.png" /></a>
            <a onClick={(e)=>{
              e.preventDefault();
              this.sendRating(5, user.id, userId)
            }} href=""><img className="thumbs" src="/images/like.png" /></a>
          </span>}
        </td>

      </tr>
    )
  }
}
