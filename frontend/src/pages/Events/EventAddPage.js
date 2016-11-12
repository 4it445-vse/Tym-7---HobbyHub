/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {EventForm} from '../../components/EventList/EventForm'
import {connect} from 'react-redux'
import api from '../../api'
import EVENT_STATE from '../../components/EventList/EventHelper'

export class EventAddPageRaw extends Component {

  constructor(props){
    super(props);
    this.onFormSubmit=this.onFormSubmit.bind(this);
    this.state={
      eventState:""
    }
  }

  onFormSubmit(event){
    this.setState({eventState:EVENT_STATE.WAITING})
    api.post('events', event)
      .then((response) => {
        this.setState({eventState:EVENT_STATE.SUCCESS})
        return {response: response.data};
      }).catch((error)=>{
        this.setState({eventState:EVENT_STATE.ERROR})
      console.warn(error);
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
  const {newEventState} = state.events;
  return {
    newEventState
  }
}

export const EventAddPage = connect(
  mapStateToProps,
  {}
)(EventAddPageRaw);
