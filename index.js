const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const DB = require('./segmentsDB/connection');
const chalk = require('chalk');
require('dotenv').config();
const { GetTopSegmentsWithinBounds, GetAllSegments, AddManySegments, GetSegmentsByCity, UpdateWeather, DeleteAllData, CheckWeather, DeleteWeather } = require('./segmentsDB/queries');
const bodyParser = require('body-parser');
const cors = require('cors');
const log = console.log;

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/dist')));
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

  // GetTopSegmentsWithinBounds(req.query)
  //   .then((segments) => {
  //     res.send(segments);
  //   }).catch((err) => {
  //     res.send(404);
  //     log(chalk.bgRed(err, 'ERROR GETTING SEGMENTS'));
  //   });
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

// // seed db with segments
// app.post('/seedDB', (req, res) => {
//   AddManySegments(Segments, (err, result) => {
//     if (err) {
//       log(err);
//       res.send(404);
//     } else {
//       log(chalk.magentaBright(result));
//       res.send(result);
//     }
//   })
// });

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
