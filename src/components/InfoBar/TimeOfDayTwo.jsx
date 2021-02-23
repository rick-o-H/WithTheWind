import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DateAtSpecificHour } from '../../Utils/helperFunctions';
import WindInfo from './WindInfo';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  windText: {
    fontSize: 20,
    color: theme.palette.text.primary,
    marginBottom: 2,
  }
}));

export default function TimeOfDayTwo({ updateTime, weather }) {
  const classes = useStyles();
  const now = new Date().getHours();
  const initialValue = DateAtSpecificHour(now);

  const [time, setTime] = React.useState(initialValue);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {

    updateTime(new Date(event.target.value).getHours());
    setTime(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  let nextTwelveHours = [];
  for (var i = now; i <= now + 12; i++) {
    nextTwelveHours.push({
      value: DateAtSpecificHour(i),
      label: DateAtSpecificHour(i).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  }

  return (
    <Paper elevation={3} color="secondary">
      <Grid container justify="center">
        <Grid item xs>
          <FormControl className={classes.formControl}>
            <InputLabel id="controlled-open-select-label">Time</InputLabel>
            <Select
              labelId="controlled-open-select-label"
              id="controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={time}
              onChange={handleChange}
            >
            {nextTwelveHours.map((option) => (
              <MenuItem key={option.value} value={option.value.toString()}>
                {option.label}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs >
          <Typography className={classes.windText}>
          {weather === null ? null : weather.direction}
          </Typography>
          <Typography className={classes.windText}>
          {weather === null ? null : `${weather.speed} mph`}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

          {/* {weather === null ? null : <WindInfo weather={weather} />} */}