import React, {Component} from 'react';
import {ImageNotFound} from '../../components/NotFound/ImageNotFound'
import moment from 'moment';
import {EVENT_ADDED,EVENT_ADD_FAILED, EVENT_WAITING} from './actions';

export class EventForm extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      event: {
        name: "",
        date: "2016-10-29T00:00:00.000Z",
        created: moment().toDate(),
        capacity: 0,
        tags: "",
        latitude: "50.0831937",
        longitude: "14.4331146",
        location: "",
        description: ""
      }
    }
  }

  onInputChange(event) {
    const eventName = event.target.name;
    const eventValue = event.target.value;
    const newState = {
      ...this.state
    }
    newState.event[eventName]=eventValue;
    this.setState(newState);
  }


  componentDidMount() {
    const {event} = this.props;
    if (typeof event !== "undefined") {
      this.setState({event})
    }
  }

  onFormSubmit(event){
    event.preventDefault();
    this.props.onFormSubmit(this.state.event);
  }

  render() {
    const {event} = this.state;
    const {actions, newEventState} = this.props;
    const {save, remove} = actions;
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="col-md-12">
            <h2>{event.name}</h2>
          </div>

          <div className="col-md-3">
            {event.picture !== null ?
              <img className="event-image" src={'/' + process.env.PUBLIC_URL + 'images/tenis.jpg'} alt="{name}"/> :
              <ImageNotFound width="200" height="150" className="event-image"/>
            }
            {save ?
                <button
                  name="choose-image"
                  onClick={(event)=>{event.preventDefault()}}
                  className="btn btn-default btn-lg choose-image"
                  required="required">
                  <i className="fa fa-upload" aria-hidden="true"/>
                  Vybrat obrázek
                </button>
              :
              ''
            }
          </div>

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
            <div className="col-md-12">
              <label>Lokace</label>
              <input
                required="required"
                id="location"
                name="location"
                onChange={this.onInputChange}
                type="text"
                className="form-control"
                defaultValue={event.location}/>
            </div>
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
            {save?
              <div className="col-md-12">
                <button type="submit" name="submit" className="btn btn-success btn-lg" required="required"
                        disabled={newEventState === EVENT_WAITING?'disabled':false}
                >Uložit</button>
              </div>
              :
              ''
            }
            {remove ?
              <div className="col-md-12">
                <button type="button" name="cancel" className="btn btn-danger btn-lg" required="required"
                        disabled={newEventState === EVENT_WAITING?'disabled':false}
                >Smazat</button>
              </div>
              :
              ''
            }

            {
              newEventState === EVENT_ADDED ?
                <div>Událost byla vytvořena</div> :
                (newEventState === EVENT_ADD_FAILED) ?
                  <div>Událost se nepodařilo vytvořit</div> :
                  ''
            }
          </div>
        </form>
      </div>
    )
  }
}