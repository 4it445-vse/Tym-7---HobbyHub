/**
 * Created by honza on 01/12/16.
 */
import React, {Component} from 'react';
import moment from 'moment'

export class ListOfUsersRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {status, created, user, onChangeEventUserState} = this.props;
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
          {user.username}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          {moment(created).format("D.M.YYYY")}
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
            href="">Přijmout</a>
          <a
            onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("rejected")
          }}
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
          href="">Zamítnout</a>
      );
    } else if (status === "rejected") {
      return (
        <a
          onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("accepted")
          }}
          href="">Přijmout</a>
      )
    }
  }
}