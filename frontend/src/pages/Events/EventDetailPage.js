/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../../api.js';
import moment from 'moment';
import {EventSignIn} from '../../components/EventList/EventSignIn'
import {GoogleMap} from '../../components/GoogleMaps/GoogleMap'
import {getUserId} from '../../components/Login/reducers.js';
import {connect} from 'react-redux'
import {ListOfUsersForm} from '../../components/EventDetailAdmin/ListOfUsersForm'

export class EventDetailPageRaw extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.state = {
      event: null
    }
  }

  fetchEventDetailData() {
    const {eventId} = this.props.params;
    const self = this;
    api('events/' + eventId, {"params": {"filter":{"include": ["users","user"]}}})
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

  getSignedUsersCount(event) {
    return event.users.reduce((prev,current)=>{
      if(current.status==='confirmed') return prev + 1
    },0);
  }

  isEventCreatedByMe(event){
    return (event && event.user && (event.user.id===this.props.getUserId))
  }

  render() {
    const {event} = this.state;
    const coordinates = this.getCoordinates();
    return (
      <div className="container content-container">

        {event === null ?
          <h1>Načítám...</h1> :

          <div>

            <div className="col-md-12">
              <h1>{event.name}</h1>
            </div>


            <div className="col-md-4">
              {event.picture ?
                <img className="col-md-12" src={event.picture} alt="{name}"/> :
                ''
              }
              <div className="col-md-12">
                {/*<GoogleMap coordinates={coordinates}/>*/}
              </div>
            </div>

            <div className="col-md-8">
              <div className="col-md-12">
                <div className="col-md-12"><b>Autor</b> Ferda</div>
                <div className="col-md-12"><b>Datum</b> {moment(event.date).format("DD MMMM YYYY")}</div>
                <div className="col-md-12"><b>Kapacita</b> {this.getSignedUsersCount(event)} / {event.capacity}</div>
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
            </div>
            <div className="col-md-12">
            </div>
            <div className="col-md-5">
            </div>
            <div className="col-md-7">
              {
                this.isEventCreatedByMe(event)
                  ?
                 <ListOfUsersForm eventId={event.id}  />
                :
                <EventSignIn eventId={event.id} isFull={event.capacity <= this.getSignedUsersCount(event)}/>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {login} = state;
  return {
    getUserId: getUserId(login),
  };
}

export const EventDetailPage = connect(
  mapStateToProps,
  {}
)(EventDetailPageRaw);

