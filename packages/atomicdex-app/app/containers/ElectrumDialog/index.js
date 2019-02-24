// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import injectSaga from '../../utils/inject-saga';
import injectReducer from '../../utils/inject-reducer';
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
  open: boolean
};

type ILogoutDialogState = {
  show: boolean
};

class ElectrumDialog extends React.Component<
  ILogoutDialogProps,
  ILogoutDialogState
> {
  state = {
    show: false
  };

  showContent = () => {
    this.setState({
      show: true
    });
  };

  hideContent = () => {
    this.setState({
      show: false
    });
  };

  render() {
    debug('render');
    const { open } = this.props;
    const { show } = this.state;

    return (
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        onEntered={this.showContent}
        onExited={this.hideContent}
        aria-labelledby="electrum-dialog-title"
        aria-describedby="electrum-dialog-description"
        scroll="paper"
      >
        <ElectrumDialogContent show={show} />
      </Dialog>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  open: makeSelectElectrumState()
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
