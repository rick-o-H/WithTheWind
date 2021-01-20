import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccessTime from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  time: {
    margin: theme.spacing(1),
    // width: theme.spacing(40),
    // height: theme.spacing(20),
  },
}));

export default function TimeOfDay() {
  const classes = useStyles();
  return (
    <Paper elevation={3} style={{ backgroundColor: '#45484a' }}>
      <Grid container spacing={2}>
        <Grid item>
          <AccessTime style={{ fontSize: 100 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" className={classes.time}>
            2:00 PM
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
