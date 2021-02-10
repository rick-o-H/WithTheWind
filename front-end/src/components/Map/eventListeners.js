import GetSegments from '../../Utils/axiosHelpers';
import { RenderSegments, DateAtSpecificHour } from '../../Utils/helperFunctions';

const InitialRenderToMap = (map, updateVisibleSegments, GetSegmentInfo) => {

  var bounds = map.getBounds();
  var lowerLon = bounds.getSouthWest().lng();
  var lowerLat = bounds.getSouthWest().lat();
  var upperLon = bounds.getNorthEast().lng();
  var upperLat = bounds.getNorthEast().lat();
  var time = DateAtSpecificHour(17).getTime();

  GetSegments(lowerLon, lowerLat, upperLon, upperLat, time).then((data) => {
    updateVisibleSegments(data.data.top_segments);
    RenderSegments(map, data.data.top_segments, GetSegmentInfo);
  });
};

const SubsequentRenderToMap = (map, updateVisibleSegments, GetSegmentInfo) => {

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
    updateVisibleSegments(data.data.top_segments);
    RenderSegments(map, data.data.top_segments, GetSegmentInfo);
  });
};

export {
  InitialRenderToMap,
  SubsequentRenderToMap,
};
