import React, {Component} from 'react';
import {Link} from 'react-router';
import moment from 'moment';


export class LastActivityRow extends Component {

  render() {
    const {event} = this.props;
    return (
      <tr>
        <td><Link to={"/events/detail/" + event.id}>{event.name}</Link></td>
        <td><b>{moment(event.date).format("DD. MMMM YYYY")}</b></td>
      </tr>
    );
  }

}
