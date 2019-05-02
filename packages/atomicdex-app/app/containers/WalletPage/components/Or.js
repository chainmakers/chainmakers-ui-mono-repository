// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const debug = require('debug')('atomicapp:containers:WalletPage:Or');

const styles = () => ({
  or: {
    marginBottom: 13,
    textTransform: 'uppercase',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',

    '&::before': {
      margin: '0 10px 0 0',
      content: '""',
      display: 'inline-block',
      height: 0,
      // borderBottom: '1px solid #263241',
      borderBottom: '1px solid #f1f3f4',
      width: '25%'
      // opacity: 0.3
    },

    '&::after': {
      margin: '0 0 0 10px',
      content: '""',
      display: 'inline-block',
      height: 0,
      // borderBottom: '1px solid #263241',
      borderBottom: '1px solid #f1f3f4',
      width: '25%'
      // opacity: 0.3
    }
  }
});

type Props = {
  classes: Styles
};

class Or extends React.PureComponent<Props> {
  render() {
    debug(`render`);

    const { classes } = this.props;

    return (
      <div className={classes.or}>
        <span>Or</span>
      </div>
    );
  }
}

Or.displayName = 'Or';

export default withStyles(styles)(Or);
