import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  windChip: {
    fontSize: 'x-large'
  }
}));

export default function WindInfo({ weather }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Chip
        avatar={<Avatar>{weather.direction}</Avatar>}
        label={`${Math.round(weather.speed)} mph`}
        color={"primary"}
        className={classes.windChip}
      />
    </div>
  )
};