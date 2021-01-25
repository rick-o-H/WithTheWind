import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

export default function TimeOfDay() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Paper elevation={3} style={{ backgroundColor: '#fafafa' }}>
        <Grid container justify="space-around">
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </Paper>
    </MuiPickersUtilsProvider>
  );
}

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import AccessTime from '@material-ui/icons/AccessTime';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme) => ({
//   time: {
//     margin: theme.spacing(1),
//     // width: theme.spacing(40),
//     // height: theme.spacing(20),
//   },
// }));

// export default function TimeOfDay() {
//   const classes = useStyles();
//   return (
//     <Paper elevation={3} style={{ backgroundColor: '#45484a' }}>
//       <Grid container spacing={2}>
//         <Grid item>
//           <AccessTime style={{ fontSize: 100 }} />
//         </Grid>
//         <Grid item>
//           <Typography variant="h4" className={classes.time}>
//             2:00 PM
//           </Typography>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }
