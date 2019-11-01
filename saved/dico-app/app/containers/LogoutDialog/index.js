// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import reducer from './reducer';
import saga from './saga';
import { cancelLogoutDialog, agreeLogoutDialog } from './actions';
import { makeSelectLogoutState } from './selectors';
import { APP_STATE_NAME } from './constants';

const debug = require('debug')('dicoapp:containers:LogoutDialog');

type Props = {
  show: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCancelLogoutDialog: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchAgreeLogoutDialog: Function
};

class LogoutDialog extends Component<Props> {
  props: Props;

  onCancelLogoutDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchCancelLogoutDialog } = this.props;
    dispatchCancelLogoutDialog();
  };

  onAgreeLogoutDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchAgreeLogoutDialog } = this.props;
    dispatchAgreeLogoutDialog();
  };

  render() {
    debug('render');
    const { show } = this.props;

    return (
      <Dialog
        open={show}
        onClose={this.onCancelLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id="dicoapp.containers.LogoutDialog.title">
            {(...content) => content}
          </FormattedMessage>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage id="dicoapp.containers.LogoutDialog.description">
              {(...content) => content}
            </FormattedMessage>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancelLogoutDialog} color="primary">
            <FormattedMessage id="dicoapp.containers.LogoutDialog.cancel">
              {(...content) => content}
            </FormattedMessage>
          </Button>
          <Button onClick={this.onAgreeLogoutDialog} color="primary" autoFocus>
            <FormattedMessage id="dicoapp.containers.LogoutDialog.submit">
              {(...content) => content}
            </FormattedMessage>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchCancelLogoutDialog: () => dispatch(cancelLogoutDialog()),
    dispatchAgreeLogoutDialog: () => dispatch(agreeLogoutDialog())
  };
}

const mapStateToProps = createStructuredSelector({
  show: makeSelectLogoutState()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(LogoutDialog);
