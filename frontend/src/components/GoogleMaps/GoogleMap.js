/**
 * Created by Honza on 12.11.2016.
 */
import React,{Component} from 'react'
// import {createClient} from "@google/maps"
import GoogleMapsLoader from 'google-maps';

export class GoogleMap extends Component{
  constructor(props){
    super(props);
    this.pinMarker= this.pinMarker.bind(this)
    GoogleMapsLoader.KEY="AIzaSyDk13sfxrUQWV4MMTEdH8-HB5It0G3LyR8"
    GoogleMapsLoader.LIBRARIES=['geometry', 'places']
    this.state={
      renderedOnce:false,
      google:null,
      place:null,
      map:null,
      marker:null
    }
  }

  loadMap(mapId) {
    const {onChange} = this.props;
    var self= this;

    GoogleMapsLoader.load(function(google) {
      const map = new google.maps.Map(document.getElementById(mapId), {
        center: {lat: 49.4788977, lng: 15.2988225},
        zoom: 7
      });

      const autocomplete = new google.maps.places.Autocomplete(document.getElementById('google-maps-geocode'));
      autocomplete.bindTo('bounds', map);


      const marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });
      marker.setVisible(false);

      self.setState({
        renderedOnce:true,
      })

      autocomplete.addListener('place_changed',()=>{
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return
        }

        self.setState({
          renderedOnce:true,
          google:google,
          place:place,
          map:map,
          marker:marker,
        })

        onChange(place.geometry.location)
      })
    });
  }

  pinMarker(){
    const {google,place,map,marker} = this.state;
    if(!google||!place||!map||!marker){
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

  render(){
    const {mapId} = this.props;
    const {renderedOnce} = this.state;
    (renderedOnce===false)?
      this.loadMap(mapId):
      this.pinMarker();
    return(
      <div className="col-md-12">
        <label htmlFor="tags">Lokace</label>
        <input
          type="text"
          ref="autocomplete"
          id="google-maps-geocode"
          required="required"
          className="form-control"
        />
      </div>
    )
  }
}