import React, { Component } from 'react';
import Checkbox from 'rc-checkbox';

export class CheckboxCustom extends Component {


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
