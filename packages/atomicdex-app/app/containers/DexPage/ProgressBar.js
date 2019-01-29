// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LinearProgress from '../../components/ProgressBar';
import { makeSelectBalanceLoading } from '../App/selectors';
import { makeSelectPricesLoading } from './selectors';

const debug = require('debug')('atomicapp:containers:DexPage:ProgressBar');

type Props = {
  balanceLoading: boolean,
  priceLoading: boolean
};

export class ProgressBar extends React.PureComponent<Props> {

  render() {
    debug('render');

    const { balanceLoading, priceLoading } = this.props;
    if (balanceLoading || priceLoading) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  priceLoading: makeSelectPricesLoading(),
  balanceLoading: makeSelectBalanceLoading()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBar);
