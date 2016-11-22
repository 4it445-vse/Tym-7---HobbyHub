import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';


export class EventListItem extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.state = {
      event: null
    }
  }

  getSignedStatus() {
    const {userId, event} = this.props;
    for (var key in event.users) {
      if (event.users[key].user_id === userId && event.users[key].status === 'confirmed') {
        return 'Přihlášen';
      } else if (event.users[key].user_id === userId) {
        return 'Čeká na schválení';
      }
    }

    return '';
  }

  getSignedUsersCount(event) {
    var count = 0;
    for (var key in event.users) {
      if (event.users[key].status === 'confirmed') {
        count++;
      }
    }

    return count;
  }

  render() {
    const { event } = this.props;
    const { tags, date, name, capacity, picture, id } = event;
    const status = this.getSignedStatus();
    return (
      <div className="col-xs-12 col-md-4">






      <div className="col-md-1"></div>

      <div className="portfolio-item apps col-md-10"><Link to={"/events/detail/"+id}>
          <div className="recent-work-wrap">
            {event.picture?
              <img src={event.picture} alt="{name}"/>:
              <img src={'/' + process.env.PUBLIC_URL + 'images/tenis.jpg'} alt="{name}"/>
            }
              <div className="overlay">
                  <div className="recent-work-inner">
                      <h3><Link to={"/events/detail/"+id}>{name}</Link></h3>
                      <p className="date">{moment(event.date).format("DD MMMM YYYY")}</p>
                  </div>
              </div>
          </div>
            <div className="event-details">
              <p className="capacity">{this.getSignedUsersCount(event)}/{capacity}</p>
              <p className="rsvp">{status}</p>
            </div>
        </Link></div>
      <div className="col-sm-1 col-md-1"></div>

      </div>
    );
  }
}
