// @flow
import React, { Component } from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { List, Map } from 'immutable';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { covertSymbolToName } from '../../utils/coin';
import { LOADING } from '../../constants';
import PageSectionTitle from '../../components/PageSectionTitle';
import CoinsSelectionDialog from '../CoinsSelectionDialog';
import { makeSelectBalanceEntities } from '../App/selectors';
import { loadAllBalance } from '../App/actions';

import DepositSection from './components/DepositSection';
import RecevieSection from './components/RecevieSection';

import Order from './components/Order';
import {
  loadOrderbook,
  closeDepositCoinModal,
  closeRecevieCoinModal,
  selectCoinDeposit,
  selectCoinRecevie,
  openConfirmNewOrderModal
} from './actions';
import {
  makeSelectOrderbookAsksFullList,
  makeSelectOrderbookBidsFullList,
  makeSelectDepositCoinModal,
  makeSelectRecevieCoinModal,
  makeSelectOrderbookRecevie,
  makeSelectOrderbookDeposit,
  makeSelectMyOrderFetchStatus,
  makeSelectMyOrderList
} from './selectors';

const debug = require('debug')('atomicapp:containers:DexPage:SellOrderTab');

const styles = theme => ({
  container: {
    // marginTop: 65,
    marginTop: 112,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    // paddingBottom: 30
  },

  cardContent: {
    position: 'relative',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
  },

  debug: {
    // border: '1px solid red'
  },

  root__reloadBtn: {
    position: 'absolute',
    right: 0,
    top: -12
  },

  root__centerForMDScreen: {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    }
  },

  root__endForMDScreen: {
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      display: 'flex'
    }
  },

  swapform__emptystate: {
    textAlign: 'center'
  },

  swapform__iconemptystate: {
    fontSize: 50
  },

  root__warningPlate: {
    textAlign: 'center',
    padding: 12,
    border: `1px dashed ${theme.colors.warning}`,
    borderRadius: 4,
    width: '100%'
  }
});

type ISellOrderTabProps = {
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadAllBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenConfirmNewOrderModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadOrderbook: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSelectCoinDeposit: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseRecevieCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseDepositCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSelectCoinRecevie: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  recevie: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  deposit: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  orderbookBids: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  depositCoinModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  recevieCoinModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  myOrderList: List<*>,
  myOrderFetchStatus: string
};

class SellOrderTab extends Component<ISellOrderTabProps> {
  componentDidMount = () => {
    const { dispatchLoadAllBalance } = this.props;

    dispatchLoadAllBalance();
  };

  onClickReloadOrderbook = (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { dispatchLoadOrderbook } = this.props;

    dispatchLoadOrderbook();
  };

  onClickPlaceNewOrder = (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { dispatchOpenConfirmNewOrderModal } = this.props;

    dispatchOpenConfirmNewOrderModal();
  };

  onSelectCoinDeposit = coin => {
    const {
      deposit,
      recevie,
      dispatchSelectCoinDeposit,
      dispatchSelectCoinRecevie
    } = this.props;
    dispatchSelectCoinDeposit(coin);
    if (recevie && recevie === coin.symbol) {
      dispatchSelectCoinRecevie({
        symbol: deposit,
        name: covertSymbolToName(deposit)
      });
    }
  };

