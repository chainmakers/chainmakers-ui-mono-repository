// @flow
import React, { Component } from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Tooltip from '@material-ui/core/Tooltip';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PageSectionTitle from '../../components/PageSectionTitle';
import CoinSelectable from '../../components/CoinSelectable';
import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';
import { loadAllBalance } from '../App/actions';

import DepositSection from './components/DepositSection';
import RecevieSection from './components/RecevieSection';

import Order from './components/Order';
import { loadPrices, loadOrderbook } from './actions';
import { makeSelectOrderbookAsks } from './selectors';

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
  }
});

type ISellOrderTabProps = {
  balanceLoading: boolean,
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrices: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadAllBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadOrderbook: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object
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

  render() {
    debug('render');

    const { classes, balanceLoading, balance, orderbookAsks } = this.props;

    // const icon = getCoinMemoize('CHIPS', 64, 64);

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item md={2} xs={12} className={classes.debug}>
          {/* <CoinSelectable selected>
            {icon}
            <Typography component="div" variant="h6" color="inherit">
              Beer
            </Typography>
            <br />
            <Typography component="div" variant="subtitle1" color="inherit">
              93 BEER
            </Typography>
            1 N/A = 0 BEER
          </CoinSelectable>
          <CoinSelectable disabled>CoinSelectable</CoinSelectable> */}

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
            {/* <IconButton
              aria-label="Reload prices"
              className={classes.cardContent__rightBtn}
              onClick={this.onReloadPrices}
            >
              <Icon>cached</Icon>
            </IconButton> */}
            <RecevieSection
              style={{
                marginRight: 0
              }}
            />
          </div>
        </Grid>

        <Grid
          item
          md={3}
          xs={12}
          className={ClassNames(classes.debug, classes.root__endForMDScreen)}
        >
          <div className={classes.cardContent}>
            <Button
              variant="contained"
              color="primary"
              style={{
                boxShadow: 'none',
                marginBottom: 20
              }}
            >
              Place new order
            </Button>
          </div>
        </Grid>
        <Grid item md={2} xs={12} className={classes.debug} />
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
            {orderbookAsks.map(order => (
              <>
                <Order symbol="COQUI" data={order} />
                <br />
              </>
            ))}
            {/* {[1].map(k => (
              <>
                <Card
                  key={k}
                  className={classes.card}
                  style={{
                    border: '1px solid #dadce0',
                    boxShadow: 'none',
                    borderRadius: 8
                  }}
                >
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                      be bull nev bullobull lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      adjective
                    </Typography>
                    <Typography component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                <br />
              </>
            ))} */}
          </div>
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadPrices: () => dispatch(loadPrices()),
    dispatchLoadAllBalance: () => dispatch(loadAllBalance()),
    dispatchLoadOrderbook: () => dispatch(loadOrderbook())
  };
}

const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalanceEntities(),
  balanceLoading: makeSelectBalanceLoading(),
  orderbookAsks: makeSelectOrderbookAsks()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(SellOrderTab);
