/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {EventForm} from '../../components/EventList/EventForm';
import {connect} from 'react-redux';
import api from '../../api';
import EVENT_STATE from '../../components/EventList/EventHelper';
import {browserHistory} from 'react-router';

export class EventAddPageRaw extends Component {

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      eventState: "",
      errors: []
    }
  }

  onFormSubmit(event) {
    const newState = {...this.state};
    newState.eventState = EVENT_STATE.WAITING;
    this.setState(newState)
    api.post('events', event)
      .then(response => {
          browserHistory.push("/events/detail/"+response.data.id);
      })
      .catch(error=> {
        const { response } = error;
        const { data } = response;
        const { errors } = data.error.details;
        newState.eventState = EVENT_STATE.ERROR;
        newState.errors = errors;
        console.log(errors);
        this.setState(newState)
      });
  }

  render() {
    const formActions = {
      save: true
    }
    const {eventState} = this.state

    return (
      <div className="container content-container">
        <EventForm actions={formActions} onFormSubmit={this.onFormSubmit} eventState={eventState}/>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
  }
};

export const EventAddPage = connect(
  mapStateToProps,
  {}
)(EventAddPageRaw);
