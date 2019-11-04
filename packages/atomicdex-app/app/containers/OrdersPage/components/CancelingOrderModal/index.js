// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { clipboardCopy, floor } from 'barterdex-utilities';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { openSnackbars } from '../../../Snackbars/actions';
// import getCoinMemoize from '../../../../components/CryptoIcons';
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
  dispatchOpenSnackbars: Function,
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

  copyUUIDToClipboard = async (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { order, dispatchOpenSnackbars } = this.props;
    const uuid = order.get('uuid');
    clipboardCopy(uuid);
    dispatchOpenSnackbars('Copied');
    evt.target.focus();
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
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={this.copyUUIDToClipboard}>
          <ListItemIcon>
            UUID
          </ListItemIcon>
          <ListItemText primary={order.get('uuid')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            @
          </ListItemIcon>
          <ListItemText primary={order.get('address')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            BASE
          </ListItemIcon>
          <ListItemText primary={<>
            {order.get('base')}
          </>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            REL
          </ListItemIcon>
          <ListItemText primary={<>
            {order.get('rel')}
          </>} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            PRICE
          </ListItemIcon>
          <ListItemText primary={<>
            {floor(order.get('price'), 8)}
          </>} />
        </ListItem>
      </List>
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
            Do you want to cancel your order?
          </Typography>
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
      dispatch(cancelNewOrder(option)),
    dispatchOpenSnackbars: (message: string) =>
      dispatch(openSnackbars(message)),
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
