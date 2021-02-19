import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      <Link color="inherit" href="/">
        Today&apos;s Top Segments
      </Link>
      <Link color="inherit" href="/">
        By The Hour
      </Link>
      <Link color="inherit" href="/">
        Map
      </Link>
    </Typography>
  );
}

// <Typography className={classes.root}>
// <Link color="inherit" href="/">
//   Today&apos;s Top Segments
// </Link>
// <Link color="inherit" href="/">
//   By The Hour
// </Link>
// <Link color="inherit" href="/">
//   Map
// </Link>
// </Typography>