  onSelectCoinRecevie = coin => {
    const {
      deposit,
      recevie,
      dispatchSelectCoinDeposit,
      dispatchSelectCoinRecevie
    } = this.props;
    dispatchSelectCoinRecevie(coin);
    if (deposit && deposit === coin.symbol) {
      dispatchSelectCoinDeposit({
        symbol: recevie,
        name: covertSymbolToName(recevie)
      });
    }
  };

  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <Typography
          variant="h6"
          gutterBottom
          className={classes.swapform__emptystate}
        >
          <CloudOff className={classes.swapform__iconemptystate} />
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.swapform__emptystate}
        >
          No data found. Please start making a swap.
        </Typography>
      </React.Fragment>
    );
  };

  render() {
    debug('render');

    const {
      classes,
      recevie,
      deposit,
      balance,
      orderbookBids,
      depositCoinModal,
      recevieCoinModal,
      dispatchCloseDepositCoinModal,
      dispatchCloseRecevieCoinModal,
      myOrderFetchStatus,
      myOrderList
    } = this.props;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item md={2} xs={12} className={classes.debug}>
          <CoinsSelectionDialog
            open={depositCoinModal.get('open')}
            onClose={dispatchCloseDepositCoinModal}
            onSelect={this.onSelectCoinDeposit}
          />

          <CoinsSelectionDialog
            open={recevieCoinModal.get('open')}
            onClose={dispatchCloseRecevieCoinModal}
            onSelect={this.onSelectCoinRecevie}
          />

          <PageSectionTitle
            title={
              <FormattedMessage id="atomicapp.containers.OrderPage.deposit">
                {(...content) => content}
              </FormattedMessage>
            }
          />
          <DepositSection
            balance={balance}
            style={{
              marginRight: 0,
              marginBottom: 30
            }}
          />
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          className={ClassNames(classes.debug, classes.root__centerForMDScreen)}
        >
          <SwapHorizIcon />
        </Grid>

        <Grid
          item
          md={2}
          xs={12}
          className={ClassNames(classes.debug, classes.root__endForMDScreen)}
        >
          <div className={classes.cardContent}>
            <PageSectionTitle
              title={
                <FormattedMessage id="atomicapp.containers.OrderPage.recevie">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            <RecevieSection
              style={{
                marginRight: 0,
                marginBottom: 30
              }}
            />
          </div>
        </Grid>

        <Grid
          item
          md={4}
          xs={12}
          className={ClassNames(classes.debug, classes.root__endForMDScreen)}
        >
          <div className={classes.cardContent}>
            <Button
              onClick={this.onClickPlaceNewOrder}
              disabled={
                recevie === null ||
                deposit === null ||
                myOrderFetchStatus === LOADING
              }
              variant="contained"
              color="primary"
              style={{
                boxShadow: 'none',
                marginBottom: 30
              }}
            >
              Place new order
            </Button>
          </div>
        </Grid>
        <Grid item md={1} xs={12} className={classes.debug} />
        <Grid item xs={12}>
          <div className={classes.cardContent}>
            <PageSectionTitle
              title={
                <FormattedMessage id="atomicapp.containers.OrderPage.orderbook">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            <Tooltip title="Reload orderbook">
              <IconButton
                aria-label="Reload orderbook"
                className={classes.root__reloadBtn}
                onClick={this.onClickReloadOrderbook}
              >
                <Icon>cached</Icon>
              </IconButton>
            </Tooltip>

            {orderbookBids.size === 0 && this.renderEmptyState()}
            {orderbookBids.size > 0 && (
              <>
                <div className={classes.root__warningPlate}>
                  <Typography gutterBottom>
                    <FormattedMessage id="atomicapp.containers.OrderPage.warning">
                      {(...content) => content}
                    </FormattedMessage>
                  </Typography>
                </div>
                <br />
                {orderbookBids.map((order, key) => (
                  <>
                    <Order
                      key={`orderbook-${key}`}
                      selected={myOrderList.contains(order.get('address'))}
                      data={order}
                    />
                    <br />
                  </>
                ))}
              </>
            )}
          </div>
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadAllBalance: () => dispatch(loadAllBalance()),
    dispatchLoadOrderbook: () => dispatch(loadOrderbook()),
    dispatchCloseDepositCoinModal: () => dispatch(closeDepositCoinModal()),
    dispatchCloseRecevieCoinModal: () => dispatch(closeRecevieCoinModal()),
    dispatchSelectCoinDeposit: payload => dispatch(selectCoinDeposit(payload)),
    dispatchSelectCoinRecevie: payload => dispatch(selectCoinRecevie(payload)),
    dispatchOpenConfirmNewOrderModal: () => dispatch(openConfirmNewOrderModal())
  };
}

const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalanceEntities(),
  orderbookAsks: makeSelectOrderbookAsksFullList(),
  orderbookBids: makeSelectOrderbookBidsFullList(),
  depositCoinModal: makeSelectDepositCoinModal(),
  recevieCoinModal: makeSelectRecevieCoinModal(),
  recevie: makeSelectOrderbookRecevie(),
  deposit: makeSelectOrderbookDeposit(),
  myOrderFetchStatus: makeSelectMyOrderFetchStatus(),
  myOrderList: makeSelectMyOrderList()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(SellOrderTab);
