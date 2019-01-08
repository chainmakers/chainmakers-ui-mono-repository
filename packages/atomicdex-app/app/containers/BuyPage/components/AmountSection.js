/* eslint-disable react/no-unescaped-entities */
// @flow
import React from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import CloseIcon from '@material-ui/icons/Close';
import { Circle, Line } from '../../../components/placeholder';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { requiredNumber } from '../../../components/Form/helper';
import validate from '../../../components/Form/validate';
import { makeSelectBalanceEntities } from '../../App/selectors';
import getConfig from '../../../utils/config';
import type { BuyCoinPayload } from '../schema';
import { AUTO_HIDE_SNACKBAR_TIME, STATE_SWAPS } from '../constants';
import {
  loadBuyCoin,
  loadRecentSwaps,
  makeANewSwap,
  clearBuyCoinError,
  checkUpdateSwapEvent,
  checkTimeoutEvent,
  openDetailModal
} from '../actions';
import {
  makeSelectPricesLoading,
  makeSelectPricesEntities,
  makeSelectBuyingLoading,
  makeSelectBuyingError,
  makeSelectCurrentSwap
} from '../selectors';
import BuyButton from '../../../components/BuyButton';
import CoinSelectable from './CoinSelectable';

const debug = require('debug')('atomicapp:containers:BuyPage:AmountSection');

const config = getConfig();
const COIN_BASE = config.get('marketmaker.tokenconfig');
const line = (
  <Line
    width={60}
    style={{
      margin: '10px auto'
    }}
  />
);
const circle = <Circle />;

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

export const lessThan = (value: mixed, props: mixed) =>
  new Promise((resolve, reject) => {
    const { balance } = props;
    const n = Number(value);
    const b = Number(balance);
    if (n >= b) {
      return reject(new Error('Value is large than balance'));
    }
    return resolve(true);
  });

const ValidationBaseInput = validate(TextInput, [requiredNumber], {
  onChange: true
});

const ValidationPaymentInput = validate(TextInput, [requiredNumber, lessThan], {
  onChange: true
});

