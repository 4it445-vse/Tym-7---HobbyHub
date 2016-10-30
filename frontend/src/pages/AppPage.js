/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {TopNavigation} from '../components/TopNavigation/TopNavigation';
import {PageFooter} from '../components/PageFooter/PageFooter';

export class AppPage extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className="container-fluid">
        <TopNavigation/>
        {children}
        <PageFooter/>
      </div>
    );
  }
}
