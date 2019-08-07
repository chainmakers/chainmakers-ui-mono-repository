// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { floor } from 'barterdex-utilities';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import CoinSelectable from '../../../../components/CoinSelectable';
import getCoinMemoize from '../../../../components/CryptoIcons';
import { closeCancelingOrderModal, cancelNewOrder } from '../../actions';
import {
  makeSelectCancelingOrderModalOpen,
  makeSelectCancelingOrderModalEntity
} from '../../selectors';

const debug = require('debug')(
  'atomicapp:containers:OrdersPage:components:CancelingOrderModal'
);

// const styles = theme => ({
const styles = () => ({
  amountform__switchBtn: {
    position: 'absolute',
    textAlign: 'center',
    // top: '20%',
    top: 90,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25,
    width: 100
  },

  amountform__itemCenter: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    // border: '1px solid red'
  },

  swapform_button: {
    margin: '0 auto'
  },

  swapform__emptystate: {
    textAlign: 'center'
  },

  swapform__iconemptystate: {
    fontSize: 50
  }
});

type ICancelingOrderModalProps = {
  order: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseCancelingOrderModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCancelNewOrder: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  open: boolean
};

type ICancelingOrderModalState = {};

class CancelingOrderModal extends React.PureComponent<
  ICancelingOrderModalProps,
  ICancelingOrderModalState
> {
  onCancelLogoutDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchCloseCancelingOrderModal } = this.props;
    dispatchCloseCancelingOrderModal();
  };

  onAgreeDialog = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const {
      dispatchCloseCancelingOrderModal,
      dispatchCancelNewOrder,
      order
    } = this.props;
    dispatchCloseCancelingOrderModal();
    dispatchCancelNewOrder({
      id: order.get('id'),
      uuid: order.get('uuid')
    });
  };

  renderNotFound = () => {
    const { classes } = this.props;
    return (
      <div className={classes.swapform__emptystate}>
        <CloudOff className={classes.swapform__iconemptystate} />
        <Typography variant="subtitle1" gutterBottom>
          No data found. Please make a order.
        </Typography>
      </div>
    );
  };

  renderSwapInformation = () => {
    const { classes, order } = this.props;
    return (
      <Grid container spacing={0}>
        <Grid item xs={5} className={classes.amountform__itemCenter}>
          <CoinSelectable
            className={classes.swapform_button}
            icon={getCoinMemoize(order.get('rel'))}
            title={order.get('rel')}
            subTitle={
              <span className={classes.swapDetail__success}>
                {floor(order.get('price'), 8)} {order.get('rel')}
              </span>
            }
          />
        </Grid>
        <Grid item xs={2} className={classes.amountform__itemCenter}>
          <SwapHorizIcon />
        </Grid>
        <Grid item xs={5} className={classes.amountform__itemCenter}>
          <CoinSelectable
            className={classes.swapform_button}
            icon={getCoinMemoize(order.get('base'))}
            title={order.get('base')}
            subTitle={
              <span className={classes.swapDetail__danger}>
                1 {order.get('base')}
              </span>
            }
          />
        </Grid>
      </Grid>
    );
  };

  render() {
    debug('render');
    const { open, order } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.onCancelLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cancel your order</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Do you want to cancel your order? Here's the details:
          </Typography>
          <br />
          {!order && this.renderNotFound()}
          {order && this.renderSwapInformation()}
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
            disabled={!order}
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
    dispatchCloseCancelingOrderModal: () =>
      dispatch(closeCancelingOrderModal()),
    dispatchCancelNewOrder: (option: { id: string, uuid: string }) =>
      dispatch(cancelNewOrder(option))
  };
}

const mapStateToProps = createStructuredSelector({
  open: makeSelectCancelingOrderModalOpen(),
  order: makeSelectCancelingOrderModalEntity()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(CancelingOrderModal);
