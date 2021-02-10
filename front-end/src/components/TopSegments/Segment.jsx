import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { toMiles } from '../../Utils/helperFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    backgroundColor: '#fafafa',
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
}));

export default function Segment({ segment }) {
  const classes = useStyles();
  const miles = toMiles(segment.segment.distance);
  return (
    <Paper elevation={3} style={{ backgroundColor: '#fafafa' }}>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography component="h5" variant="h5">
                {`${segment.segment.name}   +${Math.round(segment.wind_advantage)} mph`}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {`${miles} miles   ${segment.segment.average_grade}%`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}
