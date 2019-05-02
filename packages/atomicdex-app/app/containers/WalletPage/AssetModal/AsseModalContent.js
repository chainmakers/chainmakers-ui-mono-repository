// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { clipboardCopy } from 'barterdex-utilities';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { BuyButton } from 'barterdex-components';
import QRCode from 'qrcode.react';
import getCoinMemoize from '../../../components/CryptoIcons';
import { TabContainer } from '../../../components/Tabs';
import { required, requiredNumber } from '../../../components/Form/helper';
import validate from '../../../components/Form/validate';
import { loadWithdraw, switchTabAssetInfo } from '../actions';
import { INFO_TAB, DEPOSIT_TAB, WITHDRAW_TAB } from '../constants';
import { makeSelectSupportedCoinsEntities } from '../../App/selectors';
import {
  makeSelectBalanceAssetModal,
  makeSelectLoadingAssetModal,
  makeSelectErrorAssetModal,
  makeSelectTabAssetModal
} from '../selectors';
import HeaderTabs from './HeaderTabs';
import { covertSymbolToName } from '../../../utils/coin';
import { openSnackbars } from '../../Snackbars/actions';
import Or from '../components/Or';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:AsseModalContent'
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
const ValidationAddressInput = validate(TextInput, [required], {
  onChange: true
});

const styles = theme => ({
  root__dialogTitle: {
    padding: '20px 24px'
  },

  root__head: {
    position: 'relative',
    boxShadow: 'none'
  },

  root__headContent: {
    padding: '26px 24px 40px',
    display: 'flex'
  },

  root__headIcon: {
    position: 'relative',
    margin: '0 20px 0 0',
    left: 0
  },

  root__headName: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 65,
    justifyContent: 'center'
  },

  root__tabContainer: {
    height: '100%',
    overflowY: 'auto',
    maxHeight: 'calc(90vh - 202px)'
  },

  root__tabInfoButton: {
    margin: `0 ${1.5 * theme.spacing.unit}px`,
    boxShadow: 'none',
    flexGrow: 1
  },

  root__withdrawButton: {
    margin: '10px 0 10px 0',
    boxShadow: 'none',
    width: '100%'
  },

  root__withdrawFormItem: {
    margin: '20px 0 0 0',
    position: 'relative',
    width: '100%',
    maxWidth: 450
  },

  root__listItem: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  },

  root__warningPlate: {
    textAlign: 'left',
    padding: 12,
    border: `1px dashed ${theme.colors.warning}`,
    borderRadius: 4,
    width: '100%'
  },

  root__listItemSecondaryAction: {
    right: 0
  },

  root__listItemSecondaryLogo: {
    right: -10
  },

  root__withdrawTransactionFee: {
    padding: '20px 0 0 0',
    width: '100%',
    display: 'flex',
    position: 'relative'
  },

  root__withdrawTransactionFeeValue: {
    position: 'absolute',
    transform: 'translateY(-50%)',
    top: '34px',
    right: 0
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWithdraw: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  error: Map<*, *>,
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSnackbars: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSwitchTabAssetInfo: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  supportedCoinsEntities: Map<*, *>,
  tab: number
};

type State = {
  invaidAmountInput: boolean,
  invaidAddressInput: boolean
};

