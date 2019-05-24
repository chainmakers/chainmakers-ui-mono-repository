// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { LOADING } from '../../constants';
import LinearProgress from '../../components/ProgressBar';
import { makeSelectOrderbookFetchStatus } from './selectors';

const debug = require('debug')('atomicapp:containers:OrderPage:ProgressBar');

type IProgressBarProps = {
  orderbookFetchStatus: string
};

export class ProgressBarUI extends React.PureComponent<IProgressBarProps> {
  render() {
    debug('render');

    const { orderbookFetchStatus } = this.props;
    if (orderbookFetchStatus && orderbookFetchStatus === LOADING) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  orderbookFetchStatus: makeSelectOrderbookFetchStatus()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBarUI);
