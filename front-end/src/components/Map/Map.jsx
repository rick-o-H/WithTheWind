import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import FiberManualRecordTwoToneIcon from '@material-ui/icons/FiberManualRecordTwoTone';
import axios from 'axios';
import key from './creds';
import GetSegments from '../../Utils/axiosHelpers';
import { RenderSegments, DateAtSpecificHour } from '../../Utils/helperFunctions';
import Segments from '../../dummyData';
import Coords from '../../coordsData';

const Map = ({ selectedSegment, setGMap }) => {

  const [gMap, setGGMap] = useState(null);
  const setTheMap = (mapp) => {
    setGGMap(mapp);
  };

  useEffect(() => {
    if (gMap === null) {
      const loader = new Loader({
        apiKey: key,
      });
      loader.load().then(() => {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 30.504946, lng: -96.197482 },
          zoom: 12,
        });
        var moreSegs = [];

        function renderAll(map) {
          RenderSegments(map, moreSegs, GetSegmentInfo);
        }

        function clearMap() {
          renderAll(null);
        }

        function GetSegmentInfo(index) {
          console.log(moreSegs[index]);
        }

        map.addListener('tilesloaded', () => {
          var bounds = map.getBounds();

          var lowerLon = bounds.getSouthWest().lng();
          var lowerLat = bounds.getSouthWest().lat();
          var upperLon = bounds.getNorthEast().lng();
          var upperLat = bounds.getNorthEast().lat();
          var time = DateAtSpecificHour(17).getTime();

          GetSegments(lowerLon, lowerLat, upperLon, upperLat, time).then((data) => {
            moreSegs = [...data.data.top_segments];
            RenderSegments(map, data.data.top_segments, GetSegmentInfo);
          });
        });

        map.addListener('dragend', () => {

          Object.values(map.__gm.T.j).forEach((pLine) => {
            pLine.setMap(null);
            pLine = null;
          });
          Object.values(map.__gm.ze.j).forEach((marker) => {
            marker.setMap(null);
            marker = null;
          });

          var bounds = map.getBounds();
          var lowerLon = bounds.getSouthWest().lng();
          var lowerLat = bounds.getSouthWest().lat();
          var upperLon = bounds.getNorthEast().lng();
          var upperLat = bounds.getNorthEast().lat();
          var time = DateAtSpecificHour(17).getTime();

          GetSegments(lowerLon, lowerLat, upperLon, upperLat, time).then((data) => {
            moreSegs = [...data.data.top_segments];
            RenderSegments(map, data.data.top_segments, GetSegmentInfo);
          });
        });
      });
    }
  });

  return (
    <div id="map" />
  );
};

export default Map;
