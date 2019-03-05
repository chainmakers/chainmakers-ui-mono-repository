// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LinearProgress from '../../components/ProgressBar';
import {
  makeSelectTransactionsLoading,
  makeSelectLoadingWithdrawModal
} from './selectors';

const debug = require('debug')('atomicapp:containers:WalletPage:ProgressBar');

type IProgressBarProps = {
  transactionsLoading: boolean,
  withdrawLoading: boolean
};

export class ProgressBarUI extends React.PureComponent<IProgressBarProps> {
  render() {
    debug('render');
    const { transactionsLoading, withdrawLoading } = this.props;
    if (transactionsLoading || withdrawLoading) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  transactionsLoading: makeSelectTransactionsLoading(),
  withdrawLoading: makeSelectLoadingWithdrawModal()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBarUI);
