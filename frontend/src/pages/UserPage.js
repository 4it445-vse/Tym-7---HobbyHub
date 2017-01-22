/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {ImageNotFound} from '../components/NotFound/ImageNotFound'
import {Link} from 'react-router'
import api from '../api.js';
import {connect} from 'react-redux';
import {isLoggedIn, getUserId} from '../components/Login/reducers.js';
import lodash from 'lodash';
import {UserForm} from '../components/User/UserForm.js';
import {UserProfile} from '../components/User/UserProfile.js';
import {browserHistory} from 'react-router';
import Modal from 'react-modal'
import {UserImagePicker} from '../components/User/UserImagePicker'

/**
 This page displays other user profile
 */
export class UserPageRaw extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectTagChange = this.handleSelectTagChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onImageSelected = this.onImageSelected.bind(this);
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

    for (let field of ['username', 'email', 'password', 'prefered_tags','picture']) {
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

  getDefaultState() {
    return {
      userId: {
        username: "",
        email: "",
        picture: ""
      },
      modal: {
        isOpen: false
      },
    }
  }

  setDefaultState() {
    if (typeof this.props.userId !== "undefined" && this.props.userId !== null) {
      const defaultState = this.getDefaultState();
      this.setState({
        ...defaultState,
        userId: this.props.userId
      })
    } else {
      this.state = this.getDefaultState();
    }
  }

  componentWillMount() {
    this.setDefaultState();
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

  /**
   Saves selected image to state.
   */
  onImageSelected(src) {
    const newState = {
      ...this.state
    }
    newState.modal.isOpen = false;
    newState.userData.picture = src;
    this.setState(newState);
  }

  /**
   Opens modal window for image selection.
   */
  openModal(userId) {
    userId.stopPropagation();
    userId.preventDefault();
    const newState = {
      ...this.state
    }
    newState.modal.isOpen = true;
    this.setState(newState);
  }

  /**
   Modal window factory.
   */
  createModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal.isOpen}
          contentLabel="Vyberte obrázek profilu"
        >
          <UserImagePicker onImageSelected={this.onImageSelected}/>
        </Modal>
      </div>
    )
  }

  render() {
    const {username, email, prefered_tags, picture} = this.state.userData;
    const {loggedIn, userId} = this.props;
    const {profileId} = this.props.params;
    const {loggedUserId, fetched} = this.state;
    const {userData} = this.state;
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
      {this.createModal()}
        <div>
          <div className="col-xs-12 col-md-3">

            {userData.picture ?
              <img className="profile-avatar-image" src={userData.picture} alt="avatar"/> :
              <ImageNotFound width="100%" height="150" className="event-image"/>
            }
              <button
                name="choose-image"
                onClick={this.openModal}
                className="btn btn-default btn-lg choose-image top-buffer"
              >
                <i className="fa fa-upload" aria-hidden="true"/>
                Vybrat obrázek
              </button>
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
