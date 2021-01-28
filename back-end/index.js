const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const chalk = require('chalk');
const log = console.log;
const { GetWeather } = require('./Utils/getWeather');

const app = express();

const port = 8080;

app.use(bodyParser.json()).use(cors());

app.get('/weather', (req, res) => {
  GetWeather((data) => {
    res.send(data);
  })
});


app.listen(port, () => {
  log(chalk.magenta('With-The-Wind back-end service listening @ ') + chalk.bold.greenBright(`http://localhost:${port}`));
});
