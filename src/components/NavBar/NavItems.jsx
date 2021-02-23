import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function NavItems() {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      <Link color="inherit" href="https://github.com/rick-o-H/WithTheWind.git" target="_blank" rel="noreferrer">
        <GitHubIcon fontSize="large" />
      </Link>
    </Typography>
  );
}
