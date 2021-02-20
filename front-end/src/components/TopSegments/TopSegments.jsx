import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: '#fafafa',
    display: 'flex',
    height: '95%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%',
  },
  indicator: {
    backgroundColor: theme.palette.info.light,
    // backgroundImage: `radial-gradient(circle closest-corner, white, ${theme.palette.secondary.light})`,
  },
  scroller: {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function TopSegments({ segments, selectSegment }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    selectSegment(newValue + 1);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
        scrollButtons="desktop"
        aria-label="Vertical tabs example"
        className={classes.tabs}
        classes={{ scrollButtons: classes.scroller }}
      >
        {segments.map((segment, index) => (
          <Tab classes={{ selected: classes.indicator }} label={`${segment.rank}. ${segment.segment.name} +${Math.round(segment.wind_advantage)}`} {...a11yProps(segment.rank)} key={segment.segment._id} />
        ))}
      </Tabs>
    </div>
  );
}
