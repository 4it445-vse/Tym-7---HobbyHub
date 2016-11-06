/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {EventForm} from '../../components/EventList/EventForm'
import {ImageNotFound} from '../../components/NotFound/ImageNotFound'
import api from '../../api.js';
import moment from 'moment';

export class EventAddPage extends Component {

  constructor(props){
    super(props);
    this.onFormSubmit.bind(this);
  }

  onFormSubmit(form){
    console.log(form);
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
