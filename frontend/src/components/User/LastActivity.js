import React, {Component} from 'react';
import api from '../../api.js';
import Immutable from 'immutable';
import {LastActivityRow} from './LastActivityRow'

export class LastActivity extends Component {
  constructor(props) {
    super(props);
    this.fetchEventsByEventUser = this.fetchEventsByEventUser.bind(this);
    this.lastActivityEvents = this.lastActivityEventusers.bind(this);
    this.state = {
      userId: props.userId,
      eventusers: null
    }
  }

  /**
  Loads all Events attended by currently viewed User.
  */
  fetchEventsByEventUser() {
    var filterData = {user_id: this.state.userId};
    api.post('eventusers/last-activity-events', filterData)
      .then((response) => {
        this.lastActivityEventusers(response.data.eventusers);
      })
  }

  lastActivityEventusers(eventusers) {
    this.setState({
      ...this.state,
      eventusers: eventusers
    });
  }

  componentDidMount() {
    this.fetchEventsByEventUser();
  }

  render() {
    const {userId} = this.props;

    return (
      <div>
        <b>Poslední aktivita:</b>
        <table className="text-center list-of-users-form table-striped table-bordered table-hover">
          <thead>
            <tr>
              <td>Událost</td>
              <td>Datum konání</td>
            </tr>
          </thead>
          <tbody>
            {this.state.eventusers
              ?
              this.state.eventusers.map(eventuser =>
                <LastActivityRow event={eventuser.event} key={eventuser.event.id}/>
              )
              :
              <div></div>
          }
          </tbody>
        </table>
      </div>
    )
  }

}
