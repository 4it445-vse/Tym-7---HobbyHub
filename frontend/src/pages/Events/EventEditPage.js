/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {ImageNotFound} from '../../components/NotFound/ImageNotFound'
import api from '../../api.js';
import moment from 'moment';
import Select2 from 'react-select';
import 'react-select/dist/react-select.css';

export class EventEditPage extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.state = {
      event: null,
      tag_options: []
    }
  }

  fetchEventDetailData() {
    const {eventId} = this.props.params;
    api('events/' + eventId)
      .then((response)=> {
        const newState = {
          ...this.state
        }
        newState.event=response.data;
        this.setState(newState);
      }).catch(()=> {

    });
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

  handleSelectTagChange(value) {
    const newState = {
      ...this.state
    }
    newState.event.tags=value;
    this.setState(newState);

  }

  componentDidMount() {
    this.fetchEventDetailData();
    this.fetchTags();
  }

  onInputChange(event) {
    const eventName = event.target.name;
    const eventValue = (event.target.type === "number") ?
        parseInt(event.target.value,10) :
        event.target.value
      ;
    const newState = {
      ...this.state
    }
    newState.event[eventName] = eventValue;
    this.setState(newState);
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
              <div className="col-md-12"><b>Datum</b><input type="text" className="form-control" value="2. října 2016"></input></div>
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
                <Select2
                  multi
                  simpleValue
                  placeholder="Vyberte kategorie"
                  id="tags"
                  name="tags"
                  value={this.state.event.tags}
                  options={this.state.tag_options}
                  joinValues
                  onChange={this.handleSelectTagChange}
                ></Select2>
              </div>
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
