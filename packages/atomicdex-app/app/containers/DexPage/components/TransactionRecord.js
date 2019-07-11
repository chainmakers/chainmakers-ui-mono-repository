// @flow
import React from 'react';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getMonth } from '../utils';
import getCoinMemoize from '../../../components/CryptoIcons';
import { STATE_SWAPS } from '../constants';

const debug = require('debug')(
  'atomicapp:containers:DexPage:TransactionRecord'
);

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClick: Function,
  swap: Map<*, *>
};

const styles = theme => ({
  transactionRecord__listItem: {
    paddingLeft: 0
  },

  transactionRecord__ItemDay: {
    flex: 'none',
    margin: '6px 12px 6px 0'
  },

  transactionRecord__ItemText: {
    margin: '6px 12px'
  },

  transactionRecord__ItemTextRight: {
    textAlign: 'right',
    top: '50%',
    right: 4,
    position: 'absolute',
    transform: 'translateY(-50%)'
  },

  transactionRecord__linearProgress: {
    height: 2
  },

  transactionRecord__success: {
    color: theme.colors.success
  },

  transactionRecord__danger: {
    color: theme.colors.danger
  }
});

export class Transaction extends React.PureComponent<Props> {
  onClick = (evt: SyntheticInputEvent<>) => {
    const { onClick, swap } = this.props;
    // eslint-disable-next-line no-param-reassign
    evt.target.value = swap.get('uuid');
    onClick(evt);
  };

  render() {
    debug(`render`);
    const { swap, classes } = this.props;
    const date = new Date(swap.get('expiration') * 1000);

    return (
      <React.Fragment>
        <ListItem
          key={swap.get('uuid')}
          button
          className={classes.transactionRecord__listItem}
          onClick={this.onClick}
        >
          <ListItemText
            primary={getMonth(date)}
            secondary={date.getDate()}
            className={classes.transactionRecord__ItemDay}
          />
          {/* {getCoinMemoize(swap.get('alice'))} */}
          {getCoinMemoize(swap.get('bob'))}
          <ListItemText
            primary={swap.get('uuid')}
            secondary={`Step ${
              swap.get('sentflags').size
            }/${STATE_SWAPS.length - 1}`}
            className={classes.transactionRecord__ItemText}
          />
          <ListItemText
            primary={
              <span className={classes.transactionRecord__success}>
                + {swap.get('bobamount')} {swap.get('bob')}
              </span>
            }
            secondary={
              <span className={classes.transactionRecord__danger}>
                - {swap.get('aliceamount')} {swap.get('alice')}
              </span>
            }
            className={classes.transactionRecord__ItemTextRight}
          />
        </ListItem>
        <LinearProgress
          color="primary"
          variant="determinate"
          className={classes.transactionRecord__linearProgress}
          value={(swap.get('sentflags').size * 100) / (STATE_SWAPS.length - 1)}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Transaction);
