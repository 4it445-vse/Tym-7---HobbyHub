/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {Link} from 'react-router'
import api from '../api.js';
import {connect} from 'react-redux';
import {isLoggedIn, getUserId} from '../components/Login/reducers.js';
import lodash from 'lodash';
import {UserForm} from '../components/User/UserForm.js';
import {UserProfile} from '../components/User/UserProfile.js';
import {browserHistory} from 'react-router';

/**
 This page displays other user profile
 */
export class UserPageRaw extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectTagChange = this.handleSelectTagChange.bind(this);
    const {userId} = this.props;
    this.state = {userData: {}, loggedUserId: userId, fetched: false, formErrors: {}};
  }

  /**
   Called on form submit. Serves to send api PATCH to update current user.
   */
  handleSubmit(event) {
    event.preventDefault();
    const {loggedIn, userId} = this.props;
    if (!loggedIn) {
      console.log('You cannot edit profile if you are not logged in');
      return;
    }

    const formData = new FormData(event.target);
    let formErrors = {};
    if (formData.get('password') !== formData.get('password_confirm')) {
      formErrors.pwError = "Hesla nejsou stejná";
    }
    if (formData.get('email') !== formData.get('email_confirm')) {
      formErrors.emailError = "Emaily nejsou stejné";
    }
    if (!lodash.isEmpty(formErrors)) {
      this.setState({
        ...this.state,
        formErrors
      });
      return;
    }
    let userData = {};

    for (let field of ['username', 'email', 'password', 'prefered_tags']) {
      if (formData.get(field)) {
        userData[field] = formData.get(field);
      }
    }

    userData.prefered_tags = this.state.userData.prefered_tags;

    if (lodash.isEmpty(userData)) {
      this.setState({
        ...this.state,
        formErrors: {formError: "Nelze odeslat prázdný formulář"}
      });
      return;
    }
    api.patch('appusers/' + userId, userData)
      .then(({data}) => this.saveSuccess())
      .catch(error => {
        const {email, username} = error.response.data.error.details.messages;
        const formErrors = {};
        if (username) {
          formErrors.usernameError = "Uživatelské jméno je zabrané";
        }
        if (email) {
          if (error.response.data.error.details.codes.email === "uniqueness") {
            formErrors.emailError = "Email je zabraný";
          } else {
            formErrors.emailError = "Email není validní";
          }
        }
        if (!lodash.isEmpty(formErrors)) {
          this.setState({
            ...this.state,
            formErrors
          });
          return;
        }
      });
  }

  /**
   Called on handleSubmit() success. Informs user of succes.
   */
  saveSuccess() {
    this.setState({
      ...this.state,
      formErrors: {formSuccess: "Data byla úspěšně uložena"}
    });
    browserHistory.push('/profile');
  }

  componentDidMount() {
    const {profileId} = this.props.params;
    const {loggedIn, userId} = this.props;
    if (loggedIn) {
      if (profileId === undefined) {
        this.fetchUser(userId);
      } else {
        this.fetchUser(profileId);
      }
    }
  }

  /**
   Loads user from api by id.
   @requestedUserId int
   */
  fetchUser(requestedUserId) {
    const {userId} = this.props;
    api.get('appusers/' + requestedUserId)
      .then(({data}) => this.setState({
        userData: data,
        loggedUserId: userId,
        fetched: true,
        formNotifications: this.state.formNotifications
      }))
      .catch(() => {
        this.setState({
          userData: {},
          loggedUserId: userId,
          fetched: true,
          formNotifications: this.state.formNotifications
        });
        console.log('there were some errors loading user profile');
      });
  }

  /**
   Called when change in prefered tags is made. Updates value to state.
   @value string
   */
  handleSelectTagChange(value) {
    const newState = {
      ...this.state
    }
    newState.userData.prefered_tags = value;
    this.setState(newState);
  }

  render() {
    const {username, email, prefered_tags} = this.state.userData;
    const {loggedIn, userId} = this.props;
    const {profileId} = this.props.params;
    const {loggedUserId, fetched} = this.state;
    //reload data if user logged out or logged in
    if (loggedIn && userId !== loggedUserId) {
      this.fetchUser(userId);
    }

    //only logged in user can see its or others profile
    if (!loggedIn) {
      return (
        <div className="container content-container">
          <div>


            <div className="col-md-12">
              <h1>Nepřihlášen</h1>
              <p className="center">Pro zobrazení profilu se nejdříve přihlašte.</p>
              <p className="center">Ješte nemáte účet? <Link to="/registration">Zaregistrujte se</Link>.</p>
            </div>
          </div>
        </div>
      );
    }

    if (lodash.isEmpty(this.state.userData) && fetched) {
      return (
        <div className="container content-container">
          <div>


            <div className="col-md-12">
              <h1>404 Nenalezeno</h1>
              <p className="center">Při zobrazování účtu došlo k chybě.</p>
              <p className="center">Účet neexistuje.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container content-container">
        <div>

          <div className="col-xs-12 col-md-3">
            <img className="profile-avatar" src={'/' + process.env.PUBLIC_URL + 'images/avatar.png'} alt="avatar"/>
          </div>

          <div className="col-md-9">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="pull-left">Můj profil</h1>
              </div>
              <div className="row"></div>
              {userId === profileId || profileId === undefined ?
                <UserForm
                  handleSubmit={this.handleSubmit} username={username} email={email}
                  prefered_tags={prefered_tags} handleSelectTagChange={this.handleSelectTagChange}
                  formErrors={this.state.formErrors}/> :
                <UserProfile username={username} email={email}/>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {login} = state;
  return {
    loggedIn: isLoggedIn(login),
    userId: getUserId(login)
  };
}

export const UserPage = connect(
  mapStateToProps,
  {}
)(UserPageRaw);
