import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DateAtSpecificHour } from '../../Utils/helperFunctions';

// idea: slider bar to select a certain time frame(1:00 PM to 4:00 PM) for ride time and
// display the best segments at different parts of the ride

const times = [
  {
    value: DateAtSpecificHour(0),
    label: '12:00 AM',
  },
  {
    value: DateAtSpecificHour(1),
    label: '1:00 AM',
  },
  {
    value: DateAtSpecificHour(2),
    label: '2:00 AM',
  },
  {
    value: DateAtSpecificHour(3),
    label: '3:00 AM',
  },
  {
    value: DateAtSpecificHour(4),
    label: '4:00 AM',
  },
  {
    value: DateAtSpecificHour(5),
    label: '5:00 AM',
  },
  {
    value: DateAtSpecificHour(6),
    label: '6:00 AM',
  },
  {
    value: DateAtSpecificHour(7),
    label: '7:00 AM',
  },
  {
    value: DateAtSpecificHour(8),
    label: '8:00 AM',
  },
  {
    value: DateAtSpecificHour(9),
    label: '9:00 AM',
  },
  {
    value: DateAtSpecificHour(10),
    label: '10:00 AM',
  },
  {
    value: DateAtSpecificHour(11),
    label: '11:00 AM',
  },
  {
    value: DateAtSpecificHour(12),
    label: '12:00 PM',
  },
  {
    value: DateAtSpecificHour(13),
    label: '1:00 PM',
  },
  {
    value: DateAtSpecificHour(14),
    label: '2:00 PM',
  },
  {
    value: DateAtSpecificHour(15),
    label: '3:00 PM',
  },
  {
    value: DateAtSpecificHour(16),
    label: '4:00 PM',
  },
  {
    value: DateAtSpecificHour(17),
    label: '5:00 PM',
  },
  {
    value: DateAtSpecificHour(18),
    label: '6:00 PM',
  },
  {
    value: DateAtSpecificHour(19),
    label: '7:00 PM',
  },
  {
    value: DateAtSpecificHour(20),
    label: '8:00 PM',
  },
  {
    value: DateAtSpecificHour(21),
    label: '9:00 PM',
  },
  {
    value: DateAtSpecificHour(22),
    label: '10:00 PM',
  },
  {
    value: DateAtSpecificHour(23),
    label: '11:00 PM',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TimeOfDayTwo() {
  const classes = useStyles();
  const [time, setTime] = React.useState('');

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <Paper elevation={3} style={{ backgroundColor: '#fafafa' }}>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-select-time"
            select
            label="Time"
            value={time}
            onChange={handleChange}
            helperText="Please select your time"
          >
            {times.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </form>
    </Paper>
  );
}
