/**
 * Created by Honza on 30.10.2016.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addLoading, removeLoading} from './actions';
import './style.css'

export class LoadingRaw extends Component {

  constructor(props){
    super(props)
    this.state = {
      isLoading:0
    }
  }

  render() {
    const { isLoading } = this.props;
    console.log("isLoading",isLoading)
    return (
      <div>
        {isLoading>0?
          <SpinnerLoader/>:
          ''
        }
      </div>
    );
  }
}

export class SpinnerLoader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="outer">
          <div className="middle">
            <div className="inner">
              <div className="waiting center-block">
                <div className="windows8">
                  <div className="wBall" id="wBall_1">
                    <div className="wInnerBall"></div>
                  </div>
                  <div className="wBall" id="wBall_2">
                    <div className="wInnerBall"></div>
                  </div>
                  <div className="wBall" id="wBall_3">
                    <div className="wInnerBall"></div>
                  </div>
                  <div className="wBall" id="wBall_4">
                    <div className="wInnerBall"></div>
                  </div>
                  <div className="wBall" id="wBall_5">
                    <div className="wInnerBall"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.loading.isLoading
  }
}

export const Loading = connect(
  mapStateToProps,
  {
    addLoading,
    removeLoading
  }
)(LoadingRaw);
