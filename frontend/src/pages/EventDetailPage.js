/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {ImageNotFound} from '../components/NotFound/ImageNotFound'
import api from '../api.js';
import moment from 'moment';

export class EventDetailPage extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.state = {
      event: null
    }
  }

  fetchEventDetailData() {
    const {eventId} = this.props.params;
    api('events/' + eventId)
      .then((response)=> {
        this.setState({event: response.data})
      }).catch(()=> {

    })
  }

  componentDidMount() {
    this.fetchEventDetailData()
  }

  render() {
    const {event} = this.state
    return (
      <div className="container content-container">
        {event == null ?
          <h1>Načítám...</h1> :
          <div>
            <h2>{event.name}</h2>
            {event.picture !==null?
              <img className="col-md-4" src={event.picture}/>:
              <ImageNotFound width="200" height="150" />
            }
            <div className="col-md-6">{event.description}</div>
            <div className="col-md-6">{moment(event.date).format("DD MMMM YYYY")}</div>
            <div className="col-md-4">
              {event.tags.split(",").map((tag)=>
                tag
              )}
            </div>
          </div>
        }
      </div>
    );
  }
}
