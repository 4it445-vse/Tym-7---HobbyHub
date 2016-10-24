/**
 * Created by Honza on 24.10.2016.
 */
import React, {Component} from 'react'
import {Link} from 'react-router'

export class TopNavigation extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="events">Events</Link></li>
        </ul>
      </div>
    )
  }
}