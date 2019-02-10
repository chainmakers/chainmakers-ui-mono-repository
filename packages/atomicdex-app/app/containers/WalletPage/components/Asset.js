// @flow
import React from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { List, Map } from 'immutable';
import { createSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/ErrorOutlined';
import ReplayIcon from '@material-ui/icons/ReplayOutlined';
import { LOADING } from '../../../constants';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { covertSymbolToName } from '../../../utils/coin';
import { openWithdrawModal, openDepositModal } from '../actions';
import {
  makeSelectBalanceFetchStatus,
  makeSelectBalanceEntities,
  makeSelectBalanceErrors
} from '../../App/selectors';

const debug = require('debug')('atomicapp:containers:WalletPage:Asset');

const ErrorIconInstance = (
  <ErrorIcon
    style={{
      color: '#fff'
    }}
  />
);

const ReplayIconInstance = (
  <ReplayIcon
    style={{
      color: '#fff'
    }}
  />
);

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  },

  iconSmall: {
    fontSize: 20
  },

  actions: {
    display: 'flex'
  },

  wallet__headerAction: {
    margin: '0 auto'
  },

  wallet__balance: {
    color: 'rgba(0, 0, 0, 0.74)',
    fontSize: '1.725rem',
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: '0.00735em',
    marginBottom: 0
  },

  wallet__content: {
    paddingTop: 8,
    paddingBottom: 8
  },

  wallet__title: {
    lineHeight: '1.31429em',
    fontSize: '1.3125rem'
  },

  wallet__subheader: {
    lineHeight: '1.31429em'
  },

  wallet__button: {
    boxShadow: 'none',
    color: 'rgba(0, 0, 0, 0.54)',
    fontWeight: 400,
    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: 500
    }
  },

  wallet__card: {
    border: '1px solid #dadce0',
    boxShadow: 'none'
  },

  wallet__buttonBorder: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
    margin: '0px 16px',
    height: '100%',
    minHeight: 20
  },

  wallet__firstButton: {
    marginLeft: 4
  },

  wallet__error: {
    backgroundColor: '#ED6A4E'
  },

  wallet__textWhite: {
    color: '#fff'
  }
});

type IAssetProps = {
  classes: Styles,
  symbol: string,
  // eslint-disable-next-line flowtype/no-weak-types
  fetchStatus: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  entity: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  error: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  openWithdraw: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  openDeposit: Function
};

class Asset extends React.PureComponent<IAssetProps> {
  static displayName = 'Asset';

  openWithdraw = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { openWithdraw, symbol } = this.props;
    openWithdraw(symbol);
  };

  openDeposit = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { openDeposit, symbol } = this.props;
    openDeposit(symbol);
  };

  renderIcon = () => {
    const { symbol, error } = this.props;
    return error ? (
      <IconButton>{ReplayIconInstance}</IconButton>
    ) : (
      getCoinIcon(symbol)
    );
  };

  render() {
    debug(`render`);

    const { classes, symbol, fetchStatus, entity, error } = this.props;
    const isError = !!error;
    const loading = fetchStatus === LOADING;

    return (
      <Card
        className={ClassNames(classes.wallet__card, {
          [classes.wallet__error]: isError
        })}
      >
        <CardHeader
          classes={{
            action: classes.wallet__headerAction,
            title: ClassNames(classes.wallet__title, {
              [classes.wallet__textWhite]: isError
            }),
            subheader: ClassNames(classes.wallet__subheader, {
              [classes.wallet__textWhite]: isError
            })
          }}
          action={this.renderIcon()}
          title={covertSymbolToName(symbol)}
          subheader={symbol}
        />
        <CardContent className={classes.wallet__content}>
          <Typography
            variant="h1"
            className={ClassNames(classes.wallet__balance, {
              [classes.wallet__textWhite]: isError
            })}
          >
            {isError
              ? error.get('message')
              : `${entity.get('balance')} ${symbol}`}
          </Typography>
          {/* <Button
            className={ClassNames(classes.wallet__button)}
            size="small"
            color="primary"
            style={{
              marginLeft: -10
            }}
          >
            UTXOs
          </Button> */}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button
            disabled={isError || loading}
            className={ClassNames(
              classes.wallet__button,
              classes.wallet__firstButton
            )}
            size="small"
            color="primary"
            onClick={this.openDeposit}
          >
            Deposit
          </Button>
          <div className={classes.wallet__buttonBorder} />
          <Button
            disabled={isError || loading}
            className={classes.wallet__button}
            size="small"
            color="primary"
            onClick={this.openWithdraw}
          >
            Withdraw
          </Button>
          {/* <Button
            className={classes.wallet__button}
            size="small"
            color="primary"
            style={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            UTXOS
          </Button> */}
        </CardActions>
      </Card>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    openWithdraw: (coin: string) => dispatch(openWithdrawModal(coin)),
    openDeposit: (coin: string) => dispatch(openDepositModal(coin))
  };
}

const mapStateToProps = createSelector(
  (_, props) => props.symbol,
  makeSelectBalanceFetchStatus(),
  makeSelectBalanceEntities(),
  makeSelectBalanceErrors(),
  (symbol, fetchStatus, entities, errors) => ({
    fetchStatus: fetchStatus.get(symbol),
    entity: entities.get(symbol),
    error: errors.get(symbol)
  })
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Asset);
