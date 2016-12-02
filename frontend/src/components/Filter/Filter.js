import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import {DatePickerCustom} from './DatePicker'


export class Filter extends Component {
  render() {
    return (
      <div className="col-md-12 filter">
        <div className="col-md-4">
        <label>&nbsp; Datum od:</label><DatePickerCustom/>
        </div>
        <div className="col-md-4">
        <label>&nbsp; Datum do:</label><DatePickerCustom/>
        </div>
        <div className="col-md-4">
        <div className="col-md-12">
        <label className="box">&nbsp; Jsem přihlášen:</label><Checkbox/>
        </div>
        <div className="col-md-12">
        <label className="box">&nbsp; Volná kapacita:</label><Checkbox/>
        </div>
        </div>
        </div>
    );
  }
}
