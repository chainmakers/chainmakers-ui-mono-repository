// @flow
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import { useSettingsContext } from '../reducer';
import { selectCurrentTab } from '../selectors';
import { switchTab } from '../actions';

const debug = require('debug')('atomicapp:containers:SettingsPage:HeaderTabs');

const useStyles = makeStyles(() => ({
  headerTabs__tab: {
    minWidth: 100
  }
}));

type IHeaderTabsProps = {};

function HeaderTabs(props: IHeaderTabsProps) {
  debug(`render`);
  const classes = useStyles();

  const [state, dispatch] = useSettingsContext();

  const handleChange = (event, value) => {
    dispatch(switchTab(value));
  };

  return (
    <Tabs
      value={selectCurrentTab(state)}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
    >
      <Tab label="General" className={classes.headerTabs__tab} />
    </Tabs>
  );
}

HeaderTabs.defaultProps = {};

HeaderTabs.displayName = 'SettingsPage__HeaderTabs';

export default HeaderTabs;
