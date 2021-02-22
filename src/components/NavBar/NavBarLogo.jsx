import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DirectionsBike from '@material-ui/icons/DirectionsBike';
import Icon from '@mdi/react';
import { mdiWeatherWindy } from '@mdi/js';

const useStyles = makeStyles((theme) => ({
  logo: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
}));

export default function NavBarLogo() {
  const classes = useStyles();

  return (
    <>
      <Icon
        path={mdiWeatherWindy}
        size="48px"
      />
      <DirectionsBike style={{ fontSize: 40 }} />
      <Typography variant="h5" className={classes.title}>
        With The Wind
      </Typography>
    </>
  );
}
