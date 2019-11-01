// @flow
import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import isNumber from 'lodash/isNumber';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { floor } from 'barterdex-utilities';
import { requiredNumber } from '../../components/Form/helper';
import validate from '../../components/Form/validate';
import {
  makeSelectBalance,
  makeSelectKomododState,
  makeSelectKomododPubkey
} from '../App/selectors';
import { KOMODOD_STATE_STARTED } from '../App/constants';
import { showLoginDialog } from '../LoginDialog/actions';
import { makeSelectBetHistoryLoading } from './selectors';
import { startKmdiceBetting } from './actions';
import { MAXODDS, MINODDS, MINBET, MAXBET } from './constants';
import type { StartKmdiceBettingPayload } from './schema';

const debug = require('debug')('kmdice:containers:DicePage:Betbox');

// eslint-disable-next-line react/prop-types
const TextInput = ({ onChange, value, error, isError, ...props }) => (
  <TextField
    {...props}
    variant="outlined"
    margin="none"
    error={isError}
    helperText={error}
    value={value}
    onChange={onChange}
  />
);

const smallerThanZero = (value: mixed) =>
  new Promise((resolve, reject) => {
    const n = Number(value);
    if (n < MINODDS) {
      return reject(new Error(`Value must be bigger ${MINODDS}`));
    }
    return resolve(true);
  });

const biggerThanThousand = (value: mixed) =>
  new Promise((resolve, reject) => {
    const n = Number(value);
    if (n > MAXODDS) {
      return reject(new Error(`Value must be smaller ${MAXODDS}`));
    }
    return resolve(true);
  });

const smallerThanMinBet = (value: mixed) =>
  new Promise((resolve, reject) => {
    const n = Number(value);
    if (n < MINBET) {
      return reject(new Error(`Value must be bigger ${MINBET}`));
    }
    return resolve(true);
  });

const biggerThanBalance = (value: mixed, props: mixed) =>
  new Promise((resolve, reject) => {
    const { balance } = props;
    const n = Number(value);
    const b = Number(balance);

    if (n > b) {
      return reject(new Error(`${n} is bigger balance`));
    }
    return resolve(true);
  });

const biggerThanMaxBet = (value: mixed) =>
  new Promise((resolve, reject) => {
    const n = Number(value);
    if (n > MAXBET) {
      return reject(new Error(`Value must be smaller ${MAXBET}`));
    }
    return resolve(true);
  });

const ValidationPlaceNumberToBetInput = validate(
  TextInput,
  [requiredNumber, smallerThanZero, biggerThanThousand],
  {
    onChange: true
  }
);

const ValidationBetAmountInput = validate(
  TextInput,
  [requiredNumber, smallerThanMinBet, biggerThanBalance, biggerThanMaxBet],
  {
    onChange: true
  }
);

const styles = {
  betbox__container: {
    borderRadius: 8,
    padding: 25,
    backgroundColor: '#fff'
  },

  betbox__debugline: {
    // border: '1px solid red'
  },

  betbox__label: {
    lineHeight: 1,
    marginBottom: 10
  },

  betbox__betAmountInput: {
    width: '90%'
  },

  betbox__rowHead: {
    paddingTop: 12,
    minHeight: 105
  },

  betbox__rowCenter: {
    margin: '10px 0 20px',
    borderRadius: 8,
    padding: '15px 0'
    // backgroundColor: '#e8eaed'
  },

  betbox__rowBottom: {
    minHeight: 93
  },

  betbox__number: {
    color: 'rgba(0, 0, 0, 0.74)',
    fontSize: '1.725rem',
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBottom: 0
  },

  betbox__borderLeft: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.1)'
  },

  betbox__textCenter: {
    textAlign: 'center'
  },

  betbox__betButton: {
    boxShadow: 'none',
    padding: '12px 24px',
    marginTop: 23
  },

  betbox__input: {
    position: 'relative',
    padding: '15px 14px'
  },

  betbox__balance: {
    lineHeight: 2,
    width: '100%'
  }
};

type IBetboxProps = {
  classes: Styles,
  komododState: string,
  komododPubkey: null | string,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchStartKmdiceBetting: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchShowLoginDialog: Function,
  balance: number,
  betHistoryLoading: boolean
};

type IBetboxState = {
  numberToBet: number
};

class Betbox extends React.PureComponent<IBetboxProps, IBetboxState> {
  constructor(props) {
    super(props);

    this.betAmountInput = React.createRef();
  }

  state = {
    numberToBet: 1000
  };

  onClickAHaftButton = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();

    const betAmountInput = this.betAmountInput.current;
    const amount = await betAmountInput.value();

