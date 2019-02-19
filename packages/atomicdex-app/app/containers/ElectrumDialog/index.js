// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import injectSaga from '../../utils/inject-saga';
import injectReducer from '../../utils/inject-reducer';
import { makeSelectBalanceFetchStatus } from '../App/selectors';
import saga from './saga';
import reducer from './reducer';
import { makeSelectElectrumState } from './selectors';
import { APP_STATE_NAME } from './constants';
import ElectrumDialogContent from './components/ElectrumDialogContent';

const debug = require('debug')('atomicapp:containers:ElectrumDialog');

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

type ILogoutDialogProps = {
  show: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  balanceFetchStatus: Map<*, *>
};

type ILogoutDialogState = {};

class ElectrumDialog extends React.Component<
  ILogoutDialogProps,
  ILogoutDialogState
> {
  render() {
    debug('render');
    const { show, balanceFetchStatus } = this.props;

    return (
      <Dialog
        fullScreen
        open={show}
        TransitionComponent={Transition}
        aria-labelledby="electrum-dialog-title"
        aria-describedby="electrum-dialog-description"
        scroll="paper"
      >
        <ElectrumDialogContent balanceFetchStatus={balanceFetchStatus} />
      </Dialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  show: makeSelectElectrumState(),
  balanceFetchStatus: makeSelectBalanceFetchStatus()
});

const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ElectrumDialog);
