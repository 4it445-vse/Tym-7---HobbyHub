import React, {Component} from 'react';
import api from '../../api.js';
import {ListOfUsersRow} from './ListOfUsersRow';

export class ListOfUsersForm extends Component {
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
      .then((response)=> {
        console.log(response.data);
        self.setState({
          ...self.state,
          error: null,
          eventUsers: response.data
        })
      })
      .catch(error=> {
        console.warn("error")
        self.setState({
          ...self.state,
          error: error
        })
      })
  }

  componentDidMount() {
    this.fetchEventUsers();
  }

  onChangeEventUserState(data) {
    console.log(data)
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
                <table className="list-of-users-form">
                  <thead>
                  <tr>
                    <td>Uživatelské jméno</td>
                    <td>Email</td>
                    <td>Stav žádosti</td>
                    <td>Vytvořeno</td>
                    <td></td>
                  </tr>
                  </thead>
                  <tbody>
                  {eventUsers.map(eventUser=>
                    <ListOfUsersRow
                      key={eventUser.id}
                      onChangeEventUserState={(newEventUserState)=>{
                        this.onChangeEventUserState({user_id:eventUser.id, state:newEventUserState});
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