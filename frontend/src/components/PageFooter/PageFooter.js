/**
 * Created by Michal on 27.10.2016.
 */
import React, { Component } from 'react';

export class PageFooter extends Component {
  render() {
    return (
        <footer id="footer" className="midnight-blue">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        &copy; 2016 <a target="_blank" href="http://hobbyhub.com/"
                                       title="Chci hrát, ale nemám s kým">HobbyHub</a>. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
  }
}
