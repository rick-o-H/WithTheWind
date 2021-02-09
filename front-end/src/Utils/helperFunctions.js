const toMiles = (meters) => {
  const miles = meters * 0.000621371;
  if (miles > 10) {
    return Math.round(miles * 10) / 10;
  }
  return Math.round(miles * 100) / 100;
};

const DateAtSpecificHour = (hour) => {
  const now = new Date();
  const hr = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour);
  return hr;
};

const GetCoordinates = (polyline) => {
  const precision = 5;
  const str = polyline;
  let index = 0;
  let lat = 0;
  let lng = 0;
  const coordinates = [];
  let shift = 0;
  let result = 0;
  let byte = null;
  let latitude_change;
  let longitude_change;
  const factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);

  while (index < str.length) {
    byte = null;
    shift = 0;
    result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    shift = result = 0;

    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

    lat += latitude_change;
    lng += longitude_change;

    coordinates.push({ lat: lat / factor, lng: lng / factor });
  }
  console.log(coordinates);
  return coordinates;
};

const RenderSegment = (segment, coords, map) => {
  const segPath = new google.maps.Polyline({
    path: coords,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  segPath.setMap(map);
  segPath.addListener('click', (e) => {
    console.log(e);
  });
};

const RenderSegments = (map, segments, GetSegmentInfo) => {

  const GetCoordinates = (polyline) => {
    const precision = 5;
    const str = polyline;
    let index = 0;
    let lat = 0;
    let lng = 0;
    const coordinates = [];
    let shift = 0;
    let result = 0;
    let byte = null;
    let latitude_change;
    let longitude_change;
    const factor = Math.pow(10, Number.isInteger(precision) ? precision : 5);

    while (index < str.length) {
      byte = null;
      shift = 0;
      result = 0;

      do {
        byte = str.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

      shift = result = 0;

      do {
        byte = str.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

      lat += latitude_change;
      lng += longitude_change;

      coordinates.push({ lat: lat / factor, lng: lng / factor });
    }
    return coordinates;
  };

  for (let i = 0; i < segments.length; i++) {
    let coords = GetCoordinates(segments[i].segment.polyline);
    let segPath = new google.maps.Polyline({
      path: coords,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    segPath.setMap(map);
    const marker = new google.maps.Marker({
      position: { lat: segments[i].segment.start_latitude, lng: segments[i].segment.start_longitude },
      map: map,
      title: '+' + segments[i].wind_advantage + ' mph',
      icon: 'http://maps.google.com/mapfiles/kml/paddle/1.png',
    });
    marker.addListener('click', function(e) {
      GetSegmentInfo(this.title);
    });
    segPath.addListener('click', (e) => {
      console.log(e);
    });
  }
};

module.exports = {
  toMiles,
  DateAtSpecificHour,
  GetCoordinates,
  RenderSegment,
  RenderSegments,
};