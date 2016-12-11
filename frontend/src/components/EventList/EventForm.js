import React, {Component} from 'react';
import {ImageNotFound} from '../../components/NotFound/ImageNotFound'
import moment from 'moment';
import EVENT_STATES from './EventHelper';
import {GoogleMapAutocomplete} from '../GoogleMaps/GoogleMap';
import Modal from 'react-modal'
import {EventImagePicker} from './Pictures/EventImagePicker'
import {browserHistory} from 'react-router'
import Select2 from 'react-select';
import 'react-select/dist/react-select.css';
import api from '../../api.js';
import {CustomDatePicker} from '../DatePicker/CustomDatePicker.js';

export class EventForm extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSelectTagChange = this.handleSelectTagChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onGoogleMapChange = this.onGoogleMapChange.bind(this);
    this.onImageSelected = this.onImageSelected.bind(this);
  }

  handleSelectTagChange(value) {
    const newState = {
      ...this.state
    }
    newState.event.tags=value;
    this.setState(newState);
	}

  getDefaultState() {
    return {
      event: {
        name: "",
        date: "2016-10-29T00:00:00.000Z",
        created: moment().toDate(),
        capacity: "",
        tags: "",
        latitude: "",
        longitude: "",
        location: "",
        description: "",
        picture:""
      },
      modal: {
        isOpen: false
      },
      tag_options: []
    }
  }

  fetchTags() {
    api('tags')
      .then((response) => {
        return response.data.map(function(tag) {
          return {value: tag.name, label: tag.name};
        })
    }).then((tagArray) => {
      const newState = {
        ...this.state
      }
      newState.tag_options=tagArray;
      this.setState(newState);
    });
  }

  setDefaultState(){
    if(typeof this.props.event !== "undefined" && this.props.event !==null){
      const defaultState = this.getDefaultState();
      this.setState({
        ...defaultState,
        event:this.props.event
      })
    }else{
      this.state = this.getDefaultState();
    }
  }

  componentDidMount() {
    this.fetchTags();
  }

  componentWillMount(){
    this.setDefaultState();
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

  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { event } = this.state;
    const dt = new Date(formData.get('date'));
    event.date = moment(dt).toDate();
    console.log(event.target,dt);
    this.props.onFormSubmit(event);
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
    const {event} = this.state
    const {actions, eventState} = this.props;
    const {save, remove, edit} = actions;

    return (
      <div>
        {this.createModal()}

        <div className="col-md-3">
          <a className="btn btn-default" href="/">Zpět na výpis</a>
        </div>
        <div className="col-md-9">
          <h1 className="pull-left h1-height">{event.name}</h1>
        </div>

        <div className="col-md-3">
          {event.picture ?
            <img className="event-image" src={event.picture} alt="Obrázek události"/> :
            <ImageNotFound width="100%" height="150" className="event-image"/>
          }
          <button
            name="choose-image"
            onClick={this.openModal}
            className="btn btn-default btn-lg choose-image"
            required="required">
            <i className="fa fa-upload" aria-hidden="true"/>
            Vyberte obrázek události
          </button>
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
                value={event.name}/>
            </div>
            <div className="col-md-6">
              <label htmlFor="date">Datum</label>
              <CustomDatePicker
                  id="date"
                  name="date"
                  />
            </div>
            <div className="col-md-6">
              <label htmlFor="capacity">Kapacita</label>
              <input
                required="required"
                id="capacity"
                name="capacity"
                onChange={this.onInputChange}
                type="number"
                className="form-control"
                value={event.capacity}/>
            </div>
            <div className="col-md-12">
              <label htmlFor="tags">Kategorie</label>
              <Select2
                multi
                simpleValue
                placeholder="Vyberte kategorie"
                id="tags"
                name="tags"
                value={event.tags}
                options={this.state.tag_options}
                joinValues
                onChange={this.handleSelectTagChange}
              ></Select2>
            </div>
            <GoogleMapAutocomplete
              defaultLocation={event.location}
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
                value={event.description}/>
            </div>

            {save ?
              <div className="col-md-12">
                <button type="submit" name="action" value="submit" className="pull-right btn btn-success btn-lg" required="required"
                        disabled={eventState === EVENT_STATES.WAITING ? 'disabled' : false}
                >Uložit
                </button>
              </div>
              :
              ''
            }
            {/*{remove ?*/}
              {/*<div className="col-md-12">*/}
                {/*<button type="submit" name="action" value="delete" className="btn btn-danger btn-lg" required="required"*/}
                        {/*disabled={eventState === EVENT_STATES.WAITING ? 'disabled' : false}*/}
                {/*>Smazat*/}
                {/*</button>*/}
              {/*</div>*/}
              {/*:*/}
              {/*''*/}
            {/*}*/}
            {edit ?
              <div className="col-md-12">
                <button type="submit" name="action" value="edit" className="btn btn-success btn-lg" required="required"
                        disabled={eventState === EVENT_STATES.WAITING ? 'disabled' : false}
                >Upravit
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
