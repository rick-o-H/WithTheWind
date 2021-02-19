const chalk = require('chalk');
const { Segment, Weather } = require('./models');
const mongoose = require('mongoose');
const { CalculateBearingAngle } = require('../Utils/CalculateBearing');
const { GetWeather } = require('../Utils/getWeather');
const log = console.log;

// TO-DO: considering scrapping this one and using the AddMany function to handle singles too
const AddNewSegment = ({ seg }, callback) => {

  const { id, name, distance, average_grade, maximum_grade, elevation_profile, start_latitude, start_longitude, end_latitude, end_longitude, city, state, total_elevation_gain, effort_count, athlete_count, star_count } = seg;

    const location = {
      type: 'Point',
      coordinates: [start_longitude, start_latitude],
    };

    const kom = seg.xoms.kom;
    const qom = seg.xoms.qom;

    const polyline = seg.map.polyline;

    const bearing_angle =  CalculateBearingAngle(start_latitude, start_longitude, end_latitude, end_longitude);

    const newSegment = new Segment({
      _id: id,
      name: name,
      distance: distance,
      average_grade: average_grade,
      maximum_grade: maximum_grade,
      elevation_profile: elevation_profile,
      location: location,
      start_latitude: start_latitude,
      start_longitude: start_longitude,
      end_latitude: end_latitude,
      end_longitude: end_longitude,
      bearing_angle: bearing_angle,
      city: city,
      state: state,
      total_elevation_gain: total_elevation_gain,
      polyline: polyline,
      effort_count: effort_count,
      athlete_count: athlete_count,
      star_count: star_count,
      kom: kom,
      qom: qom,
    });

  newSegment.save((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    };
  })
};

// Adds many segments
const AddManySegments = (segments, callback) => {

  const segmentDocuments = segments.map(seg => {

    const { id, name, distance, average_grade, maximum_grade, elevation_profile, start_latitude, start_longitude, end_latitude, end_longitude, city, state, total_elevation_gain, effort_count, athlete_count, star_count } = seg;

    const location = {
      type: 'Point',
      coordinates: [start_longitude, start_latitude],
    };

    const kom = seg.xoms.kom;
    const qom = seg.xoms.qom;

    const polyline = seg.map.polyline;

    const bearing_angle =  CalculateBearingAngle(start_latitude, start_longitude, end_latitude, end_longitude);

    const newSegment = new Segment({
      _id: id,
      name: name,
      distance: distance,
      average_grade: average_grade,
      maximum_grade: maximum_grade,
      elevation_profile: elevation_profile,
      location: location,
      start_latitude: start_latitude,
      start_longitude: start_longitude,
      end_latitude: end_latitude,
      end_longitude: end_longitude,
      bearing_angle: bearing_angle,
      city: city,
      state: state,
      total_elevation_gain: total_elevation_gain,
      polyline: polyline,
      effort_count: effort_count,
      athlete_count: athlete_count,
      star_count: star_count,
      kom: kom,
      qom: qom,
    });
    return newSegment;
  });

  Segment.insertMany(segmentDocuments, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
};

// *** Not all segments havea city field, and now querying by bounds.
// This might be useful in future versions
const GetSegmentsByCity = ({ city }, callback) => {
  Segment.find({ city: city }, (err, segments) => {
    if (err) {
      log(chalk.redBright('err', err));
      callback(err);
    } else {
      callback(null, segments);
    }
  });
}

// Find the weather document for a given unixTimeStamp...
// and populates it with the top segments for that hour...
// and that are within the latlng bounds
async function GetTopSegmentsWithinBounds({ lowerLon, lowerLat, upperLon, upperLat, EpochDateTime, limit }, callback) {

  const lowerLeft = [ lowerLon, lowerLat ];
  const upperRight = [ upperLon, upperLat ];

  try {
    const weather = await Weather
      .findOne({ time: EpochDateTime })
      .lean()
      .populate(
        {
          path: 'top_segments',
          populate: {
            path: 'segment',
            match: { location: { $within: { $box: [ lowerLeft, upperRight ] } } },
            model: 'Segment',
          },
        }
      );
      weather.top_segments = weather.top_segments
        .filter(s => s.segment !== null && s.wind_advantage > 0 );
      weather.top_segments
        .sort((a, b) => b.wind_advantage - a.wind_advantage);
      weather.top_segments
        .forEach((item, index) => {
              item['rank'] = index + 1;
            });
      weather.top_segments = weather.top_segments
        .filter(s => s.rank < 21);
      callback(null, weather);
  } catch (error) {
    callback(error);
  }
}

// Gets all segments in the DB
const GetAllSegments = (callback) => {
  Segment.find((err, segments) => {
    if (err) {
      log(chalk.redBright('err', err));
      callback(err);
    } else {
      callback(null, segments);
    }
  });
}

// Performs a request to get fresh weather data and then re-calculates the wind advantages for each hour
const UpdateWeather = (callback) => {

  // Get all segments
  GetAllSegments((err, segments) => {
    if (err) {
      callback(err);
    } else {
      // Get new weather data
      GetWeather()
      .then((weather) => {
        const weatherDocuments = weather.map((hour) => {

          // calculate wind advanteage for each segment
          let segmentWindAdvantages = segments.map((seg) => {
            let wind_advantage = (hour.speed * Math.cos(((hour.angle - seg.bearing_angle) * Math.PI) / 180));
            return {
              segment: seg._id,
              wind_advantage: wind_advantage,
            }
          });

          const { time, speed, angle, direction } = hour;

          // create document
          const newWeather = new Weather({
            time: time,
            speed: speed,
            angle: angle,
            direction: direction,
            top_segments: [...segmentWindAdvantages],
          });
          return newWeather;
        });

        // insert documents into DB
        Weather.insertMany(weatherDocuments, (err, result) => {
          if (err) {
            callback(err);
          } else {
            callback(null, result);
          }
        });
      });
    }
  });
};

const CheckWeather = (callback) => {
  Weather.find((err, weather) => {
    if (err) {
      log(chalk.redBright('err', err));
      callback(err);
    } else {
      callback(null, weather);
    }
  });
}

// Deletes weather....
const DeleteWeather = (callback) => {
  Weather.deleteMany({}, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
};

// Deletes all segments....
const DeleteAllData = (callback) => {
  Segment.deleteMany({}, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
};

module.exports ={
  AddNewSegment,
  GetAllSegments,
  AddManySegments,
  GetTopSegmentsWithinBounds,
  UpdateWeather,
  GetSegmentsByCity,
  DeleteAllData,
  CheckWeather,
  DeleteWeather
}