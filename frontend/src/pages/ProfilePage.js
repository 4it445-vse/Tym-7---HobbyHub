/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {connect} from 'react-redux';
import { isLoggedIn, getUserId } from '../components/Login/reducers.js';

export class ProfilePageRaw extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginData = {
      email : formData.get('email'),
      password : formData.get('password')
    };
    api.post('appusers/login', loginData)
        .then(({ data }) => this.loginSuccess(data))
        .catch(error => {
          this.props.loginError(error);
        });
  }

  componentDidMount() {
    const { loggedIn, userId } = this.props;
    if (loggedIn) {
      api.get('appusers/'+userId)
          .then(({ data }) => this.setState(data))
          .catch(error => {
            console.log('there were some errors loading user profile');
          });
    }
  }

  fetchUser() {

  }

  render() {
    console.log('user profile state:', this.state);
    const { loggedIn } = this.props;
    return (
      <div className="container content-container">
        <div>
          <div className="col-md-4">
          <a className="btn btn-default" href="/">Zpět na výpis</a>
          </div>

          <div className="col-md-8">
            <h1 className="pull-left">Profil</h1>
          </div>

          <div className="row"></div>

          <div className="col-md-4">
                <img className="col-md-12" src={'/' + process.env.PUBLIC_URL + 'images/tenis.jpg'} alt="{name}"/>
          </div>

          <div className="col-md-8">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit}>
              <div className="col-md-12"><b>Přezdívka</b><input type="text" className="form-control"></input></div>
              <div className="col-md-6"><b>E-mail</b><input type="text" className="form-control"></input></div>
              <div className="col-md-6"><b>E-mail znovu</b><input type="text" className="form-control"></input></div>
              <div className="col-md-6"><b>Heslo</b><input type="text" className="form-control"></input></div>
              <div className="col-md-6"><b>Heslo znovu</b><input type="text" className="form-control"></input></div>

              <div className="col-md-12">
                  <button type="button" name="cancel" className="btn btn-danger btn-lg" required="required">Smazat profil</button>
                  <button type="submit" name="submit" className="pull-right btn btn-success btn-lg" required="required">Uložit</button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { login } = state;
  return {
    loggedIn: isLoggedIn(login),
    userId: getUserId(login)
  };
}

export const ProfilePage = connect(
    mapStateToProps,
    {
    }
)(ProfilePageRaw);
