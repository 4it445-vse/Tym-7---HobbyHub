/**
 * Created by honza on 01/12/16.
 */
import React, {Component} from 'react';
import moment from 'moment'
import { Link } from 'react-router'

export class ListOfUsersRowPublic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {status, created, user, onChangeEventUserState} = this.props;
    const profileLink = "/profile/"+user.id;
    console.log(this.props)
    return (
      <tr>

        <td>
          <Link to={profileLink} className="public-line">
            {user.username} <span className="inline-rating">4</span>
          </Link>
          <a href=""><img className="thumbs"src="/images/dislike.png" /></a>
          <a href=""><img className="thumbs" src="/images/like.png" /></a>
        </td>

      </tr>
    )
  }
}
