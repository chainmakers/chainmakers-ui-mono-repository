// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { formatDate } from 'barterdex-utilities';
import { makeSelectBetHistoryListData } from './selectors';

const debug = require('debug')('kmdice:containers:DicePage:BetHistory');

const styles = {
  betHistory__container: {
    backgroundColor: '#fafafa',
    marginTop: 40
  },

  betHistory__tabs: {
    marginBottom: 19
  }
};

type IBetHistoryProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  betHistoryEntities: Map<*, *>
};

type IBetHistoryState = {
  tabIndex: number
};

class BetHistory extends React.PureComponent<
  IBetHistoryProps,
  IBetHistoryState
> {
  state = {
    tabIndex: 0
  };

  onClickTabs = (event, value) => {
    this.setState({ tabIndex: value });
  };

  renderRow = row => (
    <TableRow key={row.get('id')}>
      <TableCell component="th" scope="row">
        {row.get('id')}
      </TableCell>
      <TableCell align="center">
        {formatDate(row.get('time'), 'yyyy-MM-dd HH:mm:ss')}
      </TableCell>
      <TableCell align="center">{row.get('amount')}</TableCell>
      <TableCell align="center">{row.get('numberToBet')}</TableCell>
      <TableCell align="center">{row.get('status')}</TableCell>
      <TableCell align="center" />
      <TableCell align="right" />
    </TableRow>
  );

  render() {
    debug('render');
    const { classes, betHistoryEntities } = this.props;
    const { tabIndex } = this.state;

    return (
      <Grid item xs={12} className={classes.betHistory__container}>
        <Tabs
          value={tabIndex}
          onChange={this.onClickTabs}
          indicatorColor="primary"
          textColor="primary"
          centered
          className={classes.betHistory__tabs}
        >
          <Tab label="All Bets" />
          <Tab label="Win" />
          <Tab label="Lose" />
        </Tabs>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">TIME</TableCell>
              <TableCell align="center">AMOUNT</TableCell>
              <TableCell align="center">NUMBER</TableCell>
              <TableCell align="center">RESULT</TableCell>
              <TableCell align="center">PAYOUT</TableCell>
              <TableCell align="right">BALANCE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{betHistoryEntities.map(this.renderRow)}</TableBody>
        </Table>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  betHistoryEntities: makeSelectBetHistoryListData()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(
  withConnect,
  withStyles(styles)
)(BetHistory);
