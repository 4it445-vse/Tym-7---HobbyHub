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
  }

  fetchEvents() {
    api('events', {"params": {"filter": {"include": "users"}}})
      .then((response) => {
        this.setState({events: response.data});
      });
  }

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    const {events} = this.state;
    const {userId, isLoggedIn} = this.props;

    return (
      <div className="container content-container">
        <div className="center wow fadeInDown">
            <div className="col-xs-8 col-md-8">
              <h2 className="pull-left">Události</h2>
            </div>
          {isLoggedIn && <div className="col-xs-4 col-md-4">
              <Link className="pull-right btn btn-default top-buffer" to="/events/add">Vytvořit událost</Link>
            </div>}
        </div>
          <div className="row  filter">
            <Filter/>
          </div>

          <div className="row first-header-row">


          <div className="center wow fadeInDown">
            {events === null ?
              <div>Loading...</div> :
              <div>
                <EventList events={events} userId={userId}/>

              </div>
            }
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
