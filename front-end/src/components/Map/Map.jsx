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
