// @flow
import React from 'react';
import type { Element } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: theme.appbar.background,
    left: 72,
    width: 'auto'
  },

  appBar__divider: {
    bottom: -5,
    boxShadow: 'inset 0px 4px 8px -3px rgba(17, 17, 17, .06)',
    height: 5,
    left: 0,
    opacity: 1,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    backgroundColor: 'transparent'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  children: Element<any>
};

class MDCAppBar extends React.PureComponent<Props> {
  props: Props;

  static propTypes = {};

  render() {
    const { classes, children } = this.props;

    return (
      <AppBar
        id="app-bar"
        position="fixed"
        color="default"
        className={classes.appBar}
      >
        {children}
        <Divider className={classes.appBar__divider} />
      </AppBar>
    );
  }
}

export default withStyles(styles)(MDCAppBar);
