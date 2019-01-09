// @flow
import React from 'react';
import type { List } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';
import CachedIcon from '@material-ui/icons/Cached';
import {
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectLatestTransactions,
  makeSelectTransactionsQueueids
} from '../selectors';
import { loadTransactions, loadTransactionsLoop } from '../actions';
import TransactionsTable from './TransactionsTable';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:TransactionsTab'
);

const styles = theme => ({
  containerSection: {
    position: 'relative',
    paddingBottom: 30
  },

  btns: {
    top: 8,
    right: -12,
    display: 'flex',
    position: 'absolute'
  },

  walletTable__emptyContainer: {
    width: 350,
    color: '#202124',
    margin: '60px auto',
    textAlign: 'center'
  },

  walletTable__iconemptystate: {
    fontSize: 50,
    color: theme.palette.primary.main
  }
});

type Props = {
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  error: boolean | Object,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadTransactions: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadTransactionsLoop: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  transactions: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  switchToPortfolioTab: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  queueids: Map<*, *>
};

class TransactionsTab extends React.PureComponent<Props> {
  componentDidMount = () => {
    const { dispatchLoadTransactionsLoop } = this.props;
    dispatchLoadTransactionsLoop();
  };

  onClickReloadTranstactions = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadTransactions } = this.props;
    dispatchLoadTransactions();
  };

  renderEmptyState = () => {
    const { classes, switchToPortfolioTab } = this.props;

    return (
      <div className={classes.walletTable__emptyContainer}>
        <CloudOff className={classes.walletTable__iconemptystate} />
        <Typography variant="h6" gutterBottom>
          No data found
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Please start making a swap
        </Typography>
        <Button color="primary" onClick={switchToPortfolioTab}>
          go to portfolio
        </Button>
      </div>
    );
  };

  render() {
    debug(`render`);

    const { loading, queueids, classes, error, transactions } = this.props;
    const empty = !loading && transactions.size === 0 && queueids.size === 0;
    return (
      <Grid container spacing={16}>
        <Grid item xs={12} className={classes.containerSection}>
          <div className={classes.btns}>
            <IconButton
              disabled={loading}
              onClick={this.onClickReloadTranstactions}
            >
              <CachedIcon />
            </IconButton>
          </div>
          {error && (
            <SnackbarContent
              // className={classNames(classes[variant], className)}
              aria-describedby="client-snackbar"
              message={error.message}
            />
          )}
          {empty && this.renderEmptyState()}
          {!empty && (
            <TransactionsTable
              data={transactions}
              loading={loading || queueids.size !== 0}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

TransactionsTab.displayName = 'Transactions';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadTransactions: () => dispatch(loadTransactions()),
    dispatchLoadTransactionsLoop: () => dispatch(loadTransactionsLoop())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectTransactionsLoading(),
  error: makeSelectTransactionsError(),
  transactions: makeSelectLatestTransactions(),
  queueids: makeSelectTransactionsQueueids()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(TransactionsTab);
