import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import key from './creds';
import { RenderSegments } from '../../Utils/helperFunctions';
import Segments from '../../dummyData';
import Coords from '../../coordsData';

const Map = ({ selectedSegment, setGMap }) => {
  const [gMap, setGGMap] = useState(null);
  const setTheMap = (mapp) => {
    setGGMap(mapp);
    // for (let i = 0; i < Segments.length; i++) {
    //   if (mapp.getBounds().contains({ lat: Segments[i].start_latitude, lng: Segments[i].start_longitude })) {
    //     let coords = GetCoordinates(Segments[i]['map'].polyline);
    //     RenderSegment(Segments[i], coords, mapp);
    //   }
    // }
  };
  const [currentSeg, setCurrentSeg] = useState(null);
  // useEffect(() => {
  //   function addSeg(seg) {
  //     const coords = GetCoordinates(seg['map'].polyline);
  //     const newSegPath = new google.maps.Polyline({
  //       path: coords,
  //       geodesic: true,
  //       strokeColor: '#FF0000',
  //       strokeOpacity: 1.0,
  //       strokeWeight: 2,
  //     });
  //     console.log(gMap.getBounds().contains({ lat: seg.start_latitude, lng: seg.start_longitude }));
  //     newSegPath.setMap(gMap);
  //   }
  //   if (selectedSegment !== null) {
  //     addSeg(selectedSegment);
  //   }
  // });
  if (gMap === null) {
    const loader = new Loader({
      apiKey: key,
    });
    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 30.504946, lng: -96.197482 },
        zoom: 12,
      });

      map.addListener('bounds_changed', () => {
        // segPath.setMap(null);
        RenderSegments(map, Segments);
      });

      // attatch an onBounds change event to the map div
      //  - render all segments within bounds to map

      // initial render of segments

      setTheMap(map);
    });
  }

  return (
    <div id="map" />
  );
};

export default Map;
