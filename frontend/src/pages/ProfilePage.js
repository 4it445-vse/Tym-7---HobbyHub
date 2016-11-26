/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {connect} from 'react-redux';
import { isLoggedIn, getUserId } from '../components/Login/reducers.js';
import lodash from 'lodash';

export class ProfilePageRaw extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { userData:{} };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { loggedIn, userId } = this.props;
    if (!loggedIn) {
      console.log('you cannot edit profile if you are not logged in');
      return;
    }

    const { username, email } = this.state.userData;
    const formData = new FormData(event.target);
    if (formData.get('password') !== formData.get('password_confirm')) {
      alert('Heslo nejsou stejná');
      return;
    }
    if (formData.get('email') !== formData.get('email_confirm')) {
      alert('Emaily nejsou stejné');
      return;
    }
    var userData = {};
    ['username', 'email', 'password'].map(field => {
          if (formData.get(field)) {
            userData[field] = formData.get(field);
          }
      }
    );
    if (lodash.isEmpty(userData)) {
      alert('Není vyplněno nic k aktualizaci.');
      return;
    }
    api.patch('appusers/'+userId, userData)
        .then(({ data }) => this.loginSuccess())
        .catch(error => {
          console.log('could not save profile data');
        });
  }

  loginSuccess() {
    alert('Data úspěšně uložena!');
    const { loggedIn, userId } = this.props;
    if (loggedIn) {
      this.fetchUser(userId);
    }
  }

  componentDidMount() {
    const { loggedIn, userId } = this.props;
    if (loggedIn) {
      this.fetchUser(userId);
    }
  }

  fetchUser(userId) {
    api.get('appusers/'+userId)
        .then(({ data }) => this.setState({userData: data}))
        .catch(error => {
          console.log('there were some errors loading user profile');
        });
  }

  render() {
    const { username, email } = this.state.userData;
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
              <div className="col-md-12"><b>Přezdívka</b><input name="username" type="text" className="form-control" placeholder={username}></input></div>
              <div className="col-md-6"><b>E-mail</b><input name="email" type="text" className="form-control" placeholder={email}></input></div>
              <div className="col-md-6"><b>E-mail znovu</b><input name="email_confirm" type="text" className="form-control" placeholder={email}></input></div>
              <div className="col-md-6"><b>Heslo</b><input name="password" type="password" className="form-control" placeholder="*****"></input></div>
              <div className="col-md-6"><b>Heslo znovu</b><input name="password_confirm" type="password" className="form-control" placeholder="*****"></input></div>

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
