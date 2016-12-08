import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import {DatePickerCustom} from './DatePicker'
import {CustomDatePicker} from '../DatePicker/CustomDatePicker.js';
import moment from 'moment';



export class Filter extends Component {

  constructor(props) {
    super(props)
    moment.locale('cs');
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
  }

  handleFilterSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dt = new Date(formData.get('date-to'));
    event.date = moment(dt).toDate();
    console.log(dt);
}

  render() {
    return (
<form onSubmit={this.handleFilterSubmit}>
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
          <div className="col-xs-4 col-md-2">
            <label className="box filter-label">&nbsp; Jsem přihlášen:</label>
              <Checkbox
                    id="chstat"
                    name="chstat"/>
          </div>
          <div className="col-xs-4 col-md-2">
            <label className="box filter-label">&nbsp; Volná kapacita:</label><Checkbox/>
          </div>
          <div className="col-xs-4 col-md-2">
          <button type="submit" name="submit" className="pull-right btn btn-success btn-lg" required="required"
          >Filter
          </button>
    </div>
      </div>
      </form>
    );
  }
}
