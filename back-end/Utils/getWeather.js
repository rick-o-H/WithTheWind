const axios = require('axios');
const chalk = require('chalk');
const log = console.log;

async function GetWeather (cb) {
  try {
    const weather = await axios.get(process.env.WEATHER);
    cb(weather);
  } catch(err) {
    log(chalk.redBright('ERROR getting weather forecast within GetWeather function'));
    log(err);
    cb(err);
  }
}

module.exports = {
  GetWeather,
}

// var weather_info = UrlFetchApp.fetch();

//   var wInfo = JSON.parse(weather_info.getContentText());
//   for (var w in wInfo) {
//     weather_obj.time.push(wInfo[w].DateTime);
//     weather_obj.speed.push(wInfo[w].Wind.Speed.Value);
//     weather_obj.windAngle.push(wInfo[w].Wind.Direction.Degrees);
//     weather_obj.nameofdirection.push(wInfo[w].Wind.Direction.Localized);
//   }
//   var ssegmentSheetMaster = SpreadsheetApp.openByUrl(sSheet);
//   var segmentSheetMaster = ssegmentSheetMaster.getActiveSheet();
//   var sss = SpreadsheetApp.openByUrl(iSheet);
//   var ssData = sss.getActiveSheet().getDataRange().getValues();
//   for (var j = 0; j<weather_obj.time.length; j++) {
//     for (var i = 0; i<ssData.length; i++) {
//       var wadvg = (weather_obj.speed[j]*Math.cos(((weather_obj.windAngle[j] - ssData[i][1]) * Math.PI) / 180))
//       if (wadvg > 0) {
//         masterDict.segment_name.push(ssData[i][2]);
//         masterDict.segment_angle.push(ssData[i][1]);
//         masterDict.link_to_seg.push(ssData[i][3]);
//         masterDict.wind_advantage.push(wadvg);
//         masterDict.wind_mph.push(weather_obj.speed[j]);
//         masterDict.wind_angle.push(weather_obj.windAngle[j]);
//         masterDict.time.push(weather_obj.time[j]);
//         masterDict.name_of_direction.push(weather_obj.nameofdirection[j]);
//       }
//     }
//   }
//   var lr = masterDict.time.length;
//   Logger.log(lr);
//   var rng = "A1:H" + lr.toString();
//   Logger.log(rng);
//   Logger.log(masterDict.segment_name);
//   var vals = [
//     masterDict.segment_name,
//     masterDict.segment_angle,
//     masterDict.link_to_seg,
//     masterDict.wind_advantage,
//     masterDict.wind_mph,
//     masterDict.wind_angle,
//     masterDict.time,
//     masterDict.name_of_direction
//   ];