import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import key from './creds';
import { InitialRenderToMap, SubsequentRenderToMap } from './eventListeners';
import { DateAtSpecificHour } from '../../Utils/helperFunctions';

const Map = ({
  selectedSegment, selectSegment, updateSegments, time,
}) => {

  const updateVisibleSegments = (segments) => {
    updateSegments(segments);
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

  useEffect(() => {
    if (selectedSegment !== null) {

      //TODO: use an object w/keys instead as traversing these arrays is going to be horribly inefficient

      // check if any markers are not original color

      let previousSelectedMarker = features.filter((feature) => feature.visible && feature.icon && feature.icon.fillColor === '#FFEC3B')[0];
      if (previousSelectedMarker) {
        previousSelectedMarker.setVisible(false);
        let previousDefaultMarker = features.filter((feature) => feature.icon && feature.title === previousSelectedMarker.title && feature.icon.fillColor === '#8ADDFF')[0];
        previousDefaultMarker.setVisible(true);
      }

      // find next marker that is the currently selected
      let currentlySelectedMarker = features.filter((feature) => Number(feature.title) === selectedSegment.rank && feature.icon.fillColor === '#FFEC3B')[0];

      // find next marker that is the currently selected
      let currentlySelectedDefault = features.filter((feature) => Number(feature.title) === selectedSegment.rank && feature.icon.fillColor === '#8ADDFF')[0];
      currentlySelectedDefault.setVisible(false);

      currentlySelectedMarker.setVisible(true);
    }
  }, [selectedSegment])

  return (
    <div id="map" />
  );
};

export default Map;
