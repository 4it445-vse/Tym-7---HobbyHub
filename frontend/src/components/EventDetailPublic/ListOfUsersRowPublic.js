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
  }

  canUserRate(userId, user) {
    if (!userId || user.id === userId) {
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

  render() {
    const {status, created, user, onChangeEventUserState, userId} = this.props;
    const profileLink = "/profile/"+user.id;
    //TODO check if is already rated, check if user is logged in, calculate rating, get class for rating, refresh after click on thumb
    return (
      <tr>

        <td>
          <Link to={profileLink} className="public-line">
            {user.username} <span className={this.getRatingClass(this.calculateRating(user))}>{this.calculateRating(user)}</span>
          </Link>
          {this.canUserRate(userId, user) && <span>
            <a href=""><img className="thumbs" src="/images/dislike.png" /></a>
            <a href=""><img className="thumbs" src="/images/like.png" /></a>
          </span>}
        </td>

      </tr>
    )
  }
}
