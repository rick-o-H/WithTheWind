/* eslint-disable no-else-return */

const toMiles = (meters) => {
  const miles = meters * 0.000621371;
  if (miles > 10) {
    return Math.round(miles * 10) / 10;
  }
  return Math.round(miles * 100) / 100;
};

const CalculateMPH = (duration, miles) => {
  if (duration.length > 3 && duration.length < 6) {
    const [minutes, seconds] = duration.split(':');
    return (miles / ((Number(minutes) * 60 + Number(seconds)) / 3600));
  } else if (duration.length <= 3) {
    const seconds = duration.split('s')[0];
    return (miles / (Number(seconds) / 3600));
  } else {
    const [hours, minutes, seconds] = duration.split(':');
    return (miles / ((Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds)) / 3600));
  }
};

const DateAtSpecificHour = (hour) => {
  const now = new Date();
  const hr = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour);
  return hr;
};

const RenderSegments = (map, segments, setFeatures, selectSegment, speed) => {

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

  let newFeatures = [];

  for (let i = 0; i < segments.length; i++) {

    let coords = GetCoordinates(segments[i].segment.polyline);

    let segPath = new google.maps.Polyline({
      path: coords,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    segPath.setMap(map);
    newFeatures.push(segPath);

    var pinColor = '#8ADDFF';
    var pinSVGFilled = 'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z';
    var labelOriginFilled = new google.maps.Point(12, 9);

    var markerImage = {
      path: pinSVGFilled,
      anchor: new google.maps.Point(12, 21),
      fillOpacity: segments[i].wind_advantage / speed,
      fillColor: pinColor,
      strokeWeight: 2,
      strokeColor: 'white',
      scale: 2,
      labelOrigin: labelOriginFilled,
    };

    var label = {
      text: `+${Math.round(segments[i].wind_advantage)}`,
      color: 'black',
      fontSize: '12px',
    };

    const marker = new google.maps.Marker({
      position: { lat: segments[i].segment.start_latitude, lng: segments[i].segment.start_longitude },
      map: map,
      icon: markerImage,
      label: label,
      title: `${segments[i].rank}`,
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', function (e) {
      e.domEvent.preventDefault();
      let rnk = Number(e.domEvent.currentTarget.ariaLabel);
      selectSegment(rnk);
    });

    // ----------------------------------------------
    // SECONDARY MARKER - TODO: move the marker creation into its own function

    var pinColor2 = '#FFEC3B';
    var pinSVGFilled2 = 'M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z';
    var labelOriginFilled2 = new google.maps.Point(12, 9);

    var markerImage2 = {
      path: pinSVGFilled2,
      anchor: new google.maps.Point(12, 21),
      fillOpacity: segments[i].wind_advantage / speed,
      fillColor: pinColor2,
      strokeWeight: 2,
      strokeColor: 'orange',
      scale: 2,
      labelOrigin: labelOriginFilled2,
    };

    var label2 = {
      text: `+${Math.round(segments[i].wind_advantage)}`,
      color: 'black',
      fontSize: '12px',
    };

    const marker2 = new google.maps.Marker({
      position: { lat: segments[i].segment.start_latitude, lng: segments[i].segment.start_longitude },
      map: map,
      icon: markerImage2,
      label: label2,
      title: `${segments[i].rank}`,
      visible: false,
    });

    newFeatures.push(marker);
    newFeatures.push(marker2);
  }
  setFeatures(newFeatures);
};

export {
  toMiles,
  DateAtSpecificHour,
  RenderSegments,
  CalculateMPH,
};
