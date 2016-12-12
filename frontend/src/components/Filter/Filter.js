import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import {DatePickerCustom} from './DatePicker'
import {CustomDatePicker} from '../DatePicker/CustomDatePicker.js';
import Select2 from 'react-select';
import moment from 'moment';
import api from '../../api.js';
import {connect} from 'react-redux';
import {isLoggedIn,getUserId} from '../Login/reducers';


export class FilterRaw extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleSelectTagChange = this.handleSelectTagChange.bind(this);
    this.state = {
      event: {}
    }
  }

  handleSelectTagChange(value) {
    const newState = {
      ...this.state
    }
    newState.event.tags = value;
    this.setState(newState);
  }

  fetchTags() {
    api('tags')
      .then((response) => {
        return response.data.map(function (tag) {
          return {value: tag.name, label: tag.name};
        })
      }).then((tagArray) => {
      const newState = {
        ...this.state
      }
      newState.tag_options = tagArray;
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
    const name = formData.get('name');
    const tags = formData.get('tags');
    const userId = this.props.isLoggedIn ? this.props.currentUserId : 0;
    const filterData = {
      dateFrom,
      dateTo,
      checkboxStatus,
      checkboxCapacity,
      name,
      tags,
      userId
    };

    console.log("filterData", filterData)

    api.post('events/filter', filterData)
      .then((response) => {
        console.log('response', response.data.events);
        this.props.filteredEvents(response.data.events);
      })
  }

  render() {
    const momentBeforeWeek = moment().subtract(7,'days');
    const momentNextWeek = moment().add(7,'days');
    return (
      <form onSubmit={this.handleFilterSubmit}>
        <div className="col-md-12">
          <div className="col-md-3">
            <div className="col-md-2">
              <label className="filter-label">Od:</label>
            </div>
            <div className="col-md-10">
              <CustomDatePicker
                startDate={momentBeforeWeek}
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
                startDate={momentNextWeek}
                id="date-to"
                name="date-to"
              />
            </div>
          </div>
          <div className="col-xs-4 col-md-2">
            <label className="box filter-label">&nbsp; Volná kapacita:</label>
            <Checkbox name="check-cap" defaultChecked={1}/>
          </div>
          {
            this.props.isLoggedIn
              ?
              <div className="col-xs-4 col-md-2">
                <label className="box filter-label">&nbsp; Jsem přihlášen:</label>
                <Checkbox name="check-stat"/>
              </div>
              :
              <div className="col-xs-4 col-md-2">
              </div>
          }
          <div className="col-xs-4 col-md-2">
            <button type="submit" name="submit" className="pull-right btn btn-default top-filter-buffer"
            >Filtrovat
            </button>
          </div>
          <div className="col-md-3">
            <div className="col-md-3">
              <label className="filter-label">Název:</label>
            </div>
            <div className="col-md-9">
              <input
                id="name"
                type="text"
                className="form-control"
                name="name"/>
            </div>
          </div>
          <div className="col-md-8">
            <div className="col-md-3">
              <label className="filter-label" htmlFor="tags">Kategorie:</label>
            </div>
            <div className="col-md-9">
              <Select2
                multi
                simpleValue
                placeholder="Vyberte kategorie"
                id="tags"
                name="tags"
                options={this.state.tag_options}
                value={this.state.event.tags}
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

function mapStateToProps(state) {
  const {login} = state;
  return {
    isLoggedIn: isLoggedIn(login),
    currentUserId: getUserId(login)
  };
}

export const Filter = connect(
  mapStateToProps,
  {}
)(FilterRaw);
