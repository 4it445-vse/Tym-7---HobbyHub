/**
 * Created by Honza on 24.10.2016.
 */
import React, {Component} from 'react';

export class TopNavigation extends Component {
  render() {
    return (
      <header id="header">
        <div className="top-bar">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-xs-4">
              </div>
              <div className="col-sm-6 col-xs-8">
                <div className="social">
                  <ul className="social-share">
                    <li><a href="#"><i className="fa fa-facebook"/></a></li>
                    <li><a href="#"><i className="fa fa-twitter"/></a></li>
                    <li><a href="#"><i className="fa fa-linkedin"/></a></li>
                    <li><a href="#"><i className="fa fa-dribbble"/></a></li>
                    <li><a href="#"><i className="fa fa-skype"/></a></li>
                  </ul>
                  <div className="search">
                    <form role="form">
                      <input type="text" className="search-form" autoComplete="off"
                             placeholder="Search"/>
                      <i className="fa fa-search"/>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-inverse" role="banner">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse"
                      data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>
              <a className="navbar-brand" href="index.html"><img
                src={process.env.PUBLIC_URL + 'logo.png'} alt="logo"/></a>
            </div>

            <div className="collapse navbar-collapse navbar-right">
              <a className="navbar-brand" href="index.html"><img src={process.env.PUBLIC_URL + 'logo.png'}
                                                                 alt="avatar"/></a>
              <ul className="nav navbar-nav">
                <li><a href="index.html">Home</a></li>
                <li><a href="portfolio.html">Profil</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Menu <i
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
