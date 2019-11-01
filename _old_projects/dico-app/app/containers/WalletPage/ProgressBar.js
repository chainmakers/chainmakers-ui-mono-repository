/* eslint-disable import/no-named-as-default */
// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LinearProgress from '../../components/ProgressBar';
import { makeSelectBalanceLoading } from '../App/selectors';
import { makeSelectTransactionsLoading } from './selectors';

const debug = require('debug')('dicoapp:containers:BuyPage:ProgressBar');

type Props = {
  balanceLoading: boolean,
  transactionsLoading: boolean
};

export class ProgressBar extends PureComponent<Props> {
  props: Props;

  render() {
    debug('render');

    const { balanceLoading, transactionsLoading } = this.props;
    if (balanceLoading || transactionsLoading) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  transactionsLoading: makeSelectTransactionsLoading(),
  balanceLoading: makeSelectBalanceLoading()
});

const withConnect = connect(
  mapStateToProps,
  null
);

const ProgressBarWapper = compose(withConnect)(ProgressBar);

export default ProgressBarWapper;
/* eslint-enable import/no-named-as-default */
