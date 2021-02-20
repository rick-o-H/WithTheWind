import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavBarLogo from './NavBarLogo';
import NavItems from './NavItems';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: theme.palette.secondary.light,
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navBar}>
        <Toolbar>
          <NavBarLogo />
          <NavItems />
        </Toolbar>
      </AppBar>
    </div>
  );
}
