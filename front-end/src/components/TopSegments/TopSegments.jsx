import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#45484a',
    display: 'flex',
    height: '95%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%',
  },
}));

export default function TopSegments({ segments, selectSegment }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    selectSegment(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {segments.map((segment, index) => (
          <Tab label={`${index}. ${segment.name}`} {...a11yProps(index)} />
        ))}
      </Tabs>
    </div>
  );
}
