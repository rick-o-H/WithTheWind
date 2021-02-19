import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TimeOfDayTwo from './TimeOfDayTwo';
import Segment from '../TopSegments/Segment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  clock: {
    display: 'flex',
  },
}));

export default function InfoBar({ segment, updateTime }) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={2} className={classes.clock}>
          <TimeOfDayTwo updateTime={updateTime} />
        </Grid>
        <Grid item xs={10}>
          {segment === undefined ? null : <Segment segment={segment} />}
        </Grid>
      </Grid>
    </Grid>
  );
}
