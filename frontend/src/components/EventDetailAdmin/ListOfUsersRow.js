/**
 * Created by honza on 01/12/16.
 */
import React, {Component} from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import api from '../../api.js';

export class ListOfUsersRow extends Component {

  /**
    Returns true if user of given id can rate another user, based on date of Event.
  */
  canUserRate(userId, user, eventDate) {
    const d1 = new Date();
    const d2 = new Date(eventDate);
    if (!userId || user.id === userId || d2 > d1) {
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
    const {status, created, user, onChangeEventUserState, userId, eventDate} = this.props;
    const profileLink = "/profile/"+user.id;
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
            }} href=""><img className="thumbs" alt="dislike" src="/images/dislike.png" /></a>
            <a onClick={(e)=>{
              e.preventDefault();
              this.sendRating(5, user.id, userId)
            }} href=""><img className="thumbs" alt="like" src="/images/like.png" /></a>
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
