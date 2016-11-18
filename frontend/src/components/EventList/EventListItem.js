import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';


export class EventListItem extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.state = {
      event: null
    }
  }

  render() {
    const { event } = this.props;
    const { tags, date, name, capacity, picture, attending, status,id } = event;
    return (
      <div className="col-xs-12 col-md-3">


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
              <div className="col-xs-6 col-md-6">
                <p>{attending}/{capacity}</p>
              </div>
              <div className="col-xs-6 col-md-6">
                <p>{status}<Link className="btn btn-default" to="/events/add">Přihlásit se</Link></p>
              </div>
            </div>
        </Link></div>


      </div>
    );
  }
}
