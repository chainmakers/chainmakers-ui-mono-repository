// @flow
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import getCoinMemoize from '../../../components/CryptoIcons';

const debug = require('debug')('atomicapp:containers:OrdersPage:OrderItem');

const useStyles = makeStyles(theme => ({
  transactionRecord__listItem: {
    paddingLeft: 0
  },

  transactionRecord__ItemDay: {
    flex: 'none'
  },

  transactionRecord__ItemText: {
    // flex: '5 1 auto'
  },

  transactionRecord__ItemTextRight: {
    textAlign: 'right',
    top: '50%',
    right: 4,
    position: 'absolute',
    transform: 'translateY(-50%)'
  },

  transactionRecord__linearProgress: {
    height: 2
  },

  transactionRecord__success: {
    color: theme.colors.success
  },

  transactionRecord__danger: {
    color: theme.colors.danger
  }
}));

type IOrderItemProps = {};

function OrderItem(props: IOrderItemProps) {
  debug(`render`);
  const classes = useStyles();

  return (
    <List>
      <ListItem button className={classes.transactionRecord__listItem}>
        <ListItemText
          primary="05"
          secondary="02"
          className={classes.transactionRecord__ItemDay}
        />
        {getCoinMemoize('KMD')}
        <ListItemText
          primary="12fj3npPKwTNxUgDMN8XcCDcR2Z4DBehj6"
          secondary="Bob Side"
          className={classes.transactionRecord__ItemText}
        />
      </ListItem>
    </List>
  );
}

OrderItem.defaultProps = {};

OrderItem.displayName = 'OrdersPage__OrderItem';

export default OrderItem;
