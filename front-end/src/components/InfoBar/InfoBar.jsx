import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TimeOfDay from './TimeOfDay';
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
}));

export default function InfoBar({ segment }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={3}>
            <TimeOfDay />
          </Grid>
          <Grid item xs={9}>
            {!segment.distance ? null : <Segment segment={segment} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
