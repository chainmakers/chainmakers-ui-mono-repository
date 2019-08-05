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
import Tooltip from '@material-ui/core/Tooltip';
import PageSectionTitle from '../../components/PageSectionTitle';
import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';
import { loadAllBalance } from '../App/actions';
import AmountSection from './components/AmountSection';
import CurrencySection from './components/CurrencySection';
import PaymentSection from './components/PaymentSection';
import { loadPrices } from './actions';

const debug = require('debug')('atomicapp:containers:DexPage:PlaceOrder');

const styles = () => ({
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
  }
});

type Props = {
  balanceLoading: boolean,
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadPrices: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadAllBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object
};

type State = {};

class PlaceOrder extends Component<Props, State> {
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
                <FormattedMessage id="atomicapp.containers.DexPage.currency">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            <CurrencySection balance={balance} />
          </CardContent>
          <CardContent
            id="payment-section-placeorder-dexpage"
            className={classes.cardContent}
          >
            <PageSectionTitle
              title={
                <FormattedMessage id="atomicapp.containers.DexPage.payment">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            <Tooltip title="Reload prices">
              <IconButton
                aria-label="Reload prices"
                className={classes.cardContent__rightBtn}
                onClick={this.onReloadPrices}
              >
                <Icon>cached</Icon>
              </IconButton>
            </Tooltip>
            <PaymentSection loading={balanceLoading} />
          </CardContent>
          <CardContent className={classes.cardContent}>
            <PageSectionTitle
              title={
                <FormattedMessage id="atomicapp.containers.DexPage.amount">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            <AmountSection balance={balance} />
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
)(PlaceOrder);
