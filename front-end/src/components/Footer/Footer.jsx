import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import strava_logo_white from '../../images/strava_logo_white.png';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.primary.dark,
  },
  toolBar: {
    justifyContent: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <img src={strava_logo_white} alt="Strava logo" />
      </Toolbar>
    </AppBar>
  );
}
