// /* eslint-disable react/destructuring-assignment */
// /* eslint-disable react/prefer-stateless-function */
// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import Chip from '@material-ui/core/Chip';
// import { GetCoordinates } from '../../Utils/helperFunctions';
// import {
//   Map, InfoWindow, Polyline, GoogleApiWrapper,
// } from 'google-maps-react';

// export class MapContainer extends Component {
//   render() {
//     const coords = GetCoordinates(this.props.selectedSegment)
//     return (
//       <Map
//         google={this.props.google}
//         style={{ width: '100%', height: '100%', position: 'relative' }}
//         className="map"
//         zoom={14}
//       >
//         <Polyline
//           path={}
//           strokeColor="#0000FF"
//           strokeOpacity={0.8}
//           strokeWeight={2}
//         />
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper(
//   (props) => ({
//     apiKey: 'AIzaSyCiZKLLZFDwce0M3csGSssv7LkV7suslrk',
//     language: props.language,
//   }
// ))(MapContainer)

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyCiZKLLZFDwce0M3csGSssv7LkV7suslrk',
// })(MapContainer);

// render() {
//   const triangleCoords = [
//     {lat: 25.774, lng: -80.190},
//     {lat: 18.466, lng: -66.118},
//     {lat: 32.321, lng: -64.757},
//     {lat: 25.774, lng: -80.190}
//   ];

//   return(
//     <Map google={this.props.google}
//         style={{width: '100%', height: '100%', position: 'relative'}}
//         className={'map'}
//         zoom={14}>
//         <Polyline
//           path={triangleCoords}
//           strokeColor="#0000FF"
//           strokeOpacity={0.8}
//           strokeWeight={2} />
//     </Map>
//   )
// }

// const Map = ({ selectedSegment }) => (
//   // Important! Always set the container height explicitly
//   <div style={{ height: '100vh', width: '100%' }}>
//     <GoogleMapReact
//       bootstrapURLKeys={{ key: 'AIzaSyCiZKLLZFDwce0M3csGSssv7LkV7suslrk' }}
//       defaultCenter={{ lat: 30.504946, lng: -96.197482 }}
//       defaultZoom={12}
//       center={{ lat: 30.504946, lng: -96.197482 }}
//     >
//       <Chip
//         lat={selectedSegment.start_latitude}
//         lng={selectedSegment.start_longitude}
//         label="1"
//         size="small"
//       />
//       {/* <AnyReactComponent
//         lat={59.955413}
//         lng={30.337844}
//         text="My Marker"
//       /> */}
//     </GoogleMapReact>
//   </div>
// );

// export default Map;

import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import key from './creds';
import { GetCoordinates } from '../../Utils/helperFunctions';
import Coords from '../../coordsData';

const Map = ({ selectedSegment, setGMap }) => {
  const [gMap, setGGMap] = useState(null);
  const setTheMap = (mapp) => {
    setGGMap(mapp);
  };
  const [currentSeg, setCurrentSeg] = useState(null);
  useEffect(() => {
    function addSeg(seg) {
      const coords = GetCoordinates(seg.map.polyline);
      const newSegPath = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      newSegPath.setMap(gMap);
    }
    if (selectedSegment !== null) {
      addSeg(selectedSegment);
    }
  });
  if (gMap === null) {
    const loader = new Loader({
      apiKey: key,
    });
    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 30.504946, lng: -96.197482 },
        zoom: 12,
      });

      setTheMap(map);

      // const coords = GetCoordinates(selectedSegement.map.polyline);

      const segPath = new google.maps.Polyline({
        path: Coords,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons: [
          {
            icon: FiberManualRecordTwoToneIcon,
            offset: '0%',
          },
          {
            icon: <FiberManualRecordTwoToneIcon color="secondary" />,
            offset: '100%',
          },
        ],
      });
      segPath.setMap(map);
    });
  }

  return (
    <div id="map" />
  );
};

export default Map;
