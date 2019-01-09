// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import MDCList from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';
import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';
import { openDetailModal, closeDetailModal } from './actions';
import { makeSelectCurrentSwaps, makeSelectFinishedSwaps } from './selectors';
import PageSectionTitle from '../../components/PageSectionTitle';
import TransactionRecord from './components/TransactionRecord';

const debug = require('debug')('atomicapp:containers:DexPage:MyOrders');

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
  },

  swapform__emptystate: {
    textAlign: 'center'
  },

  swapform__iconemptystate: {
    fontSize: 50
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  currentSwaps: List<*>,
  finishedSwaps: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenDetailModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseDetailModal: Function
};

class MyOrders extends React.PureComponent<Props> {
  props: Props;

  openRight = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { target } = evt;
    const { dispatchOpenDetailModal } = this.props;
    dispatchOpenDetailModal(target.value);
  };

  closeRight = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchCloseDetailModal } = this.props;
    dispatchCloseDetailModal();
  };

  renderSwap = swap => (
    <TransactionRecord
      key={swap.get('uuid')}
      onClick={this.openRight}
      swap={swap}
    />
  );

  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
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

  renderCurrentSwaps = () => {
    const { currentSwaps } = this.props;
    const hasData = currentSwaps.size > 0;
    if (!hasData) return this.renderEmptyState();
    return <MDCList>{currentSwaps.map(this.renderSwap)}</MDCList>;
  };

  renderfinishedSwaps = () => {
    const { finishedSwaps } = this.props;
    const hasData = finishedSwaps.size > 0;
    if (!hasData) return this.renderEmptyState();
    return <MDCList>{finishedSwaps.map(this.renderSwap)}</MDCList>;
  };

  render() {
    debug('render');

    const { classes } = this.props;
    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.containerSection}>
          <CardContent className={classes.cardContent}>
            <PageSectionTitle title="Swap in progress" />

            {this.renderCurrentSwaps()}
          </CardContent>

          <CardContent className={classes.cardContent}>
            <PageSectionTitle title="History" />

            {this.renderfinishedSwaps()}
          </CardContent>
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchOpenDetailModal: (uuid: string) => dispatch(openDetailModal(uuid)),
    dispatchCloseDetailModal: () => dispatch(closeDetailModal())
  };
}

const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalanceEntities(),
  balanceLoading: makeSelectBalanceLoading(),
  currentSwaps: makeSelectCurrentSwaps(),
  finishedSwaps: makeSelectFinishedSwaps()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const MyOrdersWapper = compose(
  withConnect,
  withStyles(styles)
)(MyOrders);

export default MyOrdersWapper;
