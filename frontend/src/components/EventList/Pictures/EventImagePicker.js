/**
 * Created by Honza on 13.11.2016.
 */
import React, {Component} from 'react'
import * as FontAwesome from 'react-icons/fa'

export class EventImagePicker extends Component {

  constructor(props) {
    super(props);
    this.selectImage = this.selectImage.bind(this)
    this.onImageSelected = this.onImageSelected.bind(this)
    this.state = {
      selectedImage: {
        id: null,
        src: null,
        name: null,
      }
    }
  }

  getImages() {
    return [
      {
        id: 1,
        src: '/' + process.env.PUBLIC_URL + 'images/event/tenis.jpg',
        name: 'tenis',
      },
      {
        id: 2,
        src: '/' + process.env.PUBLIC_URL + 'images/event/map.jpg',
        name: 'map',
      }
    ]
  }

  selectImage(image) {
    this.setState({
      selectedImage: image
    })
  }

  onImageSelected(image){
    const {onImageSelected} = this.props;
    if(typeof onImageSelected==="function"){
      onImageSelected(image.src);
    }
  }

  render() {
    const images = this.getImages();
    const {selectedImage} = this.state;

    const imageElements = images.map((image)=> {
      const classes = (selectedImage.id === image.id)
        ?
      "selected"
        :
      "not-selected "

      return (
        <div key={image.id} className="image-picker-wrapper col-md-2">
          <div className="image-picker-inner">
            <img src={image.src} alt={image.name} onClick={()=>this.selectImage(image)}
                 className={classes}/>
            {(selectedImage.id === image.id)?
              <button
                className="image-picker-select-button"
                onClick={()=>{
                  this.onImageSelected(image)
                }}
              >Vybrat</button>:
              ''

            }
          </div>
        </div>

      )
    })

    return (
      <div>
        <div className="row">
          <h1>Vyberte jeden z obrázků</h1>
          <div className="event-pictures">
            {imageElements}
          </div>
        </div>
      </div>
    )
  }
}