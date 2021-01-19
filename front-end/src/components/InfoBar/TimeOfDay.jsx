import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccessTime from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: theme.spacing(2),
  },
}));

export default function TimeOfDay() {
  const classes = useStyles();
  return (
    <Paper elevation={2}>
      <AccessTime />
      <Typography variant="h4" className={classes.title}>
        2:00 PM
      </Typography>
    </Paper>
  );
}
