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
import TextField from '@material-ui/core/TextField';
import injectReducer from '../../utils/inject-reducer';
import { required } from '../../components/Form/helper';
import validate from '../../components/Form/validate';
import { startKMDiceChain } from '../App/actions';
import reducer from './reducer';
import { cancelLoginDialog, agreeLoginDialog } from './actions';
import { makeSelectLoginState } from './selectors';
import { APP_STATE_NAME } from './constants';

const debug = require('debug')('kmdice:containers:LoginDialog');

// eslint-disable-next-line react/prop-types
const TextInput = ({ onChange, value, error, isError, ...props }) => (
  <TextField
    {...props}
    error={isError}
    helperText={error}
    value={value}
    onChange={onChange}
  />
);

const ValidationPubkeyInput = validate(TextInput, [required], {
  onChange: true
});

type ILoginDialogProps = {
  show: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCancelLoginDialog: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchAgreeLoginDialog: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchStartKMDiceChain: Function
};

class LoginDialog extends React.PureComponent<ILoginDialogProps> {
  constructor(props) {
    super(props);

    this.pubkeyInput = React.createRef();
  }

  onCancelLoginDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchCancelLoginDialog } = this.props;
    dispatchCancelLoginDialog();
  };

  onAgreeLoginDialog = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();

    const { dispatchAgreeLoginDialog, dispatchStartKMDiceChain } = this.props;
    const pubkeyInput = this.pubkeyInput.current;
    const pubkey = await pubkeyInput.value();
    dispatchAgreeLoginDialog();
    dispatchStartKMDiceChain(pubkey);
  };

  render() {
    debug('render');
    const { show } = this.props;

    return (
      <Dialog
        open={show}
        fullWidth
        maxWidth="sm"
        onClose={this.onCancelLoginDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id="atomicapp.containers.LoginDialog.title">
            {(...content) => content}
          </FormattedMessage>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage id="atomicapp.containers.LoginDialog.description">
              {(...content) => content}
            </FormattedMessage>
          </DialogContentText>
          <ValidationPubkeyInput
            fullWidth
            ref={this.pubkeyInput}
            id="id-pubkey-chain"
            label="Your public key"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancelLoginDialog} color="primary">
            <FormattedMessage id="atomicapp.containers.LoginDialog.cancel">
              {(...content) => content}
            </FormattedMessage>
          </Button>
          <Button onClick={this.onAgreeLoginDialog} color="primary" autoFocus>
            <FormattedMessage id="atomicapp.containers.LoginDialog.submit">
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
    dispatchCancelLoginDialog: () => dispatch(cancelLoginDialog()),
    dispatchAgreeLoginDialog: () => dispatch(agreeLoginDialog()),
    dispatchStartKMDiceChain: (pubkey?: string) =>
      dispatch(startKMDiceChain(pubkey))
  };
}

const mapStateToProps = createStructuredSelector({
  show: makeSelectLoginState()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withConnect
)(LoginDialog);
