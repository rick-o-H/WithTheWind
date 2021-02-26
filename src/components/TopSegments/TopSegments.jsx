import React from 'react';
import ReactGA from 'react-ga';
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
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%',
  },
  indicator: {
    backgroundColor: theme.palette.info.light,
  },
  scroller: {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function TopSegments({ segments, selectSegment }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    selectSegment(newValue + 1);
    ReactGA.event({
      category: 'top segments',
      action: 'new segment selected',
    })
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        indicatorColor="primary"
        onChange={handleChange}
        scrollButtons="on"
        aria-label="Vertical tabs example"
        className={classes.tabs}
        classes={{ scrollButtons: classes.scroller }}
      >
        {segments.map((segment, index) => (
          <Tab classes={{ selected: classes.indicator }} label={`${segment.rank}. ${segment.segment.name}`} {...a11yProps(segment.rank)} key={segment.segment._id} />
        ))}
      </Tabs>
    </div>
  );
}
