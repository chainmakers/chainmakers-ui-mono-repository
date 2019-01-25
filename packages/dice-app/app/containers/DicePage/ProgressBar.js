// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LinearProgress from '../../components/ProgressBar';
import { makeSelectKomododState } from '../App/selectors';
import { KOMODOD_STATE_STARTED } from '../App/constants';

const debug = require('debug')('kmdice:containers:DicePage:ProgressBar');

type IProgressBarProps = {
  komododState: string
};

export class ProgressBar extends React.PureComponent<IProgressBarProps> {
  render() {
    debug('render');
    const { komododState } = this.props;
    if (komododState === KOMODOD_STATE_STARTED) {
      return <LinearProgress />;
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  komododState: makeSelectKomododState()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ProgressBar);
