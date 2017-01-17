import React, {Component} from 'react';
import api from '../api.js';
import {connect} from 'react-redux';
import { isLoggedIn, getUserId } from '../components/Login/reducers.js';
import lodash from 'lodash';
import { Link } from 'react-router';

export class ProfilePageRaw extends Component {
    constructor(props) {
        super(props);
        const {userId} = this.props;
        this.state = { userData:{}, loggedUserId: userId, fetched: false};
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

    /**
    Loads user from api by id.
    @requestedUserId int
    */
    fetchUser(requestedUserId) {
        const { userId } = this.props;
        api.get('appusers/'+requestedUserId, {"params": {"filter": {"include": "ratings"}}})
            .then(({ data }) => this.setState({userData: data, loggedUserId: userId, fetched: true}))
            .catch(() => {
                this.setState({userData: {}, loggedUserId: userId, fetched: true});
                console.log('there were some errors loading user profile');
            });
    }

    /**
    Returns css class to be set to element based on rating.
    @rating int
    */
    getRatingClass(rating) {
        if (rating === 1) {
            return 'profile-rating rating-red';
        } else if (rating === 5) {
            return 'profile-rating rating-green';
        } else {
            return 'profile-rating';
        }
    }

    /**
    Calculates average rating of given user.
    @rating int
    */
    calculateRating(user) {
        const {ratings} = user;
        if (ratings === undefined || ratings.length === 0) {
            return 3;
        }
        let sum = 0;

        ratings.forEach(function (rating) {
            sum += rating.rating;
        });

        return Math.round(sum/ratings.length);
    }

    render() {
        const { username } = this.state.userData;
        const { loggedIn, userId } = this.props;
        const { loggedUserId, fetched } = this.state;
        const rating = this.calculateRating(this.state.userData);

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
                    <h1 className="pull-left">{username}</h1>
                  </div>
                  <div className="row"></div>
                  <div className="col-md-12">
                    <span className={this.getRatingClass(rating)}>{rating}</span>
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
