// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LinearProgress from '../../components/ProgressBar';
import { makeSelectBetHistoryLoading } from './selectors';

const debug = require('debug')('kmdice:containers:DicePage:ProgressBar');

type IProgressBarProps = {
  betHistoryLoading: boolean
};

export class ProgressBarUI extends React.PureComponent<IProgressBarProps> {
  render() {
    debug('render');
    const { betHistoryLoading } = this.props;
    if (betHistoryLoading) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  betHistoryLoading: makeSelectBetHistoryLoading()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBarUI);
