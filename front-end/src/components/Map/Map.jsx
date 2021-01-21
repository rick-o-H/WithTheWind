import React from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import key from './creds';

const Map = () => {
  const loader = new Loader({
    apiKey: 'AIzaSyCiZKLLZFDwce0M3csGSssv7LkV7suslrk',
  });
  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 30.504946, lng: -96.197482 },
      zoom: 12,
    });
  });
  return (
    <div id="map"></div>
  );
};

export default Map;
