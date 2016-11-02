/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {ImageNotFound} from '../components/NotFound/ImageNotFound'
import api from '../api.js';
import moment from 'moment';

export class EventEditPage extends Component {

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
            <div className="col-md-9">

              <div className="col-md-12"><b>Název</b><input type="text" className="form-control" value="Tenis dvojhra s ferdou"></input></div>
              <div className="col-md-12"><b>Datum</b><input type="text" className="form-control" value="2. října 2016"></input></div>
              <div className="col-md-12"><b>Kapacita</b><input type="number" className="form-control" value="10"></input></div>
              <div className="col-md-12"><b>Kategorie</b><input type="text" className="form-control" value="tenis, sport, Ferda"></input></div>
              <div className="col-md-12"><b>Lokace</b><input type="text" className="form-control" value="Koněvova, Praha 3"></input></div>
              <div className="col-md-12"><b>Popis</b><textarea name="message" id="message" required="required" className="form-control" rows="8"></textarea></div>

              <div className="col-md-2">
                  <button type="button" name="cancel" className="btn btn-warning btn-lg" required="required">Zrušit</button>
              </div>
              <div className="col-md-2">
                  <button type="button" name="cancel" className="btn btn-danger btn-lg" required="required">Smazat</button>
              </div>
              <div className="col-md-2">
                  <button type="submit" name="submit" className="btn btn-success btn-lg" required="required">Uložit</button>
              </div>

            </div>

          </div>
        }

      </div>
    );
  }
}
