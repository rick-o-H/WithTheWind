import GetSegments from '../../Utils/axiosHelpers';
import { RenderSegments, DateAtSpecificHour } from '../../Utils/helperFunctions';

const InitialRenderToMap = (map, updateVisibleSegments, setFeatures, selectSegment, timeOfDay) => {

  var bounds = map.getBounds();
  var lowerLon = bounds.getSouthWest().lng();
  var lowerLat = bounds.getSouthWest().lat();
  var upperLon = bounds.getNorthEast().lng();
  var upperLat = bounds.getNorthEast().lat();
  var time = DateAtSpecificHour(timeOfDay).getTime();

  GetSegments(lowerLon, lowerLat, upperLon, upperLat, time).then((data) => {
    updateVisibleSegments(data.data.top_segments);
    RenderSegments(map, data.data.top_segments, setFeatures, selectSegment, data.data.speed);
  });
};

const SubsequentRenderToMap = (map, updateVisibleSegments, features, setFeatures, selectSegment, timeOfDay) => {

  features.forEach((feature) => {
    feature.setMap(null);
    feature = null;
  });

  var bounds = map.getBounds();
  var lowerLon = bounds.getSouthWest().lng();
  var lowerLat = bounds.getSouthWest().lat();
  var upperLon = bounds.getNorthEast().lng();
  var upperLat = bounds.getNorthEast().lat();
  var time = DateAtSpecificHour(timeOfDay).getTime();

  GetSegments(lowerLon, lowerLat, upperLon, upperLat, time).then((data) => {
    updateVisibleSegments(data.data.top_segments);
    RenderSegments(map, data.data.top_segments, setFeatures, selectSegment, data.data.speed);
  });
};

export {
  InitialRenderToMap,
  SubsequentRenderToMap,
};
