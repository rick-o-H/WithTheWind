import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TimeOfDay from './TimeOfDay';
// import WindStats from './WindStats';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      // width: theme.spacing(16),
      // height: theme.spacing(16),
    },
  },
}));

export default function InfoBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TimeOfDay />
      <Paper elevation={2} />
    </div>
  );
}
