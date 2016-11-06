import React, {Component} from 'react';
import {ImageNotFound} from '../../components/NotFound/ImageNotFound'
import api from '../../api.js';
import moment from 'moment';


export class EventForm extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      event: {
        name: "",
        date: "",
        capacity: 0,
        tags: "0",
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

  render() {
    console.log(this.state);
    const {event} = this.state;
    const {actions} = this.props;
    const {save, remove} = actions;
    return (
      <div>
        <form>
          <div className="col-md-12">
            <h2>{event.name}</h2>
          </div>

          {event.picture !== null ?
            <img className="col-md-3" src={'/' + process.env.PUBLIC_URL + 'images/tenis.jpg'} alt="{name}"/> :
            <ImageNotFound width="200" height="150"/>
          }
          <div className="col-md-9">

            <div className="col-md-12">
              <label htmlFor="name">Název</label>
              <input
                id="name"
                type="text"
                name="name"
                onChange={this.onInputChange}
                className="form-control"
                defaultValue={event.name}/>
            </div>
            <div className="col-md-12">
              <label htmlFor="capacity">Kapacita</label>
              <input
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
                defaultValue={event.description}/></div>
          </div>
        </form>

        {save?
          <div className="col-md-2">
            <button type="submit" name="submit" className="btn btn-success btn-lg" required="required">Uložit</button>
          </div>
          :
          ''
        }
        {remove?
          <div className="col-md-2">
            <button type="button" name="cancel" className="btn btn-danger btn-lg" required="required">Smazat</button>
          </div>
          :
          ''
        }
      </div>
    )
  }
}