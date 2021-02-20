import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Timeline from '@material-ui/icons/Timeline';
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
    fontSize: 20,
    color: theme.palette.text.secondary,
    marginBottom: 5,
  },
  paper: {
  },
  stats: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(3),
    justifyContent: 'center',
  },
  statIcons: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: 0,
  },
}));

export default function Segment({ segment }) {
  const classes = useStyles();
  const miles = toMiles(segment.segment.distance);
  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={2} justify="flex-start" alignItems="center">
        <Grid item>
          <Typography component="h5" variant="h5">
            {`${segment.segment.name}`}
          </Typography>
        </Grid>
        <Divider className={classes.divider} orientation="vertical" flexItem variant="middle" />
        <Grid item>
          <Typography className={classes.pos}>
            Grade
          </Typography>
          <Typography component="h5" variant="h5" className={classes.stats}>
            {`${segment.segment.average_grade}%`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.pos}>
            Distance
            <Timeline className={classes.statIcons} size="large" />
          </Typography>
          <Typography component="h5" variant="h5" className={classes.stats}>
            {`${miles} miles`}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.pos}>
            KOM
          </Typography>
          <Typography component="h5" variant="h5" className={classes.stats}>
            {`${segment.segment.kom}  |  `}
            {}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
