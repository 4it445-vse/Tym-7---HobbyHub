import React, {Component} from 'react';
import {DatePickerCustom} from './DatePicker'
import {CheckboxCustom} from './Checkbox'


export class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <DatePickerCustom/>
        <CheckboxCustom/>
      </div>
    );
  }
}
