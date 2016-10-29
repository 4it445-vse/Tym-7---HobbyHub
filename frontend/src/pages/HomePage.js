/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import { EventList } from '../components/EventList/EventList.js';
import { connect } from 'react-redux';
import { addEvent } from '../actions/eventActions.js';

export class HomePageRaw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: null
        };
    }

    fetchEvents() {
        api('events')
            .then((response) => {
                this.setState({ events: response.data });
            });
    }

    componentDidMount() {
        this.fetchEvents();
    }

    onEventAdd() {
        const { addEvent } = this.props;
        //demo data for event adding
        addEvent({"tags":"tenis", "date":"2016-10-29T00:00:00.000Z"});
        //slowing down script because it is faster than db
        setTimeout(() => {this.fetchEvents()}, 250);
    }

  render() {
    const { events } = this.state;
    return (
<div className="homepage">
<header id="header">
  <div className="top-bar">
      <div className="container">
          <div className="row">
              <div className="col-sm-6 col-xs-4">
              </div>
              <div className="col-sm-6 col-xs-8">
                 <div className="social">
                      <ul className="social-share">
                          <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                          <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                          <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                          <li><a href="#"><i className="fa fa-dribbble"></i></a></li>
                          <li><a href="#"><i className="fa fa-skype"></i></a></li>
                      </ul>
                      <div className="search">
                          <form role="form">
                              <input type="text" className="search-form" autoComplete="off" placeholder="Search"/>
                              <i className="fa fa-search"></i>
                          </form>
                     </div>
                 </div>
              </div>
          </div>
      </div>
  </div>

  <nav className="navbar navbar-inverse" role="banner">
      <div className="container">
          <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="index.html"><img src="../images/logo.png" alt="logo"></img></a>
          </div>

          <div className="collapse navbar-collapse navbar-right">
          <a className="navbar-brand" href="index.html"><img src="../images/logo.png" alt="avatar"></img></a>
              <ul className="nav navbar-nav">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="portfolio.html">Profil</a></li>
                  <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">Menu <i className="fa fa-angle-down"></i></a>
                      <ul className="dropdown-menu">
                          <li><a href="blog-item.html">Nastavení</a></li>
                          <li><a href="pricing.html">Odhlásit se</a></li>
                      </ul>
                  </li>
              </ul>
          </div>
      </div>
  </nav>

</header>
<section id="recent-works">
        <div className="container">
            <div className="center wow fadeInDown">
                <button
                    onClick={() => this.onEventAdd()}
                    type="button"
                    className="btn btn-success"
                    >
                    <span
                        className="glyphicon glyphicon-plus"
                        aria-hidden="true">
                    </span> Add Event
                </button>
                <h2>Eventy</h2>
                <p className="lead">
                    {events === null ?
                    <div>Loading...</div> :
                    <EventList events={events}/>
                    }
                </p>
            </div>
            </div>
</section>
<footer id="footer" className="midnight-blue">
    <div className="container">
        <div className="row">
            <div className="col-sm-6">
                &copy; 2016 <a target="_blank" href="http://hobbyhub.com/" title="Chci hrát, ale nemám s kým">HobbyHub</a>. All Rights Reserved.
            </div>
        </div>
    </div>
</footer>
</div>
    );
  }
}

export const HomePage = connect(
    () => ({}),
    { addEvent }
)(HomePageRaw);
