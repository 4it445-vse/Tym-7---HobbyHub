import React, {Component} from 'react';
import api from '../api.js';
import {connect} from 'react-redux';
import { isLoggedIn, getUserId } from '../components/Login/reducers.js';
import lodash from 'lodash';
import { UserForm } from '../components/User/UserForm.js';
import { UserProfile } from '../components/User/UserProfile.js';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

export class ProfilePageRaw extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        const {userId} = this.props;
        this.state = { userData:{}, loggedUserId: userId};
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

    fetchUser(requestedUserId) {
        const { userId } = this.props;
        api.get('appusers/'+requestedUserId)
            .then(({ data }) => this.setState({userData: data, loggedUserId: userId}))
            .catch(error => {
                console.log('there were some errors loading user profile');
            });
    }

    render() {
        const { username, rating } = this.state.userData;
        const { loggedIn, userId } = this.props;
        const { loggedUserId } = this.state;
        //reload data if user logged out or logged in
        if (loggedIn && userId != loggedUserId) {
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

        if (lodash.isEmpty(this.state.userData)) {
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
                    <h1 className="pull-left">{username}</h1>
                  </div>
                  <div className="row"></div>
                  <div className="col-md-12">
                    <span className="profile-rating">4</span>
                  </div>
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
