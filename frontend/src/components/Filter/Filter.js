import React, {Component} from 'react';
import Checkbox from 'rc-checkbox';
import {CustomDatePicker} from '../DatePicker/CustomDatePicker.js';
import Select2 from 'react-select';
import moment from 'moment';
import api from '../../api.js';
import {connect} from 'react-redux';
import {isLoggedIn,getUserId} from '../Login/reducers';


export class FilterRaw extends Component {

  constructor(props) {
    super(props);
    moment.locale('cs');
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleSelectTagChange = this.handleSelectTagChange.bind(this);
    this.clickedButton = this.clickedButton.bind(this);
    this.state = {
      event: {},
      datepickerRandomKey: 'abcd1234'
    }
  }

  /**
  Loads user by id and saves him to state.
  */
  fetchUser(requestedUserId) {
    if (requestedUserId) {
      api.get('appusers/'+requestedUserId)
          .then(({ data }) => this.setState({userData: data}));
    }
  }

  /**
  Called when selecting tags from select2. Saves tags to state.
  */
  handleSelectTagChange(value) {
    const newState = {
      ...this.state
    }
    newState.event.tags = value;
    this.setState(newState);
  }

  /**
  Loads tags from api and saves them to state.
  */
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
    this.fetchUser(this.props.currentUserId);
  }

  /**
  On filter submittion, calls api post to load events by filter params.
  */
  handleFilterSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dateTo = (moment(formData.get('date-to')).isValid() === false)
      ? moment().add(1,'years').format()
      : new Date(formData.get('date-to'));

    const dateFrom = (moment(formData.get('date-from')).isValid() === false)
      ? moment().subtract(1,'years').format()
      : new Date(formData.get('date-from'));

    const checkboxStatus = formData.get('check-signed');
    const checkboxCapacity = formData.get('check-cap');
    const name = formData.get('name');
    const tags = formData.get('tags');
    const signedUserId = this.props.isLoggedIn && formData.get('check-signed') ? this.props.currentUserId : null;
    const showPast = formData.get('checkpast');
    const authorId = this.props.isLoggedIn && formData.get('check-author') ? this.props.currentUserId : null;
    const checkboxPrefered = formData.get('check-prefered');

    const filterData = {
      dateFrom,
      dateTo,
      checkboxStatus,
      checkboxCapacity,
      name,
      tags,
      signedUserId,
      authorId,
      showPast,
      preferedTags: (this.props.isLoggedIn && checkboxPrefered) ? this.state.userData.prefered_tags : null
    };

    api.post('events/filter', filterData)
      .then((response) => {
        this.props.filteredEvents(response.data.events);
      })
  }

  clickedButton(button) {
    if (button === "reset") {
      var eventForm = document.getElementById("eventForm")
      eventForm.reset();
      eventForm.checkpast.click();
      const newState = {
        ...this.state
      }
      newState.event.tags = null;
      newState.datepickerRandomKey = Math.random().toString(36).substring(10);
      this.setState(newState);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleFilterSubmit} ref="form" id="eventForm">
        <div className="col-md-12">

          <div className="row">

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

            <div className="col-md-6">
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

          <div className="row">

            <div className="col-md-3">
              <div className="col-md-3">
                <label className="filter-label">Od:</label>
              </div>
              <div className="col-md-9">
                <CustomDatePicker
                  key={this.state.datepickerRandomKey}
                  startDate={null}
                  id="date-from"
                  name="date-from"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="col-md-3">
                <label className="filter-label">Do:</label>
              </div>
              <div className="col-md-4">
                <CustomDatePicker
                  key={this.state.datepickerRandomKey}
                  startDate={null}
                  id="date-to"
                  name="date-to"
                />
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-xs-4 col-md-3">
              <div className="col-md-12">
                <label className="box filter-label">Volná kapacita:</label>
                <Checkbox name="check-cap"/>
              </div>

            </div>

            <div className="col-xs-4 col-md-3">
              <div className="col-md-12">
                <label className="box filter-label">Zobrazovat proběhlé akce:</label>
                <Checkbox name="checkpast" defaultChecked={1}/>
              </div>
            </div>
          </div>

          <div className="row">
            {
              this.props.isLoggedIn
                ?
                <div>
                  <div className="col-xs-4 col-md-3">
                    <div className="col-md-12">
                      <label className="box filter-label">Jsem přihlášen:</label>
                      <Checkbox name="check-signed"/>
                    </div>
                  </div>
                  <div className="col-xs-4 col-md-3">
                    <div className="col-md-12">
                      <label className="box filter-label">Jsem autorem:</label>
                      <Checkbox name="check-author"/>
                    </div>
                  </div>
                  <div className="col-xs-4 col-md-3">
                    <div className="col-md-12">
                      <label className="box filter-label">Pouze mnou preferované:</label>
                      <Checkbox name="check-prefered"/>
                    </div>
                  </div>
                </div>
                :
                <div></div>
            }


            <div className="col-xs-4 col-md-2 col-md-offset-10">

                <button name="resetButton" className="btn btn-default top-filter-buffer pull" onClick={() => this.clickedButton("reset")}
                >Zrušit
                </button>

                <button type="submit" name="submit" className="btn btn-default top-filter-buffer pull-right" onClick={() => this.clickedButton("filter")}
                >Filtrovat
                </button>


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
