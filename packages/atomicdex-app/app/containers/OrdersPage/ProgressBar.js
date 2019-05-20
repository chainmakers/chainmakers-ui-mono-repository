// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LinearProgress from '../../components/ProgressBar';
import { makeSelectPricesLoading } from './selectors';

const debug = require('debug')('atomicapp:containers:DexPage:ProgressBar');

type IProgressBarProps = {
  priceLoading: boolean
};

export class ProgressBarUI extends React.PureComponent<IProgressBarProps> {
  render() {
    debug('render');

    const { priceLoading } = this.props;
    if (priceLoading) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  priceLoading: makeSelectPricesLoading()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBarUI);
