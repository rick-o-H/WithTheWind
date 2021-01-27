import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';
import TopSegments from './components/TopSegments/TopSegments';
import Segments from './dummyData';
import Map from './components/Map/Map';
import { GetCoordinates } from './Utils/helperFunctions';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    height: '95%',
  },
  mapAndSegs: {
    flexGrow: 1,
    height: '95%',
    backgroundColor: '#45484a',
  },
  map: {
    flexGrow: 1,
    height: '90%',
  },
}));

const App = () => {
  const [segments, updateSegments] = useState(Segments);
  const [selectedSegment, updateSelectedSegment] = useState(null);

  const [mapInstance, setMapInstance] = useState(null);

  const selectSegment = (seg) => {
    updateSelectedSegment(Segments[seg]);
  };

  const setGMap = (map) => {
    setMapInstance(map);
  };

  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <InfoBar segment={selectedSegment} />
      </Grid>
      <Grid item xs={12} className={classes.root}>
        <Grid container direction="row" spacing={2} alignItems="stretch" display="flex" className={classes.root}>
          <Grid item xs={2} className={classes.root}>
            <Paper elevation={3} className={classes.mapAndSegs}>
              <TopSegments segments={segments} selectSegment={selectSegment} />
            </Paper>
          </Grid>
          <Grid item xs={10} className={classes.root}>
            <Paper elevation={3} className={classes.mapAndSegs}>
              <Map selectedSegment={selectedSegment} setGMap={setGMap} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default hot(App);
