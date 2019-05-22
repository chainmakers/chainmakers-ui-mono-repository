// @flow
import React, { Component } from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import getCoinMemoize from '../../components/CryptoIcons';
import PageSectionTitle from '../../components/PageSectionTitle';
import CoinSelectable from '../../components/CoinSelectable';
import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';
import { loadAllBalance } from '../App/actions';
import CurrencySection from './components/CurrencySection';
import PaymentSection from './components/PaymentSection';
import Order from './components/Order';
import { loadPrices } from './actions';

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

  cardContent__rightBtn: {
    position: 'absolute',
    right: 0,
    top: -12
  },

  debug: {
    // border: '1px solid red'
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
  balance: Object
};

class SellOrderTab extends Component<ISellOrderTabProps> {
  componentDidMount = () => {
    const { dispatchLoadAllBalance } = this.props;

    dispatchLoadAllBalance();
  };

  onReloadPrices = (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { dispatchLoadPrices } = this.props;

    dispatchLoadPrices();
  };

  render() {
    debug('render');

    const { classes, balanceLoading, balance } = this.props;

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
          <CurrencySection
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
            <CurrencySection
              balance={balance}
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
            <Order symbol="PIZZA" />
            <br />
            <Order symbol="BEER" />
            <br />
            <Order symbol="COQUI" />
            <br />
            <Order symbol="KMD" />
            <br />
            {[1, 2, 3, 4, 5, 6, 7, 8].map(k => (
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
            ))}
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
    dispatchLoadAllBalance: () => dispatch(loadAllBalance())
  };
}

const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalanceEntities(),
  balanceLoading: makeSelectBalanceLoading()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(SellOrderTab);
