/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {EventForm} from '../../components/EventList/EventForm'
import {connect} from 'react-redux'
import {addEvent} from '../../components/EventList/actions.js';

export class EventAddPageRaw extends Component {

  constructor(props){
    super(props);
    this.onFormSubmit=this.onFormSubmit.bind(this);
  }

  onFormSubmit(event){
    this.props.addEvent(event);
  }

  render() {
    const formActions = {
      save: true
    }

    return (
      <div className="container content-container">
        <EventForm actions={formActions} onFormSubmit={this.onFormSubmit}/>
      </div>
    );
  }
}

export const EventAddPage = connect(
  () => ({}),
  {addEvent}
)(EventAddPageRaw);
