import React, {Component} from 'react';
import api from '../../api.js';
import {ListOfUsersRowPublic} from './ListOfUsersRowPublic';
import Immutable from 'immutable';

export class ListOfUsersFormPublic extends Component {
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
    api('events/' + this.props.eventId + "/users", {"params": {"filter": {"include": [{"user": "ratings"}]}}})
      .then((response) => {
        this.setState({
          ...this.state,
          error: null,
          eventUsers: this.filterAcceptedEventUsers(response.data)
        })
      })
      .catch(error => {
        console.warn("error", error)
        this.setState({
          ...this.state,
          error: error
        })
      });
  }

  /**
  Filters EventUser association entities and returns only those who are accepted.
  */
  filterAcceptedEventUsers(eventUsers) {
      return eventUsers.filter(function (user) {
        return user.status ===  "accepted";
      });
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

  /**
  Returns true if given array of eventUsers contains given userId. False if not.
  */
  participated(eventUsers, userId) {
    var participated = false;
    eventUsers.forEach(function (eventUser) {
      if (eventUser.user_id === userId) {
        participated = true;
      }
    });

    return participated;
  }

  render() {
    const {error, eventUsers} = this.state;
    const {userId, eventDate} = this.props;
    return (
      <div>
        {
          !eventUsers ?
            <div>Načítám data</div>
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
                      eventDate={eventDate}
                      participated={this.participated(eventUsers, userId)}
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
