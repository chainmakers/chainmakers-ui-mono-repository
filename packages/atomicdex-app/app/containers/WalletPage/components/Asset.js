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
import { LOADING } from '../../../constants';
import getCoinMemoize from '../../../components/CryptoIcons';
import { covertSymbolToName } from '../../../utils/coin';
import { openWithdrawModal, openDepositModal, retryAction } from '../actions';
import {
  makeSelectBalanceFetchStatus,
  makeSelectBalanceEntities,
  makeSelectBalanceErrors
} from '../../App/selectors';

const debug = require('debug')('atomicapp:containers:WalletPage:Asset');

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
    backgroundColor: '#ED6A4E',
    border: '1px solid #ED6A4E'
  },

  wallet__textWhite: {
    color: '#fff',
    '&:hover': {
      color: '#fff'
    }
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
  openDeposit: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchRetryAction: Function
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

  onRetryAction = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchRetryAction, symbol } = this.props;
    dispatchRetryAction({
      coin: symbol
    });
  };

  renderActions = () => {
    const { classes, error, fetchStatus } = this.props;
    const loading = fetchStatus === LOADING;

    return error ? (
      <Button
        disabled={loading}
        className={ClassNames(
          classes.wallet__button,
          classes.wallet__firstButton,
          classes.wallet__textWhite
        )}
        size="small"
        color="primary"
        onClick={this.onRetryAction}
      >
        Retry
      </Button>
    ) : (
      <React.Fragment>
        <Button
          disabled={loading}
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
          disabled={loading}
          className={classes.wallet__button}
          size="small"
          color="primary"
          onClick={this.openWithdraw}
        >
          Withdraw
        </Button>
      </React.Fragment>
    );
  };

  render() {
    debug(`render`);

    const { classes, symbol, entity, error } = this.props;
    const isError = !!error;

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
          action={getCoinMemoize(symbol)}
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
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {this.renderActions()}
        </CardActions>
      </Card>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    openWithdraw: (coin: string) => dispatch(openWithdrawModal(coin)),
    openDeposit: (coin: string) => dispatch(openDepositModal(coin)),
    dispatchRetryAction: (coin: string) => dispatch(retryAction(coin))
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
