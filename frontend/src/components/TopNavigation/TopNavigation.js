/**
 * Created by Honza on 24.10.2016.
 */
import React, {Component} from 'react';
import { Link } from 'react-router'

export class TopNavigation extends Component {
  render() {
    return (
      <header id="header">
        <nav className="navbar navbar-inverse" role="banner">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <img src={'/' + process.env.PUBLIC_URL + 'images/logo.png'} alt="logo"/>
              </Link>
            </div>

            <div className="collapse navbar-collapse navbar-right">
              <Link className="navbar-brand" to="/">
                <img className="navbar-avatar" src={'/' + process.env.PUBLIC_URL + 'images/avatar.png'} alt="avatar"/>
              </Link>
              <ul className="nav navbar-nav">
                <li><a href="portfolio.html">Profil</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown"><button type="button" className="navbar-toggle" data-toggle="collapse"
                                        data-target=".navbar-collapse">
                                  <span className="sr-only">Toggle navigation</span>
                                  <span className="icon-bar"/>
                                  <span className="icon-bar"/>
                                  <span className="icon-bar"/>
                                </button><i
                    className="fa fa-angle-down"/></a>
                  <ul className="dropdown-menu">
                    <li><a href="blog-item.html">Nastavení</a></li>
                    <li><a href="pricing.html">Odhlásit se</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}
