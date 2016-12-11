import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');

export class DatePickerCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    const {id, name} = this.props;
    return (
      <div>
        <DatePicker
          todayButton={"Dnes"}
          id={id}
          name={name}
          selected={this.state.startDate}
          onChange={this.handleChange}
          className="form-control"
          dateFormat="YYYY/MM/DD"
        /></div>)
  }
}
