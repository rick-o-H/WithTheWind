import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { toMiles } from '../../Utils/helperFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#45484a',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function Segment({ segment }) {
  const classes = useStyles();
  const miles = toMiles(segment.distance);
  return (
    <Grid item>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography component="h5" variant="h5">
            {segment.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {`${miles} miles   ${segment.average_grade}%`}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
