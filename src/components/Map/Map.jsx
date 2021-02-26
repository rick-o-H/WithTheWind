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

  const [defaultMarkers, setDefaultMarkers] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [markerIndex, setMarkerIndex] = useState(null);
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
        SubsequentRenderToMap(
          map,
          updateVisibleSegments,
          defaultMarkers,
          selectedMarkers,
          polylines,
          setDefaultMarkers,
          setSelectedMarkers,
          setPolylines,
          selectSegment,
          time
          );
      });

      map.addListener('dragend', () => {
        SubsequentRenderToMap(
          map,
          updateVisibleSegments,
          defaultMarkers,
          selectedMarkers,
          polylines,
          setDefaultMarkers,
          setSelectedMarkers,
          setPolylines,
          selectSegment,
          time
          );
      });
      setTheMap(map);
    });
  }, []);

  useEffect(() => {
    if (theMap !== null) {
      SubsequentRenderToMap(
        theMap,
        updateVisibleSegments,
        defaultMarkers,
        selectedMarkers,
        polylines,
        setDefaultMarkers,
        setSelectedMarkers,
        setPolylines,
        selectSegment,
        time
        );
    }
  }, [time]);

  useEffect(() => {
    if (selectedSegment !== null) {

      let index = selectedSegment.rank -1;

      if (markerIndex !== null) {
        selectedMarkers[markerIndex].setVisible(false);
        defaultMarkers[markerIndex].setVisible(true);
      }

      defaultMarkers[index].setVisible(false);
      selectedMarkers[index].setVisible(true);

      setMarkerIndex(index);
    }
  }, [selectedSegment])

  return (
    <div id="map" />
  );
};

export default Map;
