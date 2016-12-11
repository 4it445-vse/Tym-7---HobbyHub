import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import {DatePickerCustom} from './DatePicker'
import {CustomDatePicker} from '../DatePicker/CustomDatePicker.js';
import Select2 from 'react-select';
import moment from 'moment';
import api from '../../api.js';



export class Filter extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleSelectTagChange = this.handleSelectTagChange.bind(this);
  }

  handleSelectTagChange(value) {
    const newState = {
      ...this.state
    }
    newState.event.tags=value;
    this.setState(newState);
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
  componentDidMount() {
    this.fetchTags();
  }

  handleFilterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dateTo = new Date(formData.get('date-to'));
    const dateFrom = new Date(formData.get('date-from'));
    const checkboxStatus = formData.get('check-stat');
    const checkboxCapacity = formData.get('check-cap');
    var filterData = {dateFrom: dateFrom, dateTo: dateTo, checkboxStatus: checkboxStatus, checkboxCapacity: checkboxCapacity};

    const test = "heracek"


    api.post('events/filter', test)
       .then((response) => {
         console.log('response',response);

     })



/*    for (var pair of formData.entries())
{
 console.log(pair[0]+ ', '+ pair[1]);
}*/

  }

  render() {
    return (
<form onSubmit={this.handleFilterSubmit}>
      <div className="col-md-12">
          <div className="col-md-3">
            <div className="col-md-2">
              <label className="filter-label">Od:</label>
            </div>
            <div className="col-md-10">
              <CustomDatePicker
                    id="date-from"
                    name="date-from"
                    />
            </div>
          </div>
          <div className="col-md-3">
            <div className="col-md-2">
              <label className="filter-label">Do:</label>
            </div>
            <div className="col-md-10">
              <CustomDatePicker
                    id="date-to"
                    name="date-to"
                    />
            </div>
          </div>
          <div className="col-xs-4 col-md-2">
            <label className="box filter-label">&nbsp; Jsem přihlášen:</label>
              <Checkbox name="check-stat"/>
          </div>
          <div className="col-xs-4 col-md-2">
            <label className="box filter-label">&nbsp; Volná kapacita:</label><Checkbox name="check-cap"/>
          </div>
          <div className="col-xs-4 col-md-2">
          <button type="submit" name="submit" className="pull-right btn btn-default top-filter-buffer" required="required"
          >Filtrovat
          </button>
    </div>
    <div className="col-md-3">
      <div className="col-md-3">
        <label className="filter-label">Místo:</label>
      </div>
      <div className="col-md-9">
      <input
        required="required"
        id="place"
        type="text"
        className="form-control"
        name="place"/>
      </div>
    </div>
    <div className="col-md-3">
      <div className="col-md-3">
        <label className="filter-label">Název:</label>
      </div>
      <div className="col-md-9">
      <input
        required="required"
        id="name"
        type="text"
        className="form-control"
        name="name"/>
      </div>
    </div>
    <div className="col-md-4">
      <div className="col-md-4">
        <label className="filter-label" htmlFor="tags">Kategorie:</label>
      </div>
      <div className="col-md-8">
      <Select2
        multi
        simpleValue
        placeholder="Vyberte kategorie"
        id="tags"
        name="tags"
        joinValues
        onChange={this.handleSelectTagChange}
      ></Select2>
      </div>
    </div>


      </div>
      </form>
    );
  }
}
