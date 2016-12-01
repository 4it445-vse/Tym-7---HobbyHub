/**
 * Created by honza on 01/12/16.
 */
import React, {Component} from 'react';

export class ListOfUsersRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {status, created, user, onChangeEventUserState} = this.props;
    console.log(this.props)
    return (
      <tr className={status}>
        <td>
          {user.username}
        </td>
        <td>
          {user.email}
        </td>
        <td>
          {status}
        </td>
        <td>
          {created}
        </td>
        <div>
          <EventUserAvailableActions status={status} onChangeEventUserState={onChangeEventUserState}/>
        </div>
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
          <td>
            <a
              onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("accepted")
          }}
              href="">Přijmout</a>
          </td>
          <td>
            <a
              onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("rejected")
          }}
              href="">Zamítnout</a>
          </td>
        </div>
      );
    } else if (status === "accepted") {
      return (
        <td>
          <a
            onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("rejected")
          }}
            href="">Zamítnout</a>
        </td>
      );
    } else if (status === "rejected") {
      return (
        <div>
          <td>
            <a
              onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("accepted")
          }}
              href="">Přijmout</a>
          </td>
        </div>
      )
    }
  }
}