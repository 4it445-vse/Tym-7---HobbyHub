/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../../api.js';
import moment from 'moment';
import {EventSignIn} from '../../components/EventList/EventSignIn'
import {GoogleMap} from '../../components/GoogleMaps/GoogleMap'

export class EventDetailPage extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    console.log("Costructor")
    this.state = {
      event: null
    }
  }

  fetchEventDetailData() {
    const {eventId} = this.props.params;
    const self = this;
    console.log('events/' + eventId)
    console.log(<api></api>)
    api('events/' + eventId)
      .then((response)=> {
        self.setState({
          event: response.data
        })
      }).catch((e)=> {
        console.warn(eventId,e);
    })
  }

  componentDidMount() {
    this.fetchEventDetailData()
  }

  getCoordinates() {
    if (this.state.event) {
      return {
        latitude: this.state.event.latitude,
        longitude: this.state.event.longitude
      }
    }
  }

  render() {
    const {event} = this.state
    const coordinates = this.getCoordinates();
    return (
      <div className="container content-container">

        {event === null ?
          <h1>Načítám...</h1> :

          <div>

            <div className="col-md-4">
            <a className="btn btn-default" href="/">Zpět na výpis</a>

            </div>

            <div className="col-md-8">
              <h1 className="pull-left">{event.name}</h1>
            </div>
            <div className="row"></div>

            <div className="col-xs-12 col-md-4">
              {event.picture ?
                <img className="col-xs-12 col-md-12" src={event.picture} alt="{name}"/> :
                ''
              }
              <div className="col-md-12">
                {/*<GoogleMap coordinates={coordinates}/>*/}
              </div>
            </div>

            <div className="col-xs-12 col-md-8">
              <div className="col-md-12">
                <div className="col-md-12"><b>Autor</b> Ferda</div>
                <div className="col-md-12"><b>Datum</b> {moment(event.date).format("DD MMMM YYYY")}</div>
                <div className="col-md-12"><b>Kapacita</b> 1 / 2</div>
                <div className="col-md-12">
                  <label><b>Kategorie</b></label>
                  <div className="col-md-12">
                    <ul className="tag-cloud">
                      {event.tags.split(",").map((tag, index)=>
                        <li key={index}><a className="btn btn-xs btn-primary" href="#">{tag}</a></li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="">{event.description}</div>
                </div>
              </div>


              <div className="col-md-12">
                <EventSignIn eventId={event.id}/>
              </div>


              <h2>Komentáře</h2>
                <div className="media comment_section">
                    <div className="pull-left post_comments">
                        <a href="#"><img src={event.picture} className="img-circle" alt="" /></a>
                    </div>
                    <div className="media-body post_reply_comments">
                        <h3>Marsh</h3>
                        <h4>{moment(event.date).format("DD MMMM YYYY")}</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                    </div>
                </div>
                <div className="media comment_section">
                    <div className="pull-left post_comments">
                        <a href="#"><img src={event.picture} className="img-circle" alt="" /></a>
                    </div>
                    <div className="media-body post_reply_comments">
                        <h3>Marsh</h3>
                        <h4>{moment(event.date).format("DD MMMM YYYY")}</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                    </div>
                </div>
                <div className="media comment_section">
                    <div className="pull-left post_comments">
                        <a href="#"><img src={event.picture} className="img-circle" alt="" /></a>
                    </div>
                    <div className="media-body post_reply_comments">
                        <h3>Marsh</h3>
                        <h4>{moment(event.date).format("DD MMMM YYYY")}</h4>
                        <p>Lorem ipsum dolor sit amet, adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                    </div>
                </div>

                <div id="contact-page clearfix">
                  <div className="message_heading">
                      <h4>Přidat komentář</h4>
                  </div>

                  <form id="main-contact-form" className="contact-form" name="contact-form" method="post" action="sendemail.php" role="form">
                      <div className="row">

                          <div className="col-xs-9 col-sm-9">
                            <div className="form-group">
                              <textarea name="message" id="message" required="required" className="form-control" rows="1"></textarea>
                            </div>
                          </div>
                          <div className="col-xs-3 col-sm-3">
                            <div className="form-group">
                              <button type="submit" className="btn btn-primary btn-lg" required="required">Odeslat</button>
                            </div>
                          </div>

                      </div>
                  </form>
                </div>

            </div>
          </div>
        }
      </div>
    );
  }
}
