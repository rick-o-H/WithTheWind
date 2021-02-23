import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import key from './creds';
import { InitialRenderToMap, SubsequentRenderToMap } from './eventListeners';
import { DateAtSpecificHour } from '../../Utils/helperFunctions';

const Map = ({
  selectedSegment, selectSegment, updateSegments, time,
}) => {

  // const [visibleSegments, setVisibleSegments] = useState([]);

  // const updateVisibleSegments = (segments) => {
  //   setVisibleSegments(segments);
  //   updateSegments(segments);
  // };

  const updateVisibleSegments = (segments) => {
    updateSegments(segments.top_segments);
    return segments;
  };

  const [features, setFeatures] = useState([]);


  const [theMap, setTheMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: key,
    });
    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 30.504946, lng: -96.197482 },
        zoom: 12,
      });

      map.addListener('tilesloaded', () => {
        SubsequentRenderToMap(map, updateVisibleSegments, features, setFeatures, selectSegment, time);
      });

      map.addListener('dragend', () => {
        SubsequentRenderToMap(map, updateVisibleSegments, features, setFeatures, selectSegment, time);
      });
      setTheMap(map);
    });
  }, []);

  useEffect(() => {
    if (theMap !== null) {
      SubsequentRenderToMap(theMap, updateVisibleSegments, features, setFeatures, selectSegment, time);
    }
  }, [time]);

  return (
    <div id="map" />
  );
};

export default Map;
