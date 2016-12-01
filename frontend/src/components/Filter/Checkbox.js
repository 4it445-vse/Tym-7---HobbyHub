import React, { Component } from 'react';
import Checkbox from 'rc-checkbox';

export class Checkbox1 extends Component {


  render() {
      const {id, name} = this.props;
      return <label>
            <Checkbox
              defaultChecked
            />

            &nbsp; Volná kapacita
          </label>
  }
}
