/* eslint-disable react/no-array-index-key */
// @flow
import React from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import {
  makeSelectBalanceList,
  makeSelectBalanceEntities
} from '../App/selectors';
import { loadBalance } from '../App/actions';
import Asset from './components/Asset';
import { openWithdrawModal, openDepositModal } from './actions';

const debug = require('debug')('atomicapp:containers:WalletPage:PortfolioTab');

const styles = theme => ({
  containerSection: {
    paddingBottom: theme.spacing.unit * 4
    // paddingRight: 30
  },

  portfolioTab__tabLeft: {
    paddingLeft: theme.spacing.unit * 2
  },

  portfolioTab__tabRight: {
    paddingRight: theme.spacing.unit * 2
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  list: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  entities: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  openWithdraw: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  openDeposit: Function
};

class PortfolioTab extends React.PureComponent<Props> {
  componentDidMount = () => {
    debug('watch transactions');
    const { dispatchLoadBalance } = this.props;
    dispatchLoadBalance();
  };

  renderWallet = (t, k) => {
    const { classes, entities, openWithdraw, openDeposit } = this.props;
    const data = entities.get(t);
    return (
      <Grid
        key={`wallet_page_overview${data.get('coin')}`}
        item
        xs={6}
        className={ClassNames(classes.containerSection, {
          [classes.portfolioTab__tabLeft]: k % 2 === 1,
          [classes.portfolioTab__tabRight]: k % 2 === 0
        })}
      >
        <Asset
          data={data}
          openWithdraw={openWithdraw}
          openDeposit={openDeposit}
        />
      </Grid>
    );
  };

  render() {
    debug(`render`);

    const { list } = this.props;

    return (
      <Grid container spacing={16}>
        {list.map(this.renderWallet)}
      </Grid>
    );
  }
}

PortfolioTab.displayName = 'Overview';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    openWithdraw: (coin: string) => dispatch(openWithdrawModal(coin)),
    openDeposit: (coin: string) => dispatch(openDepositModal(coin)),
    dispatchLoadBalance: () => dispatch(loadBalance())
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectBalanceList(),
  entities: makeSelectBalanceEntities()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(PortfolioTab);
/* eslint-enable react/no-array-index-key */
