import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

require('react-datepicker/dist/react-datepicker.css');

export class CustomDatePicker extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        if(this.props.startDate){
            this.setState({
                startDate: this.props.startDate
            })
        }else{
            this.setState({
                startDate: moment()
            })
        }
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        const {id, name} = this.props;
        return <DatePicker
            todayButton={"Dnes"}
            id={id}
            name={name}
            selected={this.state.startDate}
            onChange={this.handleChange}
            dateFormat="DD.MM.YYYY"
            className="form-control"
            />;
    }
}
