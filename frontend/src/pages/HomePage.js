/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {EventList} from '../components/EventList/EventList.js';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { getUserId } from '../components/Login/reducers.js';
import {Filter} from '../components/Filter/Filter.js';
import {Checkbox1} from '../components/Filter/Checkbox.js';
import {Datepicker} from '../components/Filter/Datepicker.js';

export class HomePageRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      isLoading: 0
    };
  }

  fetchEvents() {
    api('events', {"params": {"filter":{"include": "users"}}})
      .then((response) => {
        this.setState({events: response.data});
      });
  }

  componentDidMount() {
    this.fetchEvents();
  }
  render() {
    const {events} = this.state;
    const {userId} = this.props;

    return (
      <div className="container content-container">
        <div className="center wow fadeInDown">
          <h2>Události</h2>
          <div className="search-form">
          <Datepicker/>
          <Checkbox1/>

      {/*    <form className="form-wrapper cf">
            	<input onChange={this.handleSearchChange}
              type="text" placeholder="Hledat události..." required/>
          	  <button type="submit">Hledat</button>
          </form> */}
          </div>

          {events === null ?
            <div>Loading...</div> :
            <div>
              <EventList events={events} userId={userId}/>
              <Link className="btn btn-success btn-lg" to="/events/add">Přidat</Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { login } = state;
  return {
    userId: getUserId(login)
  };
}

export const HomePage = connect(
  mapStateToProps,
  {}
)(HomePageRaw);
