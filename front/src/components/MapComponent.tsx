import React from 'react';

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const apiKey = "AIzaSyBZs5eJrEQV0QWA3_a8JgaRop3SnUZ3AVg";

export const MapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      
      const defaultTravelMode = "WALKING";

      const travelModeList: any = {
        "DRIVING": google.maps.TravelMode.DRIVING,
        "WALKING": google.maps.TravelMode.WALKING,
        "BICYCLING": google.maps.TravelMode.BICYCLING,
        "TRANSIT": google.maps.TravelMode.TRANSIT
      };

      const travelMode = travelModeList[this.props.travelMode ? this.props.travelMode : defaultTravelMode];

      const DirectionsService = new google.maps.DirectionsService();
      
      var googleWaypoints: any = [];

      if(this.props.waypoints) {
        for (let point of this.props.waypoints) {
          googleWaypoints.push({
            location: new google.maps.LatLng(point.latitude, point.longitude),
            stopover: true
          });
        }
      }

      DirectionsService.route({
        origin: new google.maps.LatLng(this.props.origin.latitude, this.props.origin.longitude),
        destination: new google.maps.LatLng(this.props.destination.latitude, this.props.destination.longitude),
        waypoints: googleWaypoints,
        optimizeWaypoints: true,
        travelMode: travelMode,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={new google.maps.LatLng(props.origin.latitude, props.origin.longitude)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);