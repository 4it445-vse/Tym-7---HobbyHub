import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import {DatePickerCustom} from './DatePicker'
import {CustomDatePicker} from '../DatePicker/CustomDatePicker.js';
import moment from 'moment';



export class Filter extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
  }

  handleFilterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);
}

  render() {
    return (

      <div className="col-md-12">
          <div className="col-md-4">
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
          <div className="col-md-4">
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
          <div className="col-xs-6 col-md-2">
            <label className="box filter-label">&nbsp; Jsem přihlášen:</label><Checkbox/>
          </div>
          <div className="col-xs-6 col-md-2">
            <label className="box filter-label">&nbsp; Volná kapacita:</label><Checkbox/>
          </div>
          <div>
      <button onClick={this.handleFilterSubmit} className="pull-right btn btn-success btn-lg" type="submit">Filter</button>
    </div>
      </div>
    );
  }
}
