import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import {DatePickerCustom} from './DatePicker'
import {CustomDatePicker} from '../DatePicker/CustomDatePicker.js';
import moment from 'moment';
import api from '../../api.js';



export class Filter extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
  }

  handleFilterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dateTo = new Date(formData.get('date-to'));
    const dateFrom = new Date(formData.get('date-from'));
    const checkboxStatus = formData.get('check-stat');
    const checkboxCapacity = formData.get('check-cap');
    var filterData = {dateFrom: dateFrom, dateTo: dateTo, checkboxStatus: checkboxStatus, checkboxCapacity: checkboxCapacity};

    formData.append('data',JSON.stringify(filterData)
    );

    console.log(formData);

    api.post('orders/submit', formData)
  .then(({ data }) => {
    this.setState({ event: {} });
  })
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
          <button type="submit" name="submit" className="pull-right btn btn-default" required="required"
          >Filtrovat
          </button>
    </div>
      </div>
      </form>
    );
  }
}