class AsseModalContent extends React.PureComponent<Props, State> {
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
    const prevData = prevProps.balance;
    if (!prevData) {
      return {
        done: false
      };
    }
    // eslint-disable-next-line react/destructuring-assignment
    const currLoading = this.props.loading;
    // eslint-disable-next-line react/destructuring-assignment
    const prevLoading = prevProps.loading;
    // eslint-disable-next-line react/destructuring-assignment
    const currError = this.props.error;
    return {
      done: currLoading === false && prevLoading === true && currError === false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot && snapshot.done) {
      // reset input
      const amountInput = this.amountInput.current;
      const addressInput = this.addressInput.current;
      amountInput.reset();
      addressInput.reset();
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
      const { balance } = this.props;
      const amountInput = this.amountInput.current;
      await amountInput.setValue(balance.get('balance') - balance.get('fee'));
      this.controlInvaidAmountInput(false);
    } catch (err) {
      this.controlInvaidAmountInput(true);
      debug(`onClickAllButton: ${err.message}`);
    }
  };

  handleTabsChange = async (evt: SyntheticInputEvent<>, value) => {
    evt.preventDefault();
    const { dispatchSwitchTabAssetInfo } = this.props;
    dispatchSwitchTabAssetInfo(value);
  };

  handleWithdraw = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadWithdraw, balance } = this.props;

    try {
      const addressInput = this.addressInput.current;
      const address = await addressInput.value();
      const amountInput = this.amountInput.current;
      const amount = await amountInput.value();

      dispatchLoadWithdraw({
        amount: Number(amount),
        address,
        coin: balance.get('coin')
      });
    } catch (err) {
      debug(`handleWithdraw ${err.message}`);
    }
  };

  copyAddressToClipboard = async (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { balance, dispatchOpenSnackbars } = this.props;
    const address = balance.get('address');
    clipboardCopy(address);
    dispatchOpenSnackbars('Copied');
    evt.target.focus();
  };

  renderDetailTab = () => {
    const { classes, balance, supportedCoinsEntities } = this.props;
    const CIcon = getCoinMemoize(balance.get('coin'));
    const coinConfiguration = supportedCoinsEntities.get(balance.get('coin'));

    return (
      <DialogContent
        style={{
          paddingTop: 0
        }}
      >
        <List>
          <ListItem
            classes={{
              secondaryAction: classes.root__listItem
            }}
          >
            <ListItemText primary="Asset" secondary={balance.get('coin')} />
            <ListItemSecondaryAction
              className={classes.root__listItemSecondaryLogo}
            >
              <IconButton aria-label="coin-icon">{CIcon}</IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            classes={{
              secondaryAction: classes.root__listItem
            }}
          >
            <ListItemText primary="Address" />
            <ListItemSecondaryAction
              className={classes.root__listItemSecondaryAction}
            >
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {balance.get('address')}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            classes={{
              secondaryAction: classes.root__listItem
            }}
          >
            <ListItemText primary="Balance" />
            <ListItemSecondaryAction
              className={classes.root__listItemSecondaryAction}
            >
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {balance.get('balance')} {balance.get('coin')}
              </Typography>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem
            disableGutters
            classes={{
              secondaryAction: classes.root__listItem
            }}
          >
            <ListItemText primary="Electrums" />
          </ListItem>

          <Typography variant="body1" color="textSecondary" gutterBottom>
            [
            <br />
            {coinConfiguration.get('urls').map(e => (
              <React.Fragment key={e}>
                <span
                  style={{
                    marginLeft: 20
                  }}
                >
                  {e}
                </span>
                <br />
              </React.Fragment>
            ))}
            ]
          </Typography>
        </List>
        <div
          style={{
            display: 'flex'
          }}
        >
          <Button
            color="primary"
            variant="outlined"
            className={classes.root__tabInfoButton}
            style={{
              margin: '0 6px 0 auto'
            }}
          >
            Reload
          </Button>
          <Button
            color="primary"
            variant="outlined"
            className={classes.root__tabInfoButton}
            style={{
              margin: '0 auto 0 6px'
            }}
          >
            Remove
          </Button>
        </div>
      </DialogContent>
    );
  };

  renderDepositTab = () => {
    const { classes, balance } = this.props;
    return (
      <DialogContent>
        <div className={classes.root__warningPlate}>
          <Typography variant="button" gutterBottom>
            Send only {balance.get('coin')} to this deposit address.
          </Typography>
          <Typography gutterBottom>
            Sending tokens or any other currency to this address will result in
            the permanent loss of your deposit.
          </Typography>
        </div>

        <List>
          <ListItem
            classes={{
              secondaryAction: classes.root__listItem
            }}
          >
            <ListItemText
              primary="Address"
              secondary={balance.get('address')}
            />
            <ListItemSecondaryAction
              className={classes.root__listItemSecondaryAction}
            >
              <IconButton
                aria-label="copy-address"
                onClick={this.copyAddressToClipboard}
              >
                <FileCopyIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Or />

        <QRCode value={balance.get('address')} size={150} />
      </DialogContent>
    );
  };

  renderWidthdrawTab = () => {
    const { classes, balance, loading } = this.props;
    const { invaidAmountInput, invaidAddressInput } = this.state;

    return (
      <DialogContent>
        <div className={classes.root__warningPlate}>
          <Typography variant="button" gutterBottom>
            Warning
          </Typography>
          <Typography gutterBottom>
            Please verify your withdrawal address. We cannot refund an incorrect
            withdrawal.
          </Typography>
        </div>

        <ValidationAddressInput
          id="address"
          label="Withdraw to address"
          margin="normal"
          className={classes.root__withdrawFormItem}
          address={balance.get('address')}
          ref={this.addressInput}
          disabled={loading}
          onChange={this.onChangeAddressInput}
        />

        <ValidationAmountInput
          id="amount"
          label="Amount to withdraw"
          margin="normal"
          balance={balance.get('balance')}
          fee={balance.get('fee')}
          className={classes.root__withdrawFormItem}
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
        <div className={classes.root__withdrawTransactionFee}>
          <Typography variant="subtitle1" gutterBottom>
            Transaction Fee
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            gutterBottom
            className={classes.root__withdrawTransactionFeeValue}
          >
            {balance.get('fee')} {balance.get('coin')}
          </Typography>
        </div>
        <BuyButton
          variant="contained"
          color="primary"
          className={classes.root__withdrawButton}
          onClick={this.handleWithdraw}
          disabled={
            balance.get('balance') <= 0 ||
            (loading || (invaidAmountInput || invaidAddressInput))
          }
        >
          Withdraw
        </BuyButton>
      </DialogContent>
    );
  };

  render = () => {
    debug(`render`);
    const { classes, balance, tab } = this.props;
    const CIcon128 = getCoinMemoize(balance.get('coin'), 64, 64);

    return (
      <React.Fragment>
        <DialogTitle
          id="withdraw-modal-title"
          className={classes.root__dialogTitle}
        >
          Asset Information
        </DialogTitle>

        <div className={classes.root__headContent}>
          <div className={classes.root__headIcon}>{CIcon128}</div>
          <div className={classes.root__headName}>
            <Typography variant="h4">
              {covertSymbolToName(balance.get('coin'))}
            </Typography>
            <Typography
              variant="body1"
              style={{
                color: 'rgba(0, 0, 0, 0.54)'
              }}
            >
              {balance.get('balance')} {balance.get('coin')}
            </Typography>
          </div>
        </div>

        <HeaderTabs handleChange={this.handleTabsChange} value={tab} />

        <TabContainer
          selected={tab === INFO_TAB}
          className={classes.root__tabContainer}
        >
          {this.renderDetailTab()}
        </TabContainer>

        <TabContainer
          selected={tab === DEPOSIT_TAB}
          className={classes.root__tabContainer}
          style={{
            textAlign: 'center'
          }}
        >
          {this.renderDepositTab()}
        </TabContainer>

        <TabContainer
          selected={tab === WITHDRAW_TAB}
          className={classes.root__tabContainer}
        >
          {this.renderWidthdrawTab()}
        </TabContainer>
      </React.Fragment>
    );
  };
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadWithdraw: (payload: {
      amount: number,
      address: string,
      coin: string
    }) => dispatch(loadWithdraw(payload)),

    dispatchSwitchTabAssetInfo: (tab: string) =>
      dispatch(switchTabAssetInfo(tab)),

    dispatchOpenSnackbars: (message: string) => dispatch(openSnackbars(message))
  };
}

