/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {EventForm} from '../../components/EventList/EventForm'
import {connect} from 'react-redux'
import {addEvent,eventWaiting} from '../../components/EventList/actions.js';

export class EventAddPageRaw extends Component {

  constructor(props){
    super(props);
    this.onFormSubmit=this.onFormSubmit.bind(this);
    this.state={
       newEventState:"new"
    }
  }

  onFormSubmit(event){
    this.props.addEvent(event);
  }

  render() {
    const formActions = {
      save: true
    }
    const {newEventState} = this.props;

    return (
      <div className="container content-container">
        <EventForm actions={formActions} onFormSubmit={this.onFormSubmit} newEventState={newEventState}/>
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
  {addEvent,eventWaiting}
)(EventAddPageRaw);
