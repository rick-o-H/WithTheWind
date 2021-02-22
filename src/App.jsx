import React, { useState } from 'react';
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
  const classes = useStyles();

  const [segments, SetSegments] = useState([]);
  const updateSegments = (newSegments) => {
    SetSegments(newSegments);
  };

  const [selectedSegment, updateSelectedSegment] = useState(null);
  const selectSegment = (rank) => {
    let newSegment = segments.find((segment) => segment.rank === rank);
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
              <InfoBar segment={selectedSegment} updateTime={updateTime} />
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