const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalanceAssetModal(),
  error: makeSelectErrorAssetModal(),
  loading: makeSelectLoadingAssetModal(),
  tab: makeSelectTabAssetModal(),
  supportedCoinsEntities: makeSelectSupportedCoinsEntities()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(AsseModalContent);

// coin: "BEER"
// method: "send_raw_transaction"
// queueid: 0
// tx_hex: "0400008085202f890396401873fc1af4f849125c1fdf0f53b75799f644cc01e0e491830711cfd0e6bd000000006a47304402204cfd3ce79ccc98062425b2e71e224357d29c43c08e8287422b0009f60af1a76a02204bba67f671afffa4c23e1178922f413805386bd2e271799dd96858c82b1812820121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffffd7dbbb6c7d21cc6a69fe862b32f7c445b65e0204f254d6b17b92a3b56763ffad000000006b4830450221008f98951c106a8a0ea7e9e532897aba963baff2141d924853d72fa974b018e49b022070cd2d6229387d2513afbceabcc6c8de48a65c3c57cf4dd685d2c53359692ef80121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffff004e8684090f246b5bee7cc99b824904c36ea3aa9bcb190f1658b1f0e7c5ad3f000000006a473044022032ed534e1864a058247e1072900a66a998f5a8d0d1434b050af5032ae7aaf1280220618a0537d2e19e061d29725a7730a9aa3af695371bc5da5f62aac1d80babe68b0121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffff0297bfc901000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac01000000000000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac00000000000000000000000000000000000000"
// usserpaaa: "3701eda6d8bc3cdf797b1e2a5c8301b82f35379bcb37397f78d2ac4492fedd40"
// {"error":"rpc:286] jsonrpc_client:66] Rpc request JsonRpcRequest { jsonrpc: \"2.0\", id: \"5\", method: \"blockchain.transaction.broadcast\", params: [String(\"0400008085202f890396401873fc1af4f849125c1fdf0f53b75799f644cc01e0e491830711cfd0e6bd000000006a47304402204cfd3ce79ccc98062425b2e71e224357d29c43c08e8287422b0009f60af1a76a02204bba67f671afffa4c23e1178922f413805386bd2e271799dd96858c82b1812820121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffffd7dbbb6c7d21cc6a69fe862b32f7c445b65e0204f254d6b17b92a3b56763ffad000000006b4830450221008f98951c106a8a0ea7e9e532897aba963baff2141d924853d72fa974b018e49b022070cd2d6229387d2513afbceabcc6c8de48a65c3c57cf4dd685d2c53359692ef80121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffff004e8684090f246b5bee7cc99b824904c36ea3aa9bcb190f1658b1f0e7c5ad3f000000006a473044022032ed534e1864a058247e1072900a66a998f5a8d0d1434b050af5032ae7aaf1280220618a0537d2e19e061d29725a7730a9aa3af695371bc5da5f62aac1d80babe68b0121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffff0297bfc901000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac01000000000000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac00000000000000000000000000000000000000\")] } failed with error, response: JsonRpcResponse { jsonrpc: \"2.0\", id: \"5\", result: Null, error: Object({\"code\": Number(1), \"message\": String(\"the transaction was rejected by network rules.\\n\\n64: dust\\n[0400008085202f890396401873fc1af4f849125c1fdf0f53b75799f644cc01e0e491830711cfd0e6bd000000006a47304402204cfd3ce79ccc98062425b2e71e224357d29c43c08e8287422b0009f60af1a76a02204bba67f671afffa4c23e1178922f413805386bd2e271799dd96858c82b1812820121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffffd7dbbb6c7d21cc6a69fe862b32f7c445b65e0204f254d6b17b92a3b56763ffad000000006b4830450221008f98951c106a8a0ea7e9e532897aba963baff2141d924853d72fa974b018e49b022070cd2d6229387d2513afbceabcc6c8de48a65c3c57cf4dd685d2c53359692ef80121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffff004e8684090f246b5bee7cc99b824904c36ea3aa9bcb190f1658b1f0e7c5ad3f000000006a473044022032ed534e1864a058247e1072900a66a998f5a8d0d1434b050af5032ae7aaf1280220618a0537d2e19e061d29725a7730a9aa3af695371bc5da5f62aac1d80babe68b0121027932139a858bb9c65eafdc74fa0798617efc18b81c0c5946c798c7a5a6b95d08ffffffff0297bfc901000000001976a914b1cc1a6fe678e98fda7572a76679363dcfad6a8f88ac01000000000000001976a91475b2fb414f5b06d11f5142316911582f98adc1ec88ac00000000000000000000000000000000000000]\")}) }"}
