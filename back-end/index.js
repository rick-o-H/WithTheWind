const express = require('express');
const mongoose = require('mongoose');
const DB = require('./segmentsDB/connection');
const chalk = require('chalk');
require('dotenv').config();
const { GetTopSegmentsWithinBounds, GetAllSegments, AddManySegments, GetSegmentsByCity, UpdateWeather, DeleteAllData } = require('./segmentsDB/queries');
const bodyParser = require('body-parser');
const cors = require('cors');
const log = console.log;
const { Segments } = require('./segData');

const app = express();
const port = 8080;
app.use(bodyParser.json()).use(cors());

app.get('/segments', (req, res) => {
  GetTopSegmentsWithinBounds(req.query, (err, segments) => {
    if (err) {
      res.send(404);
      log(chalk.bgRed(err, 'ERROR GETTING SEGMENTS'));
    } else {
      res.send(segments);
    }
  })
});

app.get('/segmentsByCity/:city', (req, res) => {

  const { city } = req.params;
  GetSegmentsByCity({ city }, (err, response) => {
    if (err) {
      res.send(404);
      log(chalk.bgRed(err, 'ERROR'));
    } else {
      res.send(response);
    }
  })
});


app.get('/weather', (req, res) => {
  UpdateWeather((err, result) => {
    if (err) {
      log(chalk.red(err, 'err'));
      res.send(404);
    } else{
      res.send('Success!');
    }
  })
});

// seed db with segments
app.post('/seedDB', (req, res) => {
  AddManySegments(Segments, (err, result) => {
    if (err) {
      log(err);
      res.send(404);
    } else {
      log(chalk.magentaBright(result));
      res.send(result);
    }
  })
});

app.post('/clearDB', (req, res) => {
  DeleteAllData((err, result) => {
    if (err) {
      log(err);
      res.send(404);
    } else {
      log(chalk.magentaBright(result));
      res.send(result);
    }
  });
})


app.listen(port, () => {
  log(chalk.magenta('With-The-Wind back-end service listening @ ') + chalk.bold.greenBright(`http://localhost:${port}`));
});
