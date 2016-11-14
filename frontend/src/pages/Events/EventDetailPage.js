/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {ImageNotFound} from '../../components/NotFound/ImageNotFound'
import api from '../../api.js';
import moment from 'moment';
import {EventSignIn} from '../../components/EventList/EventSignIn'

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
    console.log(event)
    return (
      <div className="container content-container">

        {event === null ?
          <h1>Načítám...</h1> :

          <div>

            <div className="col-md-12">
              <h1>{event.name}</h1>
            </div>


            <div className="col-md-4">
              {event.picture?
                <img className="col-md-12" src={event.picture} alt="{name}"/> :
                <ImageNotFound width="200" height="150"/>
              }
            </div>

            <div className="col-md-8">
              <div className="col-md-12">
                <div className="col-md-12"><b>Autor</b> Ferda</div>
                <div className="col-md-12"><b>Datum</b> {moment(event.date).format("DD MMMM YYYY")}</div>
                <div className="col-md-12"><b>Kapacita</b> 1 / 2</div>
                <div className="col-md-12">
                  <label><b>Kategorie</b></label>
                  <div className="col-md-12">
                    <ul className="tag-cloud">
                      {event.tags.split(",").map((tag,index)=>
                        <li key={index}><a className="btn btn-xs btn-primary" href="#">{tag}</a></li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="">{event.description}</div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
            </div>
            <div className="col-md-5">
            </div>
            <div className="col-md-7">
            <EventSignIn eventId={event.id}/>
            </div>
          </div>
        }
      </div>
    );
  }
}
