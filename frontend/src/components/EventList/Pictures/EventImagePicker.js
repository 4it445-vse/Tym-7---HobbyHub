/**
 * Created by Honza on 13.11.2016.
 */
import React, {Component} from 'react'

export class EventImagePicker extends Component {

  constructor(props) {
    super(props);
    this.selectImage = this.selectImage.bind(this)
    this.state = {
      selectedImage: {
        id: null,
        src: null,
        name: null,
      }
    }
  }

  /**
   Loads images for events
   */
  getImages() {
    return [
      {
        id: 1,
        src: '/' + process.env.PUBLIC_URL + 'images/event/tenis.jpg',
        name: 'tenis',
      },
      {
        id: 2,
        src: '/' + process.env.PUBLIC_URL + 'images/event/swim.jpg',
        name: 'swim',
      },
      {
        id: 3,
        src: '/' + process.env.PUBLIC_URL + 'images/event/baseball.jpg',
        name: 'baseball',
      },
      {
        id: 5,
        src: '/' + process.env.PUBLIC_URL + 'images/event/cycling.jpg',
        name: 'cycling',
      },
      {
        id: 6,
        src: '/' + process.env.PUBLIC_URL + 'images/event/football.jpg',
        name: 'football',
      },
      {
        id: 7,
        src: '/' + process.env.PUBLIC_URL + 'images/event/volleyball.jpg',
        name: 'volleyball',
      },
      {
        id: 8,
        src: '/' + process.env.PUBLIC_URL + 'images/event/hokej.jpg',
        name: 'hockey',
      },
      {
        id: 9,
        src: '/' + process.env.PUBLIC_URL + 'images/event/florbal.jpg',
        name: 'floorball',
      },
      {
        id: 10,
        src: '/' + process.env.PUBLIC_URL + 'images/event/basketbal.jpg',
        name: 'basketball',
      },
      {
        id: 11,
        src: '/' + process.env.PUBLIC_URL + 'images/event/golf.jpg',
        name: 'golf',
      },
      {
        id: 12,
        src: '/' + process.env.PUBLIC_URL + 'images/event/sipky.jpg',
        name: 'darts',
      },
      {
        id: 13,
        src: '/' + process.env.PUBLIC_URL + 'images/event/stolnihry.jpg',
        name: 'boardgames',
      },
      {
        id: 14,
        src: '/' + process.env.PUBLIC_URL + 'images/event/karty.jpg',
        name: 'cards',
      }
    ]
  }

  /**
   Called when selecting avatare image of event from modal window.
   */
  selectImage(imgSrc) {
    const {onImageSelected} = this.props;
    if (typeof onImageSelected === "function") {
      onImageSelected(imgSrc);
    }
  }

  render() {
    const images = this.getImages();
    const {selectedImage} = this.state;

    const imageElements = images.map((image) => {
      const classes = (selectedImage.id === image.id)
        ?
        "selected"
        :
        "not-selected "

      return (
        <div key={image.id} className="image-picker-wrapper col-md-2 no-margin img-wrap">
          <div className="image-picker-inner choose-image">

            <img src={image.src} alt={image.name} onClick={() => this.selectImage(image.src)}
                 className={classes}/>
          </div>
        </div>

      )
    })

    return (
      <div>
        <div className="row">
          <h2 className="center-text">Vyberte jeden z obrázků</h2>
          <div className="event-pictures">
            {imageElements}
          </div>
        </div>
      </div>
    )
  }
}
