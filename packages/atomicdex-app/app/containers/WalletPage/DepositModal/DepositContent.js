// @flow
import React from 'react';
import QRCode from 'qrcode.react';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import getCoinMemoize from '../../../components/CryptoIcons';
import Or from '../components/Or';

const styles = theme => ({
  depositModal__content: {
    overflowY: 'hidden',
    textAlign: 'center',
    width: 500
  },

  depositModal__listItem: {
    paddingRight: 0,
    paddingLeft: 0
  },

  depositModal__listItemSecondaryLogo: {
    right: -10
  },

  depositModal__warningPlate: {
    textAlign: 'left',
    padding: 12,
    border: `1px dashed ${theme.colors.warning}`,
    borderRadius: 4,
    width: '100%',
    marginBottom: 20
  },

  depositModal__dialogTitle: {
    padding: '24px 24px 5px'
  }
});

type Props = {
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  coin: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  copyAddressToClipboard: Function
};

class DepositContent extends React.PureComponent<Props> {
  render = () => {
    const { classes, coin, copyAddressToClipboard } = this.props;
    const CIcon = getCoinMemoize(coin.get('coin'));

    return (
      <React.Fragment>
        <DialogTitle
          id="deposit-modal-title"
          className={classes.depositModal__dialogTitle}
        >
          Deposit
        </DialogTitle>
        <DialogContent className={classes.depositModal__content}>
          <List>
            <ListItem
              classes={{
                secondaryAction: classes.depositModal__listItem
              }}
            >
              <ListItemText primary="Asset" secondary={coin.get('coin')} />
              <ListItemSecondaryAction
                className={classes.depositModal__listItemSecondaryLogo}
              >
                <IconButton aria-label="coin-icon">{CIcon}</IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              classes={{
                secondaryAction: classes.depositModal__listItem
              }}
            >
              <ListItemText primary="Address" secondary={coin.get('address')} />
              <ListItemSecondaryAction
                className={classes.depositModal__listItemSecondaryLogo}
              >
                <IconButton
                  aria-label="copy-address"
                  onClick={copyAddressToClipboard}
                >
                  <FileCopyIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <div className={classes.depositModal__warningPlate}>
            <Typography variant="button" gutterBottom>
              Send only {coin.get('coin')} to this deposit address.
            </Typography>
            <Typography gutterBottom>
              Sending tokens or any other currency to this address will result
              in the permanent loss of your deposit.
            </Typography>
          </div>
          <Or />
          <QRCode value={coin.get('address')} size={150} />
        </DialogContent>
      </React.Fragment>
    );
  };
}

export default withStyles(styles)(DepositContent);
