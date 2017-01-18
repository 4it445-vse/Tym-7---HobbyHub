/**
 * Created by Honza on 12.11.2016.
 */
import React, {Component} from 'react'
import GoogleMapsLoader from 'google-maps';

GoogleMapsLoader.KEY = "AIzaSyDk13sfxrUQWV4MMTEdH8-HB5It0G3LyR8";
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];

export class GoogleMapAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.pinMarker = this.pinMarker.bind(this)
  }

  componentWillMount() {
    const defaultLocation = (this.props.defaultLocation) ? this.props.defaultLocation : "";

    this.setState({
      google: null,
      place: null,
      map: null,
      marker: null,
      defaultLocation
    })
  }

  componentDidMount() {
    const {mapId} = this.props;
    this.loadMap(mapId)
  }

  /**
   Loads googlemaps map.
   */
  loadMap(mapId) {
    const {onChange} = this.props;
    let self = this;

    GoogleMapsLoader.load(function (google) {
      const map = new google.maps.Map(document.getElementById(mapId), {
        center: {lat: 49.4788977, lng: 15.2988225},
        disableDefaultUI: true,
        zoom: 7
      });

      google.maps.event.addDomListener(document.getElementById('google-maps-geocode'), 'keydown', function(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });

      const autocomplete = new google.maps.places.Autocomplete(document.getElementById('google-maps-geocode'));
      autocomplete.bindTo('bounds', map);


      const marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });
      marker.setVisible(false);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return
        }

        self.setState({
          renderedOnce: true,
          google: google,
          place: place,
          map: map,
          marker: marker,
        })

        self.pinMarker();

        const address = (place.address_components) ?
          [
            ((place.address_components[0] && place.address_components[0].short_name) || ''),
            ((place.address_components[1] && place.address_components[1].short_name) || ''),
            ((place.address_components[2] && place.address_components[2].short_name) || '')
          ].join(' ') :
          '';


        onChange(place.geometry.location, address)
      })
    });
  }

  /**
   Positions googleMap pin.
   */
  pinMarker() {
    const {google, place, map, marker} = this.state;
    if (!google || !place || !map || !marker) {
      return
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }

    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));

    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  }

  render() {
    const {defaultLocation} = this.state;

    return (
      <div className="col-md-12">
        <label htmlFor="tags">Lokace</label>
        <input
          type="text"
          ref="autocomplete"
          id="google-maps-geocode"
          className="form-control"
          defaultValue={defaultLocation}
        />
      </div>
    )
  }
}

export class GoogleMap extends Component {

  componentDidMount() {
    const {coordinates, title, elementId} = this.props;
    GoogleMapsLoader.load(function (google) {
      let myLatLng = {lat: parseFloat(coordinates.latitude), lng: parseFloat(coordinates.longitude)};

      const map = new google.maps.Map(document.getElementById(elementId), {
        zoom: 15,
        center: myLatLng,
        disableDefaultUI: true
      });

      new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: title,
      });
    });
  }

  render() {
    if(document.getElementById(this.props.elementId)) this.componentDidMount();
    return(
      <div id={this.props.elementId} className="mapa" data-jo={this.props.coordinates.latitude}>

      </div>
    )
  }
}
