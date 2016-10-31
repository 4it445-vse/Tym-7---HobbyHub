import React, { Component } from 'react';

export class EventListItem extends Component {
  render() {
    const { event } = this.props;
    const { tags, date, name, capacity, picture, attending, status } = event;
    return (
      <div className="portfolio-item apps col-xs-12 col-sm-4 col-md-3">
          <div className="recent-work-wrap">
              <img className="img-responsive" src="{picture}" alt="{name}"></img>
              <div className="overlay">
                  <div className="recent-work-inner">
                      <h3><a href="#">{name}</a></h3>
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
