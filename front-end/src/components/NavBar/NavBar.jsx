import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavBarLogo from './NavBarLogo';
import NavItems from './NavItems';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <NavBarLogo />
          <NavItems />
        </Toolbar>
      </AppBar>
    </div>
  );
}
