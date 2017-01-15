import React, {Component} from 'react';
import api from '../../api.js';
import {ListOfUsersRowPublic} from './ListOfUsersRowPublic';
import Immutable from 'immutable';

export class ListOfUsersFormPublic extends Component {
  constructor(props) {
    super(props);
    this.onChangeEventUserState = this.onChangeEventUserState.bind(this);
    this.state = {
      eventUsers: null,
      error: null
    }
  }

  fetchEventUsers() {
    const self = this;
    api('events/' + this.props.eventId + "/users", {"params": {"filter": {"include": ["user"]}}})
      .then((response) => {
        console.log(response.data);
        self.setState({
          ...self.state,
          error: null,
          eventUsers: this.filterAcceptedEventUsers(response.data)
        })
      })
      .catch(error => {
        console.warn("error", error)
        self.setState({
          ...self.state,
          error: error
        })
      })
  }

  filterAcceptedEventUsers(eventUsers) {
      return eventUsers.filter(function (user) {
        return user.status ===  "accepted";
      });
  }

  componentDidMount() {
    this.fetchEventUsers();
  }

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

                <table className=" list-of-users-form table-hover top-buffer">
                  <thead>
                  <tr>
                    <td>Účastníci</td>
                  </tr>
                  </thead>
                  <tbody>
                  {eventUsers.map(eventUser =>
                    <ListOfUsersRowPublic
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
