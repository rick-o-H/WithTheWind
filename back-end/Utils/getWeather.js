const axios = require('axios');
const chalk = require('chalk');
const log = console.log;

async function GetWeather () {
  try {
    const weather = await axios.get(process.env.WEATHER);
    return weather.data.map((weather_obj) => (
      {
        time: weather_obj.EpochDateTime * 1000,
        speed: weather_obj.Wind.Speed.Value,
        angle: weather_obj.Wind.Direction.Degrees,
        direction: weather_obj.Wind.Direction.Localized,
      }
    ))
  } catch(err) {
    log(chalk.redBright('ERROR getting weather forecast within GetWeather function'));
    log(err);
    return 'error';
  }
}

module.exports = {
  GetWeather,
}
