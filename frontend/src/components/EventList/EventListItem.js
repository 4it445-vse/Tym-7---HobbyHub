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

  /**
  Returns status of EventUser entity.
  */
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

  /**
  Returns count of EventUsers with accepted status.
  */
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
                      <p className="pull-left">{moment(event.date).format("DD MMMM YYYY")}</p><p className="pull-right">{this.getSignedUsersCount(event)}/{capacity}</p>
  </div>
              </div>
          </div>

        </Link></div>


      </div>
    );
  }
}
