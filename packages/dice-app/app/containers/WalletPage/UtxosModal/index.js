// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ClassNames from 'classnames';
// import type { Dispatch } from 'redux';
// import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';

const data = [
  {
    tx_hash: '3a01da70e54680d2fd85d36b63932aa4002757b8bb6856cee1ad221a2550b782',
    tx_pos: 0,
    height: 1876926,
    value: 57646537
  },
  {
    tx_hash: '208c9deb8015a05e06dfda390d6898644d4b767d685a32dd5889db6ddf74c7d3',
    tx_pos: 0,
    height: 1876940,
    value: 57386382
  },
  {
    tx_hash: 'ea5e0871e8826b5fcdeba6470114cabe69ce8caad00125e316ddef7d3974f510',
    tx_pos: 0,
    height: 1895764,
    value: 98674264
  },
  {
    tx_hash: 'b4c42894f4d6c88867f7d1da9905c0fa2ebb1f58a9e05a4d8a8a4e3cf197a52c',
    tx_pos: 0,
    height: 1895800,
    value: 99340926
  },
  {
    tx_hash: 'b50189ef4e57e0b877c7850cb9f551b77d3e516b1b42fe2e5d0b352add0d09ea',
    tx_pos: 0,
    height: 1895988,
    value: 100497598
  },
  {
    tx_hash: '185f217c656a3e3708e228009a2e1c6c00a90765da0a9a9a1cea2e91a8b6bb38',
    tx_pos: 0,
    height: 1896012,
    value: 100703129
  },
  {
    tx_hash: 'e45a37b6c2a248ea62b21985a53229d6f10001399663dfca8f05c45ab38168c5',
    tx_pos: 0,
    height: 1896015,
    value: 100217031
  },
  {
    tx_hash: 'd3c99187b78d794923142ad222a01ce21d91ae828c94d34c33ccc741b6021439',
    tx_pos: 0,
    height: 1941408,
    value: 89809469
  },
  {
    tx_hash: 'fe30a4e420d035bf86914a823b3cf31ef79adf9930acbe30e2f8086472489ac5',
    tx_pos: 0,
    height: 1943537,
    value: 144130047
  }
];

const debug = require('debug')('atomicapp:containers:WalletPage:UtxosModal');

const styles = () => ({
  depositModal__dialogTitle: {
    padding: '24px 24px 5px'
  },

  depositModal__emptystate: {
    textAlign: 'center',
    fontSize: 25
  },

  utxosModal__textRight: {
    textAlign: 'right'
  },

  utxosModal__textGreen: {
    textAlign: 'right',
    color: '#3c763d'
  },

  withdraw__listItem: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

export class UtxosModal extends React.PureComponent<Props> {
  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          id="deposit-modal-title"
          className={classes.depositModal__dialogTitle}
        >
          Deposit
        </DialogTitle>
        <DialogContent className={classes.depositModal__emptystate}>
          <Typography variant="title" gutterBottom>
            <CloudOff />
          </Typography>
          <Typography variant="subheading" gutterBottom>
            No data found. Please select an asset.
          </Typography>
        </DialogContent>
      </React.Fragment>
    );
  };

  // eslint-disable-next-line flowtype/no-weak-types
  renderItem = (item: Object) => {
    const { classes } = this.props;
    return (
      <ListItem
        alignItems="flex-start"
        classes={{
          root: classes.withdraw__listItem
        }}
      >
        <ListItemText
          classes={{
            // primary: classes.utxosModal__textRight,
            secondary: ClassNames(
              classes.utxosModal__textRight,
              classes.utxosModal__textGreen
            )
          }}
          primary={item.tx_hash}
          secondary={`+ ${item.value / 10 ** 8} KMD`}
        />
      </ListItem>
    );
  };

  render() {
    debug('render');
    const { classes } = this.props;
    return (
      // <SwipeableDrawer anchor="right" open>
      <SwipeableDrawer anchor="right" open>
        <DialogTitle
          id="utxos-modal-title"
          style={{
            textAlign: 'center'
          }}
        >
          UTXOs
        </DialogTitle>
        <DialogContent>
          NOTE: This is draft version
          <List>
            {data.map(this.renderItem)}
            <Divider />
            <ListItem
              classes={{
                secondaryAction: classes.withdraw__listItem
              }}
            >
              <ListItemText primary="TOTAL" />
              <ListItemSecondaryAction>
                <Typography variant="subheading" gutterBottom>
                  {`${98674264 / 10 ** 8} KMD`}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
      </SwipeableDrawer>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
// export function mapDispatchToProps(dispatch: Dispatch<Object>) {
//   return {};
// }

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps
  // mapDispatchToProps
);

const UtxosModalWapper = compose(
  withConnect,
  withStyles(styles)
)(UtxosModal);

export default UtxosModalWapper;
