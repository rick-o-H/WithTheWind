import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import ReactGA from 'react-ga';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const tL = () => {
  ReactGA.event({
    category: 'Github',
    action: 'navigated to github repository',
  })
}

export default function NavItems() {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      <Link color="inherit" href="https://github.com/rick-o-H/WithTheWind.git" target="_blank" rel="noreferrer" onClick={tL}>
        <GitHubIcon fontSize="large" />
      </Link>
    </Typography>
  );
}
