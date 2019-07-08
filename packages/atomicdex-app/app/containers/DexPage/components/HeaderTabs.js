// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { makeSelectCurrentSwaps } from '../selectors';

const debug = require('debug')('atomicapp:containers:DexPage:HeaderTabs');

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
  currentSwaps: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  handleChange: Function,
  value: number
};

class HeaderTabs extends React.PureComponent<IHeaderTabsProps> {
  render() {
    debug(`render`);
    const { value, classes, currentSwaps, handleChange } = this.props;
    const { size } = currentSwaps;
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
          label="Place Order"
          className={classes.buyTabs__tab}
        />
        <Tab
          label={
            size > 0 ? (
              <Badge
                color="secondary"
                badgeContent={size}
                className={classes.buyTabs__tablabel}
                classes={{ badge: classes.buyTabs__badge }}
              >
                My Swaps
              </Badge>
            ) : (
              'My Swaps'
            )
          }
          className={classes.buyTabs__tab}
        />
      </Tabs>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentSwaps: makeSelectCurrentSwaps()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(
  withConnect,
  withStyles(styles)
)(HeaderTabs);