const styles = theme => ({
  amountform__itemCenter: {
    textAlign: 'center'
  },

  amountform__switchBtn: {
    position: 'absolute',
    textAlign: 'center',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25,
    width: 100
  },

  amountform__warning: {
    backgroundColor: '#ffa000',
    color: '#fff',
    borderRadius: 4,
    padding: '6px 24px'
  },

  amountform__button: {
    margin: '0 auto'
  },

  amountform__circularProgress: {
    color: '#fff',
    marginLeft: 5
  },

  amountform__uuidlink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: '1.375em'
  },

  amountform__formItem: {
    margin: '24px 0 24px 0',
    position: 'relative',
    width: '100%'
  },

  amountform__formFirstItem: {
    margin: '0 0 24px 0',
    position: 'relative',
    width: '100%'
  },

  amountform__formEndItem: {
    margin: '24px 0 0 0',
    position: 'relative',
    width: '100%'
  },

  amountform__item: {
    width: '100%'
  },

  amountform__formIcon: {
    width: '1em',
    float: 'left',
    margin: 0
  },

  amountform: {
    width: '50%',
    position: 'relative'
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  paymentCoin: string,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBuyCoin: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwaps: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchMakeANewSwap: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCheckUpdateSwapEvent: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCheckTimeoutEvent: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balance: Object,
  entities: Map<*, *>,
  buyingLoading: boolean,
  // eslint-dis,able-next-line flowtype/no-weak-types
  // buyingError: boolean | Object,
  entity?: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  buyingError: boolean | Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchClearBuyCoinError: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenDetailModal: Function,
  intl: IntlShape
};

type State = {
  disabledBuyButton: boolean,
  openSnackbar: boolean,
  snackbarMessage: string
};

class AmountSection extends React.Component<Props, State> {
  static defaultProps = {
    entity: null
  };

  constructor(props) {
    super(props);

    this.state = {
      disabledBuyButton: true,
      openSnackbar: false,
      snackbarMessage: ''
    };

    this.baseInput = React.createRef();
    this.paymentInput = React.createRef();
  }

  static getDerivedStateFromProps = (props, state) => {
    const { buyingError } = props;
    const { openSnackbar } = state;
    if (openSnackbar === false && buyingError) {
      return {
        openSnackbar: true,
        snackbarMessage: buyingError.message
      };
    }
    if (openSnackbar === true && !buyingError) {
      return {
        openSnackbar: false,
        snackbarMessage: ''
      };
    }
    return null;
  };

  componentDidMount = () => {
    const { dispatchLoadRecentSwaps } = this.props;
    dispatchLoadRecentSwaps();
  };

  // componentDidUpdate(prevProps) {
  componentDidUpdate() {
    const {
      entity,
      dispatchCheckUpdateSwapEvent,
      dispatchCheckTimeoutEvent
    } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    if (
      entity &&
      entity.get('status') === 'pending' &&
      entity.get('sentflags').size === 0
    ) {
      dispatchCheckUpdateSwapEvent();
      dispatchCheckTimeoutEvent();
    }
  }

  closeSnackbar = (evt, reason) => {
    if (reason !== 'clickaway') {
      const { dispatchClearBuyCoinError } = this.props;
      dispatchClearBuyCoinError();
    }
  };

  openSwapDetailModal = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenDetailModal, entity } = this.props;
    dispatchOpenDetailModal(entity.get('uuid'));
  };

  getBestPrice = () => {
    const { entities, paymentCoin } = this.props;
    const c = entities.get(paymentCoin);
    return c.get('bestPrice');
  };

  getBalance = () => {
    const { balance, paymentCoin } = this.props;
    if (!balance || !paymentCoin) return 0;

    const b = balance.get(paymentCoin);
    return b.get('balance');
  };

  controlBuyButton = (state: boolean) => {
    const { disabledBuyButton } = this.state;
    if (disabledBuyButton !== state) {
      this.setState({
        disabledBuyButton: state
      });
    }
  };

  onChangeBaseInput = async () => {
    try {
      debug(`onChangeBaseInput`);
      const baseInput = this.baseInput.current;
      const base = await baseInput.value();
      this.controlBuyButton(false);

      const bestPrice = this.getBestPrice();
      const paymentInput = this.paymentInput.current;
      await paymentInput.setValue(base * bestPrice);
    } catch (err) {
      this.controlBuyButton(true);
      debug(`onChangeBaseInput: ${err.message}`);
    }
  };

  onChangePaymentInput = async () => {
    try {
      debug(`onChangePaymentInput`);
      const paymentInput = this.paymentInput.current;
      const payment = await paymentInput.value();
      this.controlBuyButton(false);

      const bestPrice = this.getBestPrice();
      const baseInput = this.baseInput.current;
      await baseInput.setValue(payment / bestPrice);
    } catch (err) {
      this.controlBuyButton(true);
      debug(`onChangePaymentInput: ${err.message}`);
    }
  };

  onClickBuyCoinButton = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadBuyCoin, paymentCoin } = this.props;
    const baseInput = this.baseInput.current;
    const base = await baseInput.value();

    dispatchLoadBuyCoin({
      basecoin: COIN_BASE.coin,
      paymentcoin: paymentCoin,
      amount: Number(base)
    });
  };

  clickProcessButton = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchMakeANewSwap } = this.props;
    dispatchMakeANewSwap();
  };

  renderSubmitForm = () => {
    const { classes, paymentCoin, buyingLoading, intl } = this.props;
    const { disabledBuyButton } = this.state;
    const disabled = paymentCoin === '';
    let label = intl.formatMessage({
      defaultMessage: 'SELECT YOUR PAYMENT',
      id: 'atomicapp.containers.BuyPage.select_payment'
    });
    if (paymentCoin !== '') {
      label = paymentCoin;
    }

    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.amountform__itemCenter}>
          {/* <form className={classes.withdraw__form}> */}
          <ValidationBaseInput
            label={COIN_BASE.coin}
            id={COIN_BASE.coin}
            type="number"
            disabled={disabled}
            className={classes.amountform__formFirstItem}
            ref={this.baseInput}
            onChange={this.onChangeBaseInput}
          />
          <SwapHorizIcon
            className={ClassNames(
              classes.amountform__formItem,
              classes.amountform__formIcon
            )}
          />
          {paymentCoin && (
            <ValidationPaymentInput
              label={label}
              id={label}
              type="number"
              balance={this.getBalance()}
              disabled={disabled}
              className={classes.amountform__formItem}
              ref={this.paymentInput}
              onChange={this.onChangePaymentInput}
            />
          )}
          {!paymentCoin && (
            <TextField
              label={label}
              id={label}
              type="number"
              variant="outlined"
              disabled={disabled}
              className={classes.amountform__formItem}
              margin="dense"
            />
          )}
          <BuyButton
            disabled={disabledBuyButton || buyingLoading}
            color="primary"
            variant="contained"
            className={classes.amountform__formEndItem}
            onClick={this.onClickBuyCoinButton}
          >
            <FormattedMessage id="atomicapp.containers.BuyPage.execute_buy">
              {(...content) => `${content} (${COIN_BASE.coin})`}
            </FormattedMessage>
          </BuyButton>
          {/* </form> */}
        </Grid>
      </React.Fragment>
    );
  };

  renderConfirmForm = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.amountform__itemCenter}>
          <Typography gutterBottom className={classes.amountform__warning}>
            The swap is running, don't exit the application
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.amountform__itemCenter}>
          <CoinSelectable icon={circle} title="Deposit" subTitle={line} />
        </Grid>
        <Grid item xs={6} className={classes.amountform__itemCenter}>
          <CoinSelectable icon={circle} title="Receive" subTitle={line} />
        </Grid>
        <Grid item xs={12} className={classes.amountform__itemCenter}>
          <Typography variant="body2" gutterBottom>
            Step {0}
            /6: {STATE_SWAPS[0]}
          </Typography>
          <LinearProgress color="primary" variant="determinate" value={0} />
        </Grid>
        <Grid item xs={12} className={classes.amountform__itemCenter}>
          <BuyButton
            disabled
            color="primary"
            variant="contained"
            className={classes.amountform__item}
          >
            <FormattedMessage id="atomicapp.containers.BuyPage.loading">
              {(...content) => content}
            </FormattedMessage>
          </BuyButton>
        </Grid>
      </React.Fragment>
    );
  };

  renderProcessingSwapForm = () => {
    const { classes, entity } = this.props;
    const swapsLoading = entity.get('status') !== 'finished';
    const swapsError = entity.get('error');
    const confirmed = entity.get('sentflags').size > 0;
    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.amountform__itemCenter}>
          <Typography gutterBottom className={classes.amountform__warning}>
            The swap is running, don't exit the application
          </Typography>
        </Grid>

        <Grid item xs={6} className={classes.amountform__itemCenter}>
          <CoinSelectable
            className={classes.amountform__button}
            icon={getCoinIcon(entity.get('alice'))}
            title="Deposit"
            subTitle={
              <span>
                {entity.get('aliceamount')} {entity.get('alice')}
              </span>
            }
          />
        </Grid>
        <SwapHorizIcon className={classes.amountform__switchBtn} />
        <Grid item xs={6} className={classes.amountform__itemCenter}>
          <CoinSelectable
            className={classes.amountform__button}
            icon={getCoinIcon(entity.get('bob'))}
            title="Receive"
            subTitle={
              <span>
                {entity.get('bobamount')} {entity.get('bob')}
              </span>
            }
          />
        </Grid>
        <Grid item xs={12} className={classes.amountform__itemCenter}>
          <Typography variant="body2" gutterBottom>
            Step {entity.get('sentflags').size + 1}
            /6: {STATE_SWAPS[entity.get('sentflags').size]}
          </Typography>
          <LinearProgress
            color="primary"
            variant="determinate"
            value={entity.get('sentflags').size * 20}
          />
        </Grid>
        <Grid item xs={12} className={classes.amountform__itemCenter}>
          <a
            href={`#tx/${entity.get('uuid')}`}
            className={classes.amountform__uuidlink}
            onClick={this.openSwapDetailModal}
          >
            UUID: {entity.get('uuid')}
          </a>
        </Grid>
        <Grid item xs={12} className={classes.amountform__itemCenter}>
          <BuyButton
            disabled={swapsLoading && !confirmed}
            color="primary"
            variant="contained"
            className={classes.amountform__item}
            onClick={this.clickProcessButton}
          >
            {swapsLoading && !confirmed && (
              <React.Fragment>
                Loading...
                <CircularProgress
                  size={20}
                  className={classes.amountform__circularProgress}
                />
              </React.Fragment>
            )}
            {swapsLoading && confirmed && (
              <React.Fragment>
                <FormattedMessage id="atomicapp.containers.BuyPage.swap_successful_message">
                  {(...content) => content}
                </FormattedMessage>
                <CircularProgress
                  size={20}
                  color="secondary"
                  className={classes.amountform__circularProgress}
                />
              </React.Fragment>
            )}
            {!swapsLoading && swapsError && (
              <React.Fragment>Cancel</React.Fragment>
            )}
            {!swapsLoading && !swapsError && (
              <FormattedMessage id="atomicapp.containers.BuyPage.swap_successful_message">
                {(...content) => content}
              </FormattedMessage>
            )}
          </BuyButton>
        </Grid>
      </React.Fragment>
    );
  };

  renderProcessing = () => {
    const { entity } = this.props;
    if (!entity) return this.renderConfirmForm();
    return this.renderProcessingSwapForm();
  };

  render() {
    debug(`render`);
    const { classes, buyingLoading } = this.props;
    const { openSnackbar, snackbarMessage } = this.state;

    return (
      <React.Fragment>
        <Grid container className={classes.amountform} spacing={24}>
          {!buyingLoading && this.renderSubmitForm()}
          {buyingLoading && this.renderProcessing()}
          {/* {this.renderSubmitForm()} */}
        </Grid>
        {/* <Grid
          container
          className={classes.amountform}
          spacing={24}
          style={{
            position: 'relative'
          }}
        >
          {this.renderProcessing()}
        </Grid> */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          open={openSnackbar}
          autoHideDuration={AUTO_HIDE_SNACKBAR_TIME}
          onClose={this.closeSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{snackbarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.closeSnackbar}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </React.Fragment>
    );
  }
}

AmountSection.displayName = 'AmountSection';
// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadBuyCoin: (payload: BuyCoinPayload) =>
      dispatch(loadBuyCoin(payload)),
    dispatchLoadRecentSwaps: () => dispatch(loadRecentSwaps()),
    dispatchMakeANewSwap: () => dispatch(makeANewSwap()),
    dispatchClearBuyCoinError: () => dispatch(clearBuyCoinError()),
    dispatchCheckUpdateSwapEvent: () => dispatch(checkUpdateSwapEvent()),
    dispatchCheckTimeoutEvent: () => dispatch(checkTimeoutEvent()),
    dispatchOpenDetailModal: (uuid: string) => dispatch(openDetailModal(uuid))
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectPricesLoading(),
  entities: makeSelectPricesEntities(),
  balance: makeSelectBalanceEntities(),
  buyingLoading: makeSelectBuyingLoading(),
  buyingError: makeSelectBuyingError(),
  entity: makeSelectCurrentSwap()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  injectIntl,
  withStyles(styles)
)(AmountSection);

/* eslint-enable react/no-unescaped-entities */
