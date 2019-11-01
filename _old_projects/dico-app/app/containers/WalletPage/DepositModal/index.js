// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';
import clipboardCopy from '../../../utils/clipboard-copy';
import { openSnackbars } from '../../Snackbars/actions';
import {
  makeSelectDepositModal,
  makeSelectCoinDepositModal
} from '../selectors';
import { closeDepositModal } from '../actions';
import DepositContent from './DepositContent';

const debug = require('debug')('dicoapp:containers:WalletPage:DepositModal');

const styles = () => ({
  depositModal__dialogTitle: {
    padding: '24px 24px 5px'
  },

  depositModal__emptystate: {
    textAlign: 'center',
    fontSize: 25
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  depositModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  coin: Map<*, *> | null,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSnackbars: Function
};

export class DepositModal extends React.PureComponent<Props> {
  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          id="deposit-modal-title"
          className={classes.depositModal__dialogTitle}
        >
          Deposit
        </DialogTitle>
        <DialogContent className={classes.depositModal__emptystate}>
          <Typography variant="title" gutterBottom>
            <CloudOff />
          </Typography>
          <Typography variant="subheading" gutterBottom>
            No data found. Please select an asset.
          </Typography>
        </DialogContent>
      </React.Fragment>
    );
  };

  copyAddressToClipboard = async (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { coin, dispatchOpenSnackbars } = this.props;
    const address = coin.get('address');
    clipboardCopy(address);
    dispatchOpenSnackbars('Copied');
    evt.target.focus();
  };

  renderQRCode = () => {
    const { coin } = this.props;

    return (
      <DepositContent
        coin={coin}
        copyAddressToClipboard={this.copyAddressToClipboard}
      />
    );
  };

  render() {
    debug('render');
    const { depositModal, coin, onClose } = this.props;
    return (
      <Dialog
        tabIndex={0}
        aria-labelledby="deposit-modal-title"
        open={depositModal.get('open')}
        onClose={onClose}
      >
        {!coin && this.renderEmptyState()}
        {coin && this.renderQRCode()}
      </Dialog>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    onClose: () => dispatch(closeDepositModal()),
    dispatchOpenSnackbars: (message: string) => dispatch(openSnackbars(message))
  };
}

const mapStateToProps = createStructuredSelector({
  depositModal: makeSelectDepositModal(),
  coin: makeSelectCoinDepositModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const DepositModalWapper = compose(
  withConnect,
  withStyles(styles)
)(DepositModal);

export default DepositModalWapper;
