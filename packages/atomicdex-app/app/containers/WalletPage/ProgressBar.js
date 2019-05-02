// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LinearProgress from '../../components/ProgressBar';
import {
  makeSelectTransactionsLoading,
  makeSelectLoadingAssetModal
} from './selectors';

const debug = require('debug')('atomicapp:containers:WalletPage:ProgressBar');

type IProgressBarProps = {
  transactionsLoading: boolean,
  assetLoading: boolean
};

export class ProgressBarUI extends React.PureComponent<IProgressBarProps> {
  render() {
    debug('render');
    const { transactionsLoading, assetLoading } = this.props;
    if (transactionsLoading || assetLoading) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  transactionsLoading: makeSelectTransactionsLoading(),
  assetLoading: makeSelectLoadingAssetModal()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBarUI);
