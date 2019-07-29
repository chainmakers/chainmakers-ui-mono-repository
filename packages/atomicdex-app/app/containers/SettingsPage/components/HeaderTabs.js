// @flow
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const debug = require('debug')('atomicapp:containers:SettingsPage:HeaderTabs');

const styles = () => ({
  headerTabs__tab: {
    minWidth: 100
  },

  headerTabs__labelContainer: {
    paddingLeft: 12,
    paddingRight: 12
  }
});

type IHeaderTabsProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  // currentSwaps: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  handleChange: Function,
  value: number
};

class HeaderTabs extends React.PureComponent<IHeaderTabsProps> {
  render() {
    debug(`render`);
    const { value, classes, handleChange } = this.props;
    return (
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab
          classes={{
            labelContainer: classes.headerTabs__labelContainer
          }}
          label="General"
          className={classes.headerTabs__tab}
        />
      </Tabs>
    );
  }
}

export default withStyles(styles)(HeaderTabs);
