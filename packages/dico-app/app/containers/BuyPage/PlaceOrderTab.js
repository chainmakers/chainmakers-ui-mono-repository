// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PageSectionTitle from '../../components/PageSectionTitle';
import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';
import { loadBalance } from '../App/actions';
import AmountSection from './components/AmountSection';
import CurrencySection from './components/CurrencySection';
import PaymentSection from './components/PaymentSection';
import { loadPrices, loadPrice } from './actions';

const debug = require('debug')('dicoapp:containers:BuyPage:PlaceOrder');

const styles = () => ({
  container: {
    // marginTop: 65,
    marginTop: 112,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    // paddingBottom: 30
  },

  hr: {
    marginBottom: 20
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
  }
});

type Props = {
  balanceLoading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrices: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrice: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object
};

type State = {
  paymentCoin: string
};

class PlaceOrder extends Component<Props, State> {
  props: Props;

  state = {
    paymentCoin: ''
  };

  componentDidMount = () => {
    const { dispatchLoadBalance } = this.props;

    dispatchLoadBalance();
  };

  onReloadPrices = (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { dispatchLoadPrices } = this.props;

    dispatchLoadPrices();
  };

  onClickPaymentCoin = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    const { paymentCoin } = this.state;
    if (value !== paymentCoin) {
      this.setState({
        paymentCoin: value
      });
    }
  };

  render() {
    debug('render');

    const { classes, balanceLoading, balance, dispatchLoadPrice } = this.props;
    const { paymentCoin } = this.state;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.containerSection}>
          {/* <CardContent className={classes.cardContent}>
            <Tabs />
            <Divider className={classes.hr} />
          </CardContent> */}
          <CardContent className={classes.cardContent}>
            <PageSectionTitle
              title={
                <FormattedMessage id="dicoapp.containers.BuyPage.currency">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            {/* <Divider className={classes.hr} /> */}
            <CurrencySection balance={balance} onClick={this.onReloadPrices} />
          </CardContent>
          <CardContent className={classes.cardContent}>
            <PageSectionTitle
              title={
                <FormattedMessage id="dicoapp.containers.BuyPage.payment">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            <IconButton
              aria-label="Reload prices"
              className={classes.cardContent__rightBtn}
              onClick={this.onReloadPrices}
            >
              <Icon>cached</Icon>
            </IconButton>
            {/* <Divider className={classes.hr} /> */}
            <PaymentSection
              onClick={this.onClickPaymentCoin}
              paymentCoin={paymentCoin}
              balance={balance}
              dispatchLoadPrice={dispatchLoadPrice}
              loading={balanceLoading}
            />
          </CardContent>
          <CardContent className={classes.cardContent}>
            <PageSectionTitle
              title={
                <FormattedMessage id="dicoapp.containers.BuyPage.amount">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            {/* <Divider className={classes.hr} /> */}
            <AmountSection paymentCoin={paymentCoin} />
          </CardContent>
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadPrices: () => dispatch(loadPrices()),
    dispatchLoadPrice: (coin: string) => dispatch(loadPrice(coin)),
    dispatchLoadBalance: () => dispatch(loadBalance())
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

const PlaceOrderWapper = compose(
  withConnect,
  withStyles(styles)
)(PlaceOrder);

export default PlaceOrderWapper;
