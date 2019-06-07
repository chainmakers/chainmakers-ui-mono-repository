// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { LOADING } from '../../constants';
import LinearProgress from '../../components/ProgressBar';
import {
  makeSelectOrderbookFetchStatus,
  makeSelectMyOrderFetchStatus,
  makeSelectCancelingOrderModalFetchStatus
} from './selectors';

const debug = require('debug')('atomicapp:containers:OrderPage:ProgressBar');

type IProgressBarProps = {
  orderbookFetchStatus: string,
  myOrderFetchStatus: string,
  cancelingOrderModalFetchStatus: string
};

export class ProgressBarUI extends React.PureComponent<IProgressBarProps> {
  render() {
    debug('render');

    const {
      orderbookFetchStatus,
      myOrderFetchStatus,
      cancelingOrderModalFetchStatus
    } = this.props;
    if (orderbookFetchStatus && orderbookFetchStatus === LOADING) {
      return <LinearProgress />;
    }
    if (myOrderFetchStatus && myOrderFetchStatus === LOADING) {
      return <LinearProgress />;
    }
    if (
      cancelingOrderModalFetchStatus &&
      cancelingOrderModalFetchStatus === LOADING
    ) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  orderbookFetchStatus: makeSelectOrderbookFetchStatus(),
  myOrderFetchStatus: makeSelectMyOrderFetchStatus(),
  cancelingOrderModalFetchStatus: makeSelectCancelingOrderModalFetchStatus()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBarUI);
