/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {EventList} from '../components/EventList/EventList.js';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getUserId, isLoggedIn} from '../components/Login/reducers.js';
import {Filter} from '../components/Filter/Filter.js';

export class HomePageRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      isLoading: 0
    };
    this.filteredEvents = this.filteredEvents.bind(this);
  }

  /**
   Loads events from api to be displayed on default homepage. Sets these events to state.
   */
  fetchEvents() {
    api('events', {"params": {"filter": {"include": "users"}}})
      .then((response) => {
        const newState = {
          ...this.state
        }
        newState.events = response.data;
        this.setState(newState);
        //this.setState({events: response.data});
      });
  }

  /**
   Sets given events to state. Used when events are loaded by filter.
   */
  filteredEvents(events) {
    const newState = {
      ...this.state
    }
    newState.events = events;
    this.setState(newState);
  }

  getAcceptedUserEventIds(userId) {
    api('eventusers', {
      "params": {
        "filter": {
          "where": {
            "and": [

              {"user_id": userId},
              {"or":[
                {"status": "accepted"},
                {"status": "pending"},
                {"status": "rejected"}
              ]}

            ]
          },
        }
      }
    }).then((response) => {
      console.log('responsedata',response.data);
      var signedEventIds = {
        "accepted": [],
        "pending": [],
        "rejected": []
      };
      response.data.forEach(function (eventuser) {
        signedEventIds[eventuser.status].push(eventuser.event_id);
    //      signedEventIds.push(eventuser.event_id);
      });

      const newState = {
        ...this.state
      }
      newState.signedEventIds = signedEventIds;
      this.setState(newState);

    //  this.setState({signedEventIds: signedEventIds});
    });
  }

  componentDidMount() {
    this.fetchEvents();
    this.getAcceptedUserEventIds(this.props.userId);
  }

  render() {
    const {events} = this.state;
    const {userId, isLoggedIn} = this.props;

    return (
      <div className="container content-container">

        <div className="row  filter">
          <Filter filteredEvents={this.filteredEvents}/>
        </div>
        {!isLoggedIn &&
        <h2 className="not-logged">Pro vytváření událostí se musíte přihásit. Pokud ještě nemáte účet, <Link
          to="/registration">zaregistrujte se</Link>.</h2>
        }
        <div className="row first-header-row">
          <div className="center wow fadeInDown">
            <section id="portfolio">
              <div className="row">
                <div className="portfolio-items">
                  {isLoggedIn &&
                  <div className="col-xs-12 col-sm-6 col-md-3">
                    <div className="portfolio-item apps col-md-12"><Link to="/events/add">
                      <div className="recent-work-wrap create-new-event">
                        <img src={'/' + process.env.PUBLIC_URL + 'images/trophy.svg'} alt=""/>
                        <h3>Vyvořit událost</h3>
                      </div>
                    </Link></div>
                  </div>
                  }
                  {events === null ?
                    <div>Načítání...</div> :
                    <div>
                      <EventList events={events} userId={userId} signedEventIds={this.state.signedEventIds}/>
                    </div>
                  }
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const {login} = state;
  return {
    userId: getUserId(login),
    isLoggedIn: isLoggedIn(login)
  };
}

export const HomePage = connect(
  mapStateToProps,
  {}
)(HomePageRaw);
