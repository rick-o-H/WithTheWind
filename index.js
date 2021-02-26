const express = require('express');
const path = require('path');
const compression = require('compression');
var expressStaticGzip = require("express-static-gzip");
const mongoose = require('mongoose');
const DB = require('./segmentsDB/connection');
const chalk = require('chalk');
require('dotenv').config();
const { GetTopSegmentsWithinBounds, GetAllSegments, AddManySegments, GetSegmentsByCity, UpdateWeather, DeleteAllData, CheckWeather, DeleteWeather, SyncIndexes, FindIndexes } = require('./segmentsDB/queries');
const { performance, PerformanceObserver } = require('perf_hooks');
const bodyParser = require('body-parser');
const log = console.log;


const app = express();
const port = 3000;

app.use(expressStaticGzip(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'dist')));
app.use(compression());
app.use(bodyParser.json());

app.get('/segments', (req, res) => {

  var times =[];
  const obs = new PerformanceObserver((items) => {
    times.push(items.getEntries()[0])
  });

  obs.observe({ entryTypes: ['measure'] });
  performance.measure('Start to Now');
  performance.mark('Start');

  GetTopSegmentsWithinBounds(req.query, (err, segments) => {
    if (err) {
      res.send(404);
      log(chalk.bgRed(err, 'ERROR GETTING SEGMENTS'));
    } else {
      performance.mark('Finish');
      performance.measure('Start to Finish', 'Start', 'Finish');
      const timetosend = `
          Total;dur=${times[3].duration},
          db;dur=${times[1].duration},
          fns;dur=${times[2].duration}
        `.replace(/\n/g, '');
      res.append('Server-Timing', timetosend)
      res.send(segments);
    }
  })
});

app.get('/sync', (req, res) => {
  SyncIndexes((err, synced) => {
    if (err) {
      res.send(404);
      log(chalk.bgRed(err, 'ERROR syncing indexes'));
    } else {
      res.send(synced);
    }
  });
})

app.get('/indexes', (req, res) => {
  FindIndexes((err, indexes) => {
    if (err) {
      res.send(404);
      log(chalk.bgRed(err, 'ERROR GETTING indexes'));
    } else {
      res.send(indexes);
    }
  });
})


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
      // res.send(404);
      res.send(':( update weather failed')
    } else{
      res.send('Success!');
    }
  })
});

app.get('/checkWeather', (req, res) => {
  CheckWeather((err, result) => {
    if (err) {
      log(chalk.red(err, 'err'));
      res.send(':( check weather failed')
    } else{
      res.send(result);
    }
  })
});

app.post('/deleteWeather', (req, res) => {
  DeleteWeather((err, result) => {
    if (err) {
      log(chalk.red(err, 'err'));
      res.send(404);
    } else{
      log('successfully deleted weather');
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

