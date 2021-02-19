import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { toMiles } from '../../Utils/helperFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  pic: {
    height: '20px',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Segment({ segment }) {
  const classes = useStyles();
  const miles = toMiles(segment.segment.distance);
  return (
    <Paper elevation={3} color="secondary">
      <Grid container spacing={1}>
        <Grid item xs>
          <Avatar color="secondary" className={classes.large}>{`+${Math.round(segment.wind_advantage)} mph`}</Avatar>
        </Grid>
        <Grid item xs={6}>
          <Typography component="h5" variant="h5">
            {`${segment.segment.name}`}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {`${miles} miles   ${segment.segment.average_grade}%`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
