import { hot } from 'react-hot-loader/root';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';
// import Segments from './sampleData';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  mapAndSegs: {
    height: 100,
    backgroundColor: '#45484a',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <InfoBar />
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item={3} style={{ height: 900 }}>
          <Paper elevation={3} className={classes.mapAndSegs}>lolPaper</Paper>
        </Grid>
        <Grid item={9}>
          <Paper elevation={3} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default hot(App);
