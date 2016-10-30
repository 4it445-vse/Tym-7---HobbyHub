/**
 * Created by Honza on 22.10.2016.
 */
import React, {Component} from 'react';
import {TopNavigation} from '../components/TopNavigation/TopNavigation';
import {PageFooter} from '../components/PageFooter/PageFooter';
import {Loading} from '../components/Loading/Loading'

export class AppPage extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className="container-fluid">
        <Loading/>
        <TopNavigation/>
        {children}
        <PageFooter/>
      </div>
    );
  }
}
