const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const segmentSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  distance: Number,
  average_grade: Number,
  maximum_grade: Number,
  elevation_profile: String,
  location: {
    type: pointSchema,
    required: true
  },
  start_latitude: Number,
  start_longitude: Number,
  end_latitude: Number,
  end_longitude: Number,
  bearing_angle: Number,
  city: String,
  state: String,
  total_elevation_gain: Number,
  polyline: String,
  effort_count: Number,
  athlete_count: Number,
  star_count: Number,
  kom: String,
  qom: String,
});

const collegeStationWeatherSchema = new mongoose.Schema({
  time: Number,
  speed: Number,
  angle: Number,
  direction: String,
  top_segments: [{
    segment: { type: Number, ref: 'Segment' },
    wind_advantage: Number,
  }],
});

module.exports = {
  Segment: mongoose.model('Segment', segmentSchema),
  Weather: mongoose.model('Weather', collegeStationWeatherSchema),
};