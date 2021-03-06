// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  makeSelectOpenStateRemovingElectrumModal,
  makeSelectCoinRemovingElectrumModal
} from '../selectors';
import { closeRemoveElectrumModal } from '../actions';
import { removeElectrum } from '../../App/actions';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:RemovingElectrumModal'
);

type Props = {
  open: boolean,
  coin: string,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseRemoveElectrumModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchRemoveElectrum: Function
};

function RemovingElectrumModal(props: Props) {
  debug('render');

  const {
    open,
    coin,
    dispatchCloseRemoveElectrumModal,
    dispatchRemoveElectrum
  } = props;

  function handleCancel(evt: SyntheticInputEvent<>) {
    evt.preventDefault();
    dispatchCloseRemoveElectrumModal();
  }

  function handleConfirm(evt: SyntheticInputEvent<>) {
    evt.preventDefault();
    dispatchCloseRemoveElectrumModal();
    dispatchRemoveElectrum(coin);
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="removing-electrum-title"
      aria-describedby="removing-electrum-description"
    >
      <DialogTitle id="removing-electrum-title">Remove electrum</DialogTitle>
      <DialogContent>
        <DialogContentText id="removing-electrum-description">
          Are you sure you want to remove <b>{coin}</b> from your wallet?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          color="primary"
          style={{
            minWidth: 100
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          style={{
            boxShadow: 'none',
            marginLeft: 20,
            minWidth: 100
          }}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchCloseRemoveElectrumModal: () =>
      dispatch(closeRemoveElectrumModal()),
    dispatchRemoveElectrum: (coin: string) => dispatch(removeElectrum(coin))
  };
}

const mapStateToProps = createStructuredSelector({
  open: makeSelectOpenStateRemovingElectrumModal(),
  coin: makeSelectCoinRemovingElectrumModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default withConnect(RemovingElectrumModal);
