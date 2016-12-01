import React, { Component } from 'react';
import Checkbox from 'rc-checkbox';

export class Checkbox1 extends Component {


  render() {
      const {id, name} = this.props;
      return <div><label>
            <Checkbox
              defaultChecked
            />

            &nbsp; defaultChecked rc-checkbox
          </label>
          </div>
  }
}
