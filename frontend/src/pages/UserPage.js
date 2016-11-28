/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import api from '../api.js';
import {connect} from 'react-redux';
import { isLoggedIn, getUserId } from '../components/Login/reducers.js';
import lodash from 'lodash';
import { UserForm } from '../components/User/UserForm.js';
import { UserProfile } from '../components/User/UserProfile.js';
import { browserHistory } from 'react-router';

export class UserPageRaw extends Component {
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
    const { profileId } = this.props.params;
    browserHistory.push('/profile');
  }

  componentDidMount() {
    const { profileId } = this.props.params;
    const { loggedIn, userId } = this.props;
    if (loggedIn) {
      if (profileId === undefined) {
        this.fetchUser(userId);
      } else {
        this.fetchUser(profileId);
      }
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
    const { loggedIn, userId } = this.props;
    const { profileId } = this.props.params;
    //only logged in user can see its or others profile
    if (!loggedIn) {
      return (
          <div className="container content-container">
            <div>
              <div className="col-md-2">
                <a className="btn btn-default" href="/">Zpět na výpis</a>
              </div>

              <div className="col-md-10">
                <h1 className="pull-left">Pro zobrazení profilu se musíte nejprve přihlásit</h1>
              </div>
            </div>
          </div>
      );
    }

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
              {userId == profileId || profileId === undefined?
                  <UserForm handleSubmit={this.handleSubmit} username={username} email={email}></UserForm> :
                  <UserProfile username={username} email={email}></UserProfile>
              }
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

export const UserPage = connect(
    mapStateToProps,
    {
    }
)(UserPageRaw);
