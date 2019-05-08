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
import { makeSelectBalanceList } from '../App/selectors';
import { loadAllBalance } from '../App/actions';
import { showElectrumDialog } from '../ElectrumDialog/actions';
import AddElectrumPlaceholer from './components/AddElectrumPlaceholer';
import Asset from './components/Asset';

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

type IPortfolioTabProps = {
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  list: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadAllBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchShowElectrumDialog: Function
};

class PortfolioTab extends React.PureComponent<IPortfolioTabProps> {
  static displayName = 'Overview';

  componentDidMount = () => {
    const { dispatchLoadAllBalance } = this.props;
    dispatchLoadAllBalance();
  };

  renderWallet = (data, k) => {
    const { classes } = this.props;

    return (
      <Grid
        key={`wallet_page_overview${data.get('symbol')}`}
        item
        xs={6}
        className={ClassNames(classes.containerSection, {
          [classes.portfolioTab__tabLeft]: k % 2 === 1,
          [classes.portfolioTab__tabRight]: k % 2 === 0
        })}
      >
        <Asset symbol={data.get('symbol')} />
      </Grid>
    );
  };

  render() {
    debug(`render`);

    const { list, classes, dispatchShowElectrumDialog } = this.props;

    return (
      <Grid container spacing={16}>
        {list.map(this.renderWallet)}
        <Grid
          key="wallet_page_overview-electrum"
          item
          xs={6}
          className={ClassNames(classes.containerSection, {
            [classes.portfolioTab__tabLeft]: list.size % 2 === 1,
            [classes.portfolioTab__tabRight]: list.size % 2 === 0
          })}
        >
          <AddElectrumPlaceholer onClick={dispatchShowElectrumDialog} />
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadAllBalance: () => dispatch(loadAllBalance()),
    dispatchShowElectrumDialog: () => dispatch(showElectrumDialog())
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectBalanceList()
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
