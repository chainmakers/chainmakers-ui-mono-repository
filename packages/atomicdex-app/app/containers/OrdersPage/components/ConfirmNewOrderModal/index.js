// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { floor } from 'barterdex-utilities';
import { requiredNumber } from '../../../../components/Form/helper';
import validate from '../../../../components/Form/validate';
import { closeConfirmNewOrderModal, setNewOrder } from '../../actions';
import {
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie,
  makeSelectConfirmNewOrderModal
} from '../../selectors';

const debug = require('debug')(
  'atomicapp:containers:OrdersPage:components:ConfirmNewOrderModal'
);

// eslint-disable-next-line react/prop-types
const TextInput = ({ onChange, value, error, isError, ...props }) => (
  <TextField
    {...props}
    error={isError}
    helperText={error}
    value={value}
    onChange={onChange}
    margin="dense"
  />
);

const ValidationPriceInput = validate(TextInput, [requiredNumber], {
  onChange: true
});

type IConfirmNewOrderModalProps = {
  confirmNewOrderModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseConfirmNewOrderModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSetNewOrder: Function,
  deposit: string,
  recevie: string
};

type IConfirmNewOrderModalState = {
  disabledPriceButton: boolean
};

class ConfirmNewOrderModal extends React.PureComponent<
  IConfirmNewOrderModalProps,
  IConfirmNewOrderModalState
> {
  constructor(props) {
    super(props);

    this.state = {
      disabledPriceButton: true
    };

    this.priceInput = React.createRef();
  }

  onCancelLogoutDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchCloseConfirmNewOrderModal } = this.props;
    dispatchCloseConfirmNewOrderModal();
  };

  onAgreeDialog = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    this.setPrice();
    this.close();
  };

  controlOKButton = (state: boolean) => {
    const { disabledPriceButton } = this.state;
    const s = {};
    if (disabledPriceButton !== state) {
      s.disabledPriceButton = state;
    }
    this.setState(s);
  };

  onChangePriceInput = async () => {
    try {
      debug(`onChangePriceInput`);
      const priceInput = this.priceInput.current;
      const price = floor(await priceInput.value(), 8);
      if (price > 0) {
        this.controlOKButton(false);
      } else {
        this.controlOKButton(true);
      }
    } catch (err) {
      this.controlOKButton(true);
      debug(`onChangePriceInput: ${err.message}`);
    }
  };

  onKeyPress = (evt: SyntheticInputEvent<>) => {
    if (evt.which === 13) {
      this.setPrice();
      this.close();
    }
  };

  close = () => {
    const { dispatchCloseConfirmNewOrderModal } = this.props;
    dispatchCloseConfirmNewOrderModal();
  };

  setPrice = async () => {
    const { dispatchSetNewOrder } = this.props;
    const priceInput = this.priceInput.current;
    const price = floor(await priceInput.value(), 8);
    dispatchSetNewOrder(price);
  };

  render() {
    debug('render');
    const { deposit, recevie, confirmNewOrderModal } = this.props;
    const { disabledPriceButton } = this.state;
    // #5f6368

    return (
      <Dialog
        open={confirmNewOrderModal.get('open')}
        onClose={this.onCancelLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Place New Order</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please set the price for your order.
          </DialogContentText>
          <br />
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <TextField
                disabled
                margin="dense"
                id="deposit-textfield-order-modal"
                label={`Deposit (${deposit || 'N/A'})`}
                value="1"
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <SwapHorizIcon />
            </Grid>
            <Grid item xs={5}>
              <ValidationPriceInput
                autoFocus
                id="recevie-textfield-order-modal"
                label={`Receive (${recevie || 'N/A'})`}
                type="number"
                ref={this.priceInput}
                onChange={this.onChangePriceInput}
                onKeyPress={this.onKeyPress}
                // defaultValue="0"
              />
            </Grid>
            {/* <Grid item xs={2}>
              <Button
                color="primary"
                variant="contained"
                
                style={{
                  boxShadow: 'none',
                }}
              >CoinSwitch</Button>
            </Grid> */}
          </Grid>
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
            disabled={disabledPriceButton}
            onClick={this.onAgreeDialog}
            color="primary"
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
    dispatchCloseConfirmNewOrderModal: () =>
      dispatch(closeConfirmNewOrderModal()),
    dispatchSetNewOrder: (price: number) => dispatch(setNewOrder(price))
  };
}

const mapStateToProps = createStructuredSelector({
  confirmNewOrderModal: makeSelectConfirmNewOrderModal(),
  deposit: makeSelectOrderbookDeposit(),
  recevie: makeSelectOrderbookRecevie()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ConfirmNewOrderModal);
