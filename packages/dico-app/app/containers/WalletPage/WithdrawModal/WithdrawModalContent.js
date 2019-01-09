// @flow
import React from 'react';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { required, requiredNumber } from '../../../components/Form/helper';
import BuyButton from '../../../components/BuyButton';
import validate from '../../../components/Form/validate';

const debug = require('debug')(
  'dicoapp:containers:WalletPage:WithdrawModalContent'
);

export const lessThan = (
  value: mixed,
  props: {
    balance: string | number,
    fee: string | number
  }
) =>
  new Promise((resolve, reject) => {
    const { balance, fee } = props;
    const n = Number(value);
    const b = Number(balance);
    const f = Number(fee);

    if (n > b - f) {
      return reject(new Error('Value is large than balance'));
    }
    return resolve(true);
  });

export const notSameAddress = (
  value: string,
  props: {
    address: string
  }
) =>
  new Promise((resolve, reject) => {
    const { address } = props;
    if (address.trim() === value.trim()) {
      return reject(new Error('You can not withdraw same address'));
    }
    return resolve(true);
  });

// eslint-disable-next-line react/prop-types
const TextInput = ({ onChange, value, error, isError, ...props }) => (
  <TextField
    {...props}
    variant="outlined"
    error={isError}
    helperText={error}
    value={value}
    onChange={onChange}
    margin="dense"
  />
);

// eslint-disable-next-line no-unused-vars
const ValidationAmountInput = validate(TextInput, [requiredNumber, lessThan], {
  onChange: true
});

// eslint-disable-next-line no-unused-vars
const ValidationAddressInput = validate(TextInput, [required, notSameAddress], {
  onChange: true
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWithdraw: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  coin: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSnackbars: Function
};

const styles = theme => ({
  withdrawmodal__dialogTitle: {},

  withdraw__button: {
    margin: '10px 0 10px 0',
    boxShadow: 'none',
    width: '100%'
  },

  withdraw__formItem: {
    margin: '10px 0 25px 0',
    position: 'relative',
    width: '100%',
    maxWidth: 450
  },

  withdraw__listItem: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  },

  withdraw__warningPlate: {
    textAlign: 'left',
    padding: 12,
    border: `1px dashed ${theme.colors.warning}`,
    borderRadius: 4,
    width: '100%'
  },

  withdraw__listItemSecondaryAction: {
    right: 0,
    top: 24
  },

  withdraw__listItemSecondaryLogo: {
    right: -10
  },

  withdraw__transactionFee: {
    padding: '10px 0',
    width: '100%',
    display: 'flex',
    position: 'relative'
  },

  withdraw__transactionFeeValue: {
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '24px',
    right: 0
  }
});

type State = {
  invaidAmountInput: boolean,
  invaidAddressInput: boolean
};

