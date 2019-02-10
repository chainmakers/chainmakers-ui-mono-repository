// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LinearProgress from '../../components/ProgressBar';
import { makeSelectTransactionsLoading } from './selectors';

const debug = require('debug')('atomicapp:containers:WalletPage:ProgressBar');

type IProgressBarProps = {
  transactionsLoading: boolean
};

export class ProgressBarUI extends React.PureComponent<IProgressBarProps> {
  render() {
    debug('render');
    const { transactionsLoading } = this.props;
    if (transactionsLoading) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  transactionsLoading: makeSelectTransactionsLoading()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBarUI);
