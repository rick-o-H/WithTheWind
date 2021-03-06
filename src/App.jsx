import React, { useState, useRef, useEffect } from 'react';
import ReactGA from 'react-ga';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';
import TopSegments from './components/TopSegments/TopSegments';
import Map from './components/Map/Map';
import { GetCoordinates } from './Utils/helperFunctions';
import Footer from './components/Footer/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    width: '100%',
  },
  grids: {
    flexGrow: 1,
    height: '95%',
    width: '100%',
  },
}));

const App = () => {

  useEffect(() => {
    ReactGA.initialize('UA-167510825-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  })

  const classes = useStyles();

  const [segments, _SetSegments] = useState([]);

  const [weather, setWeather] = useState(null);

  // Utilize useRef hook to keep the reference to segments from being stale when invoking selectSegment inside the callback of an event handler
  const segmentsRef = useRef(segments);
  const updateSegments = (newSegments) => {
    segmentsRef.current = newSegments.top_segments;
    _SetSegments(newSegments.top_segments);
    let weatherObject = {
      speed: newSegments.speed,
      angle: newSegments.angle,
      direction: newSegments.direction,
    }
    setWeather(weatherObject);
  };

  const [selectedSegment, updateSelectedSegment] = useState(null);

  const selectSegment = (rnk) => {
    var newSegment= null;
    // iterate over the segments reference here
    for (var i = 0; i < segmentsRef.current.length; i++) {
      if (segmentsRef.current[i].rank === rnk) {
         newSegment = segmentsRef.current[i];
      }
    }
    updateSelectedSegment(newSegment);
  };

  const [time, setTime] = useState(new Date().getHours());
  const updateTime = (newTime) => {
    setTime(newTime);
  };

  return (
    <>
      <div className={classes.root} style={{ padding: 5 }}>
        <Grid container className={classes.grids} display="flex" spacing={2}>
          <Grid item xs={12}>
            <NavBar />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0} alignItems="center">
              <InfoBar segment={selectedSegment} updateTime={updateTime} weather={weather} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.grids}>
            <Grid container alignItems="center" display="flex" className={classes.grids} spacing={2}>
              <Grid item xs={2} className={classes.grids}>
                <Paper elevation={3} className={classes.grids}>
                  <TopSegments segments={segments} selectSegment={selectSegment} />
                </Paper>
              </Grid>
              <Grid item xs={10} className={classes.grids}>
                <Paper elevation={3} className={classes.grids}>
                  <Map selectedSegment={selectedSegment} updateSegments={updateSegments} selectSegment={selectSegment} time={time} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.grids}>
            <Grid container alignItems="center" justify="center" display="flex" className={classes.grids} spacing={2}>
              <Grid item className={classes.grids}>
                <Footer />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default App;
