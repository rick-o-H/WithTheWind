import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import key from './creds';
import { InitialRenderToMap, SubsequentRenderToMap } from './eventListeners';

const Map = ({ selectedSegment, updateSegments }) => {

  const [visibleSegments, setVisibleSegments] = useState([]);

  const updateVisibleSegments = (segments) => {
    setVisibleSegments(segments);
    updateSegments(segments);
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: key,
    });
    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 30.504946, lng: -96.197482 },
        zoom: 12,
      });

      function GetSegmentInfo(index) {
        console.log(visibleSegments[index]);
      }

      map.addListener('tilesloaded', () => {
        InitialRenderToMap(map, updateVisibleSegments, GetSegmentInfo);
      });

      map.addListener('zoom_changed', () => {
        SubsequentRenderToMap(map, updateVisibleSegments, GetSegmentInfo);
      });

      map.addListener('dragend', () => {
        SubsequentRenderToMap(map, updateVisibleSegments, GetSegmentInfo);
      });
    });
  }, []);

  return (
    <div id="map" />
  );
};

export default Map;
