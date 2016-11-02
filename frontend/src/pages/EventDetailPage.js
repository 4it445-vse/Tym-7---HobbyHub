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

            <div className="col-md-12">
              <h2>{event.name}</h2>
            </div>

            {event.picture !==null?
              <img className="col-md-3" src={'/' + process.env.PUBLIC_URL + 'images/tenis.jpg'} alt="{name}"/>:
              //<img className="col-md-4" src={event.picture}/>:
              <ImageNotFound width="200" height="150" />
            }

            <div className="col-md-6"><b>Autor</b> Ferda</div>
            <div className="col-md-6"><b>Datum</b> {moment(event.date).format("DD MMMM YYYY")}</div>
            <div className="col-md-6"><b>Kapacita</b> 1 / 2</div>
            <div className="col-md-4">
              <label><b>Kategorie</b></label>
              <div className="col-md-12">
                <ul className="tag-cloud">
                  {event.tags.split(",").map((tag)=>
                    <li><a class="btn btn-xs btn-primary" href="#">{tag}</a></li>
                  )}
                  </ul>
              </div>
            </div>
            <div className="col-md-6">{event.description}</div>

          </div>
        }

      </div>
    );
  }
}
