// @flow
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const debug = require('debug')('atomicapp:containers:SettingsPage:HeaderTabs');

const styles = theme => ({
  buyTabs__tab: {
    minWidth: 100
  },

  buyTabs__labelContainer: {
    paddingLeft: 12,
    paddingRight: 12
  },

  buyTabs__badge: {
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },

  buyTabs__tablabel: {
    padding: `0 ${theme.spacing.unit * 2}px`
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
            labelContainer: classes.buyTabs__labelContainer
          }}
          label="About"
          className={classes.buyTabs__tab}
        />
      </Tabs>
    );
  }
}

export default withStyles(styles)(HeaderTabs);
