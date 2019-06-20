// @flow
import React from 'react';
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
import { logout } from '../App/actions';
import reducer from './reducer';
import { hideLogoutDialog } from './actions';
import { makeSelectLogoutState } from './selectors';
import { APP_STATE_NAME } from './constants';

const debug = require('debug')('atomicapp:containers:LogoutDialog');

type ILogoutDialogProps = {
  show: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLogout: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchHideLogoutDialog: Function
};

class LogoutDialog extends React.Component<ILogoutDialogProps> {
  onCancelLogoutDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchHideLogoutDialog } = this.props;
    dispatchHideLogoutDialog();
  };

  onAgreeLogoutDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchHideLogoutDialog, dispatchLogout } = this.props;
    dispatchHideLogoutDialog();
    dispatchLogout();
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
          <FormattedMessage id="atomicapp.containers.LogoutDialog.title">
            {(...content) => content}
          </FormattedMessage>
        </DialogTitle>
        <DialogContent style={{
          width: 350
        }}>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage id="atomicapp.containers.LogoutDialog.description">
              {(...content) => content}
            </FormattedMessage>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.onCancelLogoutDialog}
            color="primary"
            style={{
              minWidth: 100
            }}
          >
            <FormattedMessage id="atomicapp.containers.LogoutDialog.cancel">
              {(...content) => content}
            </FormattedMessage>
          </Button>
          <Button
            onClick={this.onAgreeLogoutDialog}
            color="primary"
            autoFocus
            variant="contained"
            style={{
              boxShadow: 'none',
              marginLeft: 20,
              minWidth: 100
            }}
          >
            <FormattedMessage id="atomicapp.containers.LogoutDialog.submit">
              {(...content) => content}
            </FormattedMessage>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLogout: () => dispatch(logout()),
    dispatchHideLogoutDialog: () => dispatch(hideLogoutDialog())
  };
}

const mapStateToProps = createStructuredSelector({
  show: makeSelectLogoutState()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withConnect
)(LogoutDialog);
