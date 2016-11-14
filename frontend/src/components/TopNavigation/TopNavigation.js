/**
 * Created by Honza on 24.10.2016.
 */
import React, {Component} from 'react';
import { Link } from 'react-router'
import {connect} from 'react-redux'
import {Login} from '../Login/Login.js';

import { addLogin } from '../Login/actions.js';
import { isLoggedIn } from '../Login/reducers.js';

export class TopNavigationRaw extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <header id="header">
        <nav className="navbar navbar-inverse" role="banner">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <span className="navbar-logo">HobbyHub</span>
              </Link>
            </div>

            <div className="collapse navbar-collapse navbar-right">
              {!isLoggedIn && <Login/>}
              {isLoggedIn && <Link className="navbar-brand" to="/">
                <img className="navbar-avatar" src={'/' + process.env.PUBLIC_URL + 'images/avatar.png'} alt="avatar"/>
              </Link>}
              {isLoggedIn &&
                <ul className="nav navbar-nav">
                  <li>
                  </li>
                  <li>
                    <a href="portfolio.html">Profil</a>
                  </li>
                  <li className="dropdown">
                    <ul className="dropdown-menu">
                      <li>
                        <a href="blog-item.html">Nastavení</a>
                      </li>
                      <li>
                        <a href="pricing.html">Odhlásit se</a>
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
  };
}

export const TopNavigation = connect(
    mapStateToProps,
    {
      addLogin
    }
)(TopNavigationRaw);
