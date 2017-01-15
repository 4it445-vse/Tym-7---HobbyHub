/**
 * Created by honza on 01/12/16.
 */
import React, {Component} from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import api from '../../api.js';

export class ListOfUsersRow extends Component {
  constructor(props) {
    super(props);
  }

  canUserRate(userId, user, eventDate) {
    var d1 = new Date();
    var d2 = new Date(eventDate);
    if (!userId || user.id === userId || d2 > d1) {
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
    const {status, created, user, onChangeEventUserState, userId, eventDate} = this.props;
    const profileLink = "/profile/"+user.id;
    console.log(this.props)
    return (
      <tr>
        <td className="text-center">
          {
            status === "pending"
              ?
              <div className="circle circle-neutral">
              </div>
              : status === "accepted"
              ?
              <div className="circle circle-green">
              </div>
              : status === "rejected"
              ?
              <div className="circle circle-red">
              </div> :

              ""
          }

        </td>
        <td>
          <Link to={profileLink}>
            {user.username}
          </Link>
        </td>
        <td>
          {user.email}
        </td>
        <td>
          {moment(created).format("D.M.YYYY")}
        </td>
        <td>
          {this.canUserRate(userId, user, eventDate) && <span>
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
        <td>
          <EventUserAvailableActions status={status} onChangeEventUserState={onChangeEventUserState}/>
        </td>
      </tr>
    )
  }
}

export class EventUserAvailableActions extends Component {

  render() {
    const {status, onChangeEventUserState} = this.props
    console.log(status)
    if (status === "pending") {
      return (
        <div>
          <a
            onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("accepted")
          }}
                      className="user-state"
            href="">Přijmout</a>
          <a
            onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("rejected")
          }}
                      className="user-state"
            href="">Zamítnout</a>
        </div>
      );
    } else if (status === "accepted") {
      return (
        <a
          onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("rejected")
          }}
                      className="user-state"
          href="">Zamítnout</a>
      );
    } else if (status === "rejected") {
      return (
        <a
          onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("accepted")
          }}
                      className="user-state"
          href="">Přijmout</a>
      )
    }
  }
}
