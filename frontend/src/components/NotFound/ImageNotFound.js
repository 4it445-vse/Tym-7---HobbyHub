/**
 * Created by Honza on 31.10.2016.
 */
import React, { Component } from 'react';

export class ImageNotFound extends Component {
  render() {
    const imageSrc = "http://1030news.com/wp-content/themes/fearless/images/missing-image-640x360.png";
    const {width,height} = this.props;
    return (
      <img alt="Not found" width={width} height={height} src={imageSrc}/>
    );
  }
}
