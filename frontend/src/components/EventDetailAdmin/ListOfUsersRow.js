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
        <div>
          <a
            onClick={(e)=>{
            e.preventDefault();
            onChangeEventUserState("rejected")
          }}
            href="">Zamítnout</a>
        </div>
      );
    } else {

    }
  }
}