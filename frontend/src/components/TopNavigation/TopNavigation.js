/**
 * Created by Honza on 24.10.2016.
 */
import React, {Component} from 'react';
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {Login} from '../Login/Login.js';
import { addLogin, logout } from '../Login/actions.js';
import { isLoggedIn, getUserId } from '../Login/reducers.js';
import api from '../../api.js';

export class TopNavigationRaw extends Component {
  constructor(props) {
    super(props);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.state = {burgerMenuClassname: 'collapse navbar-collapse navbar-right', userData: {}};
  }

  toggleCollapsed() {
    var countOfOccurences = (this.state.burgerMenuClassname.match(/collapse/g) || []).length;
    if (countOfOccurences === 1) {
      this.setState({
        ...this.state,
        burgerMenuClassname: "collapse navbar-collapse navbar-right"
      });
    } else {
      this.setState({
        ...this.state,
        burgerMenuClassname: "navbar-collapse navbar-right"
      });
    }
  }

  componentDidMount() {
    this.fetchUserData()
  }

  /**
  Fetches UserData from backend and adds it to state.
  */
  fetchUserData() {
    const {userId} = this.props;
    if (!userId) {
      return;
    }
    api.get('appusers/'+userId)
      .then(({ data }) =>
        {this.setState({
          ...this.state,
          userData: data
        })
        }
      );
  }

  render() {
    const { isLoggedIn, logout } = this.props;
    return (
      <header id="header">
        <nav className="navbar navbar-inverse" role="banner">
          <div className="container">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle" onClick={() => this.toggleCollapsed()} data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
              <Link className="navbar-brand" to="/">
                <span className="navbar-logo">HobbyHub</span>
              </Link>
            </div>
            <div className={this.state.burgerMenuClassname}>
              {!isLoggedIn && <Login/>}
              {isLoggedIn && <Link className="navbar-brand" to="/profile">
                <img className="navbar-avatar" src={
                  this.state.userData.picture ?
                  this.state.userData.picture
                  :
                  '/' + process.env.PUBLIC_URL + 'images/avatar.png'} alt="avatar"/>
              </Link>}
              {isLoggedIn &&
                <ul className="nav navbar-nav">
                  <li>
                  </li>
                  <li>
                    <Link to="/profile">Profil</Link>
                  </li>
                  <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Menu <i className="fa fa-angle-down"></i></a>
                    <ul className="dropdown-menu">
                      <li>
                        <a onClick={logout} href="#">Odhlásit se</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              }
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

function mapStateToProps(state) {
  const { login } = state;
  return {
    isLoggedIn: isLoggedIn(login),
    userId: getUserId(login)
  };
}

export const TopNavigation = connect(
    mapStateToProps,
    {
      addLogin,
      logout
    }
)(TopNavigationRaw);
