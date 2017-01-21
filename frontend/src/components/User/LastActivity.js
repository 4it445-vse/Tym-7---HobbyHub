import React, {Component} from 'react';
import api from '../../api.js';
import {ListOfUsersRowPublic} from './ListOfUsersRowPublic';
import Immutable from 'immutable';

export class LastActivity extends Component {
  constructor(props) {
    super(props);
    this.fetchEventsByEventUser = this.fetchEventsByEventUser.bind(this);
    this.lastActivityEvents = this.lastActivityEvents.bind(this);
    this.state = {
      events: null
    }
  }

  /**
  Loads all Events attended by currently viewed User.
  */
  fetchEventsByEventUser() {
    filterData = {user_id: this.state.userId};
    api.post('eventusers/last-activity-events', filterData)
      .then((response) => {
        this.props.lastActivityEvents(response.data.events);
      })

    api('eventusers', {"params": {
      "filter": {
        "where": {
          "status":"accepted",
          date: {gt: new Date('2014-04-01T18:30:00.000Z')}
        },
        "include": [
          {"user": "ratings"}
        ]
      }
    }})
  }

  lastActivityEvents(events) {
    this.setState({
      ...this.state,
      events: events
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
            {this.state.events.map(event =>
              <tr>
                <td><Link to={"/events/detail/" + event.id}>{event.name}</Link></td>
                <td><b>{moment(event.date).format("DD. MMMM YYYY")}</b></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }

}
