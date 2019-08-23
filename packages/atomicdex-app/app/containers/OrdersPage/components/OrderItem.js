// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import getCoinMemoize from '../../../components/CryptoIcons';

const debug = require('debug')('atomicapp:containers:OrdersPage:OrderItem');

const useStyles = makeStyles(theme => ({}));

type IOrderItemProps = {};

function OrderItem(props: IOrderItemProps) {
  debug(`render`);
  const classes = useStyles();

  return <div>OrderItem</div>;
}

OrderItem.defaultProps = {};

OrderItem.displayName = 'OrdersPage__OrderItem';

export default OrderItem;
