import React, {Component} from 'react';
import {ImageNotFound} from '../../components/NotFound/ImageNotFound'
import moment from 'moment';
import EVENT_STATES from './EventHelper';
import {GoogleMapAutocomplete} from '../GoogleMaps/GoogleMap';
import Modal from 'react-modal'
import {EventImagePicker} from './Pictures/EventImagePicker'
import {browserHistory} from 'react-router';
import {CustomDatePicker} from '../DatePicker/CustomDatePicker.js';

export class EventForm extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onGoogleMapChange = this.onGoogleMapChange.bind(this);
    this.onImageSelected = this.onImageSelected.bind(this);

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      event: {
        name: "",
        date: "2016-10-29T00:00:00.000Z",
        created: moment().toDate(),
        capacity: 2,
        tags: "",
        latitude: "",
        longitude: "",
        location: "",
        description: "",
        picture:""
      },
      modal: {
        isOpen: false
      }
    }
  }

  onInputChange(event) {
    const eventName = event.target.name;
    const eventValue = (event.target.type === "number") ?
        parseInt(event.target.value) :
        event.target.value
      ;
    const newState = {
      ...this.state
    }
    newState.event[eventName] = eventValue;
    this.setState(newState);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state.event);
  }

  onGoogleMapChange(location, address) {
    const newState = {
      ...this.state
    }
    newState.event.latitude = location.lat();
    newState.event.longitude = location.lng();
    newState.event.location = address;
    this.setState(newState)
  }

  onImageSelected(src){
    const newState = {
      ...this.state
    }
    newState.modal.isOpen=false;
    newState.event.picture=src;
    this.setState(newState);
  }


  openModal(event) {
    event.stopPropagation();
    const newState = {
      ...this.state
    }
    newState.modal.isOpen = true;
    this.setState(newState);
  }

  createModal(){
    return (
      <div>
        <Modal
          isOpen={this.state.modal.isOpen}
          contentLabel="Vyberte obrázek události"
        >
          <EventImagePicker onImageSelected={this.onImageSelected}/>
        </Modal>
      </div>
    )
  }

  render() {
    const {event} = this.state;
    const {actions, eventState} = this.props;
    const {save, remove} = actions;

    if (eventState === EVENT_STATES.SUCCESS) {
      // browserHistory.push("/")
    }

    return (
      <div>
        {this.createModal()}

        <div className="col-md-12">
          <h1 className="h1-height">{event.name}</h1>
        </div>

        <div className="col-md-3">
          {event.picture ?
            <img className="event-image" src={event.picture} alt="Obrázek události"/> :
            <ImageNotFound width="100%" height="150" className="event-image"/>
          }
          {save ?
            <button
              name="choose-image"
              onClick={this.openModal}
              className="btn btn-default btn-lg choose-image"
              required="required">
              <i className="fa fa-upload" aria-hidden="true"/>
              Vyberte obrázek události
            </button>
            :
            ''
          }
          <div ref="googleMap" id="google-map"/>
        </div>

        <form onSubmit={this.onFormSubmit}>

          <div className="col-md-9">

            <div className="col-md-12">
              <label htmlFor="name">Název</label>
              <input
                required="required"
                id="name"
                type="text"
                name="name"
                onChange={this.onInputChange}
                className="form-control"
                defaultValue={event.name}/>
            </div>

            <div className="col-md-12">
              <label htmlFor="date">Datum</label>
              <CustomDatePicker
                  id="date"
                  name="date"
                  />
            </div>

            {/*<label htmlFor="date">Date</label>*/}
            <div className="col-md-12">
              <label htmlFor="capacity">Kapacita</label>
              <input
                required="required"
                id="capacity"
                name="capacity"
                onChange={this.onInputChange}
                type="number"
                className="form-control"
                defaultValue={event.capacity}/>
            </div>
            <div className="col-md-12">
              <label htmlFor="tags">Kategorie</label>
              <input
                required="required"
                id="tags"
                name="tags"
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                defaultValue={event.tags}/>
            </div>
            <GoogleMapAutocomplete
              onChange={(location, address)=>this.onGoogleMapChange(location, address)}
              mapId="google-map"/>
            <div className="col-md-12">
              <label htmlFor="description">Popis</label>
              <textarea
                id="description"
                name="description"
                onChange={this.onInputChange}
                required="required"
                className="form-control" rows="8"
                defaultValue={event.description}/>
            </div>
            {save ?
              <div className="col-md-12">
                <button type="submit" name="submit" className="pull-right btn btn-success btn-lg" required="required"
                        disabled={eventState === EVENT_STATES.WAITING ? 'disabled' : false}
                >Uložit
                </button>
              </div>
              :
              ''
            }
            {remove ?
              <div className="col-md-12">
                <button type="button" name="cancel" className="btn btn-danger btn-lg" required="required"
                        disabled={eventState === EVENT_STATES.WAITING ? 'disabled' : false}
                >Smazat
                </button>
              </div>
              :
              ''
            }

            {
              eventState === EVENT_STATES.SUCCESS ?
                <div>Událost byla vytvořena</div> :
                (eventState === EVENT_STATES.ERROR) ?
                  <div>Událost se nepodařilo vytvořit</div> :
                  ''
            }
          </div>
        </form>
      </div>
    )
  }
}
