// @flow
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const debug = require('debug')('atomicapp:containers:WalletPage:HeaderTabs');

// const styles = theme => ({
const styles = () => ({
  root__tab: {
    minWidth: 100
  },

  root__labelContainer: {
    paddingLeft: 12,
    paddingRight: 12
  },

  root__divider: {
    opacity: 1,
    backgroundColor: 'transparent',
    borderBottom: '1px solid #f1f3f4'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  handleChange: Function,
  value: number
};

class HeaderTabs extends React.PureComponent<Props> {
  render() {
    debug(`render`);
    const { value, classes, handleChange } = this.props;
    return (
      <>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab
            classes={{
              labelContainer: classes.root__labelContainer
            }}
            label="Detail"
            className={classes.root__tab}
          />
          <Tab label="Deposit" className={classes.root__tab} />
          <Tab label="Withdraw" className={classes.root__tab} />
        </Tabs>
        <Divider className={classes.root__divider} />
      </>
    );
  }
}

export default withStyles(styles)(HeaderTabs);
