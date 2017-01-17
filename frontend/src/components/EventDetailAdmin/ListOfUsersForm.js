import React, {Component} from 'react';
import api from '../../api.js';
import {ListOfUsersRow} from './ListOfUsersRow';
import Immutable from 'immutable';

export class ListOfUsersForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeEventUserState = this.onChangeEventUserState.bind(this);
    this.fetchEventUsers = this.fetchEventUsers.bind(this);
    this.state = {
      eventUsers: null,
      error: null
    }
  }

  /**
  Loads all users signed to currently viewed Event.
  */
  fetchEventUsers() {
    api('events/' + this.props.eventId + "/users", {"params": {"filter": {"include": [{"user":"ratings"}]}}})
      .then((response) => {
        this.setState({
          ...this.state,
          error: null,
          eventUsers: response.data
        })
      })
      .catch(error => {
        console.warn("error", error)
        this.setState({
          ...this.state,
          error: error
        })
      })
  }

  componentDidMount() {
    this.fetchEventUsers();
  }

  /**
  Performs change of status of User on Event possibly accepting him, refusing him or
  kicking previously accepted User from Event.
  */
  onChangeEventUserState(data) {
    var self = this;
    api.post('eventusers/changeStatus', data)
      .then((response) => {
        const listState = Immutable.fromJS(self.state.eventUsers)
        const updatedList = listState.update(
          listState.findIndex((item) => {
            return item.get('id') === data.event_id
          }),
          (item) => {
            return item.set('status', data.new_event_status)
          }
        )
        self.setState({
          eventUsers: updatedList.toJS(),
          error: null
        })
      })
      .catch(error => {
        self.setState({
          ...self.state,
          error: error
        })
      })
  }

  render() {
    const {error, eventUsers} = this.state;
    const {userId, eventDate} = this.props;
    return (
      <div>
        {
          !eventUsers ?
            <div>Načíám data</div>
            :
            error ?
              <div>Nastala chyba při načítání dat ze serveru</div>
              :
              <div>
                <table className="text-center list-of-users-form table-striped table-bordered table-hover">
                  <thead>
                  <tr>
                    <td></td>
                    <td>Uživatel</td>
                    <td>Email</td>
                    <td>Vytvořeno</td>
                    <td>Hodnocení</td>
                    <td></td>
                  </tr>
                  </thead>
                  <tbody>
                  {eventUsers.map(eventUser =>
                    <ListOfUsersRow
                      eventDate={eventDate}
                      fetchEventUsers={this.fetchEventUsers}
                      userId={userId}
                      key={eventUser.id}
                      onChangeEventUserState={(newEventUserState) => {
                        this.onChangeEventUserState({event_id: eventUser.id, new_event_status: newEventUserState});
                      }}
                      {...eventUser}
                    />
                  )}
                  </tbody>
                </table>
              </div>

        }
      </div>
    )
  }

}
