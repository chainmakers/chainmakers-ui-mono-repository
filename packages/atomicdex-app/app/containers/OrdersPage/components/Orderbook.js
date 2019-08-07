// @flow
import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';
import Order from './Order';
import OrderItem from './OrderItem';
import {
  makeSelectOrderbookFullList,
  makeSelectMyOrderList
} from '../selectors';

const debug = require('debug')('atomicapp:containers:OrdersPage:Orderbook');

const useStyles = makeStyles(theme => ({
  root__warningPlate: {
    textAlign: 'center',
    padding: 12,
    border: `1px dashed ${theme.colors.warning}`,
    borderRadius: 4,
    width: '100%'
  },

  root__emptystate: {
    textAlign: 'center'
  },

  root__iconemptystate: {
    fontSize: 50
  }
}));

type IOrderbookProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  orderbook: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  myOrderList: List<*>
};

function Orderbook(props: IOrderbookProps) {
  debug(`render`);
  const classes = useStyles();
  const { orderbook, myOrderList } = props;

  if (!orderbook || orderbook.size === 0) {
    return (
      <React.Fragment>
        <br />
        <br />
        <br />
        <Typography
          variant="h6"
          gutterBottom
          className={classes.root__emptystate}
        >
          <CloudOff className={classes.root__iconemptystate} />
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.root__emptystate}
        >
          <FormattedMessage id="atomicapp.containers.OrderPage.empty_message_in_orderbook">
            {(...content) => content}
          </FormattedMessage>
        </Typography>
      </React.Fragment>
    );
  }

  return (
    <>
      <div className={classes.root__warningPlate}>
        <Typography>
          <FormattedMessage id="atomicapp.containers.OrderPage.warning">
            {(...content) => content}
          </FormattedMessage>
        </Typography>
      </div>
      <br />
      {orderbook.map((order, key) => (
        <>
          <Order
            key={`orderbook-${key}`}
            selected={myOrderList.contains(order.get('id'))}
            data={order}
          />
          {/* <OrderItem /> */}
          <br />
        </>
      ))}
    </>
  );
}

Orderbook.defaultProps = {};

Orderbook.displayName = 'OrdersPage__Orderbook';

const mapStateToProps = createStructuredSelector({
  orderbook: makeSelectOrderbookFullList(),
  myOrderList: makeSelectMyOrderList()
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default withConnect(Orderbook);
