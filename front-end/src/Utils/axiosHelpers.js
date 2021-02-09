import axios from 'axios';

const GetSegments = (lowerLon, lowerLat, upperLon, upperLat, time) => {
  return axios.get(`http://localhost:8080/segments?lowerLon=${lowerLon}&lowerLat=${lowerLat}&upperLon=${upperLon}&upperLat=${upperLat}&EpochDateTime=${time}`);
};

export default GetSegments;