class WithdrawModalContent extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.amountInput = React.createRef();
    this.addressInput = React.createRef();
    this.state = {
      invaidAmountInput: true,
      invaidAddressInput: true
    };
  }

  getSnapshotBeforeUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    const currData = this.props.coin;
    const prevData = prevProps.coin;
    if (!prevData) {
      return {
        done: false
      };
    }
    const currLoading = currData.get('loading');
    const prevLoading = prevData.get('loading');
    const currError = currData.get('error');
    return {
      done: currLoading === false && prevLoading === true && currError === false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { dispatchOpenSnackbars } = this.props;
    if (snapshot && snapshot.done) {
      // reset input
      const amountInput = this.amountInput.current;
      const addressInput = this.addressInput.current;
      amountInput.reset();
      addressInput.reset();
      dispatchOpenSnackbars('Successful withdrawal');
    }
  }

  controlInvaidAmountInput = (state: boolean) => {
    const { invaidAmountInput } = this.state;
    if (invaidAmountInput !== state) {
      this.setState({
        invaidAmountInput: state
      });
    }
  };

  controlInvaidAddressInput = (state: boolean) => {
    const { invaidAddressInput } = this.state;
    if (invaidAddressInput !== state) {
      this.setState({
        invaidAddressInput: state
      });
    }
  };

  onChangeAddressInput = async () => {
    try {
      const addressInput = this.addressInput.current;
      const address = await addressInput.value();

      debug(`onChangeInput: address=${address}`);
      this.controlInvaidAddressInput(false);
    } catch (err) {
      this.controlInvaidAddressInput(true);
      debug(`onChangeInput: ${err.message}`);
    }
  };

  onChangeAmountInput = async () => {
    try {
      const amountInput = this.amountInput.current;
      const amount = await amountInput.value();

      debug(`onChangeInput: amount=${amount}`);
      this.controlInvaidAmountInput(false);
    } catch (err) {
      this.controlInvaidAmountInput(true);
      debug(`onChangeInput: ${err.message}`);
    }
  };

  onClickAllButton = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    try {
      const { coin } = this.props;
      const amountInput = this.amountInput.current;
      await amountInput.setValue(coin.get('balance') - coin.get('fee'));
      this.controlInvaidAmountInput(false);
    } catch (err) {
      this.controlInvaidAmountInput(true);
      debug(`onClickAllButton: ${err.message}`);
    }
  };

  handleWithdraw = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadWithdraw, coin } = this.props;

    try {
      const addressInput = this.addressInput.current;
      const address = await addressInput.value();

      const amountInput = this.amountInput.current;
      const amount = await amountInput.value();

      dispatchLoadWithdraw({
        amount: Number(amount),
        address,
        coin: coin.get('coin')
      });
    } catch (err) {
      debug(`handleWithdraw ${err.message}`);
    }
  };

  render = () => {
    const { classes, coin } = this.props;
    const { invaidAmountInput, invaidAddressInput } = this.state;
    const loading = coin.get('loading');
    const CIcon = getCoinIcon(coin.get('coin'));

    return (
      <React.Fragment>
        <DialogTitle
          id="withdraw-modal-title"
          className={classes.withdrawmodal__dialogTitle}
        >
          Withdraw
        </DialogTitle>
        <DialogContent>
          <div className={classes.withdraw__warningPlate}>
            <Typography variant="button" gutterBottom>
              Warning
            </Typography>
            <Typography gutterBottom>
              Please verify your withdrawal address. We cannot refund an
              incorrect withdrawal.
            </Typography>
          </div>

          <List>
            <ListItem
              classes={{
                secondaryAction: classes.withdraw__listItem
              }}
            >
              <ListItemText primary="Asset" secondary={coin.get('coin')} />
              <ListItemSecondaryAction
                className={classes.withdraw__listItemSecondaryLogo}
              >
                <IconButton aria-label="coin-icon">{CIcon}</IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              classes={{
                secondaryAction: classes.withdraw__listItem
              }}
            >
              <ListItemText primary="Withdraw from" />
              <ListItemSecondaryAction
                className={classes.withdraw__listItemSecondaryAction}
              >
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {coin.get('address')}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              classes={{
                secondaryAction: classes.withdraw__listItem
              }}
            >
              <ListItemText primary="Available" />
              <ListItemSecondaryAction
                className={classes.withdraw__listItemSecondaryAction}
              >
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {coin.get('balance')} {coin.get('coin')}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <form className={classes.withdraw__form}>
            <ValidationAddressInput
              id="address"
              label="Withdraw to address"
              margin="normal"
              className={classes.withdraw__formItem}
              address={coin.get('address')}
              ref={this.addressInput}
              disabled={loading}
              onChange={this.onChangeAddressInput}
            />

            <ValidationAmountInput
              id="amount"
              label="Amount to withdraw"
              margin="normal"
              balance={coin.get('balance')}
              fee={coin.get('fee')}
              className={classes.withdraw__formItem}
              ref={this.amountInput}
              disabled={loading}
              onChange={this.onChangeAmountInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={this.onClickAllButton}>Max</Button>
                  </InputAdornment>
                )
              }}
            />
            <div className={classes.withdraw__transactionFee}>
              <Typography variant="subtitle1" gutterBottom>
                Transaction Fee
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                gutterBottom
                className={classes.withdraw__transactionFeeValue}
              >
                {coin.get('fee')} {coin.get('coin')}
              </Typography>
            </div>
            <BuyButton
              variant="contained"
              color="primary"
              className={classes.withdraw__button}
              onClick={this.handleWithdraw}
              disabled={
                coin.get('balance') <= 0 ||
                (loading || (invaidAmountInput || invaidAddressInput))
              }
            >
              Withdraw
            </BuyButton>
          </form>
        </DialogContent>
      </React.Fragment>
    );
  };
}
export default withStyles(styles)(WithdrawModalContent);
