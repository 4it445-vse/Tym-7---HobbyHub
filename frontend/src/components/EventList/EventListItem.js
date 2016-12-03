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
      if (event.users[key].user_id === userId && event.users[key].status === 'accepted') {
        return 'Přihlášen';
      } else if (event.users[key].user_id === userId) {
        return 'Čeká na schválení';
      }
    }

    return '';
  }

  getSignedUsersCount(event) {
    return event.users.reduce((prev, user)=>{
      return user.status==="accepted" ? prev + 1 : prev;
    },0)
  }

  render() {
    const { event } = this.props;
    const { tags, date, name, capacity, picture, id } = event;
    const status = this.getSignedStatus();
    return (
      <div className="col-xs-12 col-sm-6 col-md-3">


      <div className="portfolio-item apps col-md-12"><Link to={"/events/detail/"+id}>
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
              <div className="col-xs-4 col-md-4">
                <p>{this.getSignedUsersCount(event)}/{capacity}</p>
              </div>
              <div className="col-xs-8 col-md-8">
                <p>{status}</p>
              </div>
            </div>
        </Link></div>


      </div>
    );
  }
}