    await betAmountInput.setValue(amount / 2);
  };

  onClickADoubleButton = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();

    const betAmountInput = this.betAmountInput.current;
    const amount = await betAmountInput.value();

    await betAmountInput.setValue(amount * 2);
  };

  onClickAMaxButton = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { balance } = this.props;
    const betAmountInput = this.betAmountInput.current;

    await betAmountInput.setValue(balance);
  };

  onChangePlaceNumberToBetInput = async (evt: SyntheticInputEvent<>, value) => {
    evt.preventDefault();
    if (isNumber(parseInt(value)) && value !== '')
      this.setState({
        numberToBet: parseInt(value)
      });
  };

  onCLickRollDice = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();

    const {
      komododPubkey,
      dispatchStartKmdiceBetting,
      dispatchShowLoginDialog
    } = this.props;
    if (komododPubkey) {
      const { numberToBet } = this.state;
      const betAmountInput = this.betAmountInput.current;
      const amount = await betAmountInput.value();
      dispatchStartKmdiceBetting({
        numberToBet,
        amount
      });
    } else {
      dispatchShowLoginDialog();
    }
  };

  render() {
    debug('render');

    const { classes, balance, komododState, betHistoryLoading } = this.props;
    const { numberToBet } = this.state;
    const disabled =
      komododState === KOMODOD_STATE_STARTED || betHistoryLoading;
    return (
      <Grid item lg={7} md={8} sm={12} className={classes.betbox__container}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={7}
            className={classNames(
              classes.betbox__rowHead,
              classes.betbox__debugline
            )}
          >
            <Typography variant="overline" className={classes.betbox__label}>
              BET AMOUNT
            </Typography>
            <ValidationBetAmountInput
              disabled={disabled}
              balance={balance}
              value={MINBET}
              ref={this.betAmountInput}
              className={classes.betbox__betAmountInput}
              inputProps={{
                className: classes.betbox__input
              }}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      disabled={disabled}
                      onClick={this.onClickAHaftButton}
                    >
                      1/2
                    </Button>
                    <Button
                      disabled={disabled}
                      onClick={this.onClickADoubleButton}
                    >
                      2X
                    </Button>
                    <Button
                      disabled={disabled}
                      onClick={this.onClickAMaxButton}
                    >
                      MAX
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid
            item
            xs={5}
            className={classNames(
              classes.betbox__rowHead,
              classes.betbox__debugline
            )}
          >
            <Typography variant="overline" className={classes.betbox__label}>
              PAYOUT ON WIN
            </Typography>
            <TextField
              variant="outlined"
              margin="none"
              disabled
              fullWidth
              value="1000.00"
              inputProps={{
                className: classes.betbox__input
              }}
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">KMDICE</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid
            container
            spacing={0}
            className={classNames(
              classes.betbox__textCenter,
              classes.betbox__rowCenter
            )}
          >
            <Grid item xs={4} className={classes.betbox__debugline}>
              <Typography variant="overline">ROLL NUMBER TO WIN</Typography>
              <Typography variant="h5" className={classes.betbox__number}>
                {numberToBet}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              className={classNames(
                classes.betbox__borderLeft,
                classes.betbox__debugline
              )}
            >
              <Typography variant="overline">PAYOUT</Typography>
              <Typography variant="h5" className={classes.betbox__number}>
                777.0x
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              className={classNames(
                classes.betbox__borderLeft,
                classes.betbox__debugline
              )}
            >
              <Typography variant="overline">WIN CHANCE</Typography>
              <Typography variant="h5" className={classes.betbox__number}>
                1/1000
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            className={classNames(
              classes.betbox__textCenter,
              classes.betbox__rowBottom
            )}
          >
            <Grid item xs={4} className={classes.betbox__debugline}>
              <Typography variant="overline" className={classes.betbox__label}>
                PLACE NUMBER TO BET
              </Typography>
              <ValidationPlaceNumberToBetInput
                disabled={disabled}
                value={1000}
                fullWidth
                inputProps={{
                  className: classes.betbox__input
                }}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={this.onChangePlaceNumberToBetInput}
              />
            </Grid>

            <Grid item xs={4} className={classes.betbox__debugline}>
              <Button
                disabled={disabled}
                variant="contained"
                color="primary"
                size="large"
                classes={{
                  root: classes.betbox__betButton
                }}
                onClick={this.onCLickRollDice}
              >
                ROLL DICE
              </Button>
            </Grid>

            <Grid item xs={4} className={classes.betbox__debugline}>
              <Typography variant="overline" className={classes.betbox__label}>
                Balance
              </Typography>
              <Typography
                variant="h5"
                className={classNames(
                  classes.betbox__balance,
                  classes.betbox__number
                )}
              >
                {floor(balance, 8)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchStartKmdiceBetting: (payload: StartKmdiceBettingPayload) =>
      dispatch(startKmdiceBetting(payload)),

    dispatchShowLoginDialog: () => dispatch(showLoginDialog())
  };
}

const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalance(),
  komododState: makeSelectKomododState(),
  komododPubkey: makeSelectKomododPubkey(),
  betHistoryLoading: makeSelectBetHistoryLoading()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Betbox);
