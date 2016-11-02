import React, { Component } from 'react';
import { Link } from 'react-router'

export class EventListItem extends Component {
  render() {
    const { event } = this.props;
    const { tags, date, name, capacity, picture, attending, status,id } = event;
    return (
      <div className="portfolio-item apps col-xs-12 col-sm-4 col-md-3">
          <div className="recent-work-wrap">
              <img src={'/' + process.env.PUBLIC_URL + 'images/tenis.jpg'} alt="{name}"></img>
              <div className="overlay">
                  <div className="recent-work-inner">
                      <h3><Link to={"/events/"+id}>{name}</Link></h3>
                      <p className="date">{date}</p>
                  </div>
              </div>
          </div>
            <p className="capacity">{attending}/{capacity}</p>
            <p className="rsvp">{status}</p>
      </div>
    );
  }
}
