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
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import RemoveIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import { LOADING } from '../../../constants';
import getCoinMemoize from '../../../components/CryptoIcons';
import { covertSymbolToName } from '../../../utils/coin';
import {
  makeSelectBalanceFetchStatus,
  makeSelectBalanceEntities,
  makeSelectBalanceErrors
} from '../../App/selectors';

const debug = require('debug')('atomicapp:containers:OrdersPage:Asset');

const styles = theme => ({
  wallet__card: {
    border: '1px solid #dadce0',
    boxShadow: 'none'
  },

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
  },

  wallet__removeAction: {
    opacity: 0,
    transition: 'opacity .218s ease-in',
    visibility: 'hidden'
  },

  wallet__removeActionHover: {
    color: 'rgba(0, 0, 0, 0.54)',
    opacity: 0.71
  },

  wallet__removeActionReady: {
    visibility: 'visible'
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
  error: Map<*, *>
};

type IAssetState = {
  hover: boolean
};

class Asset extends React.PureComponent<IAssetProps, IAssetState> {
  static displayName = 'Asset';

  state = {
    hover: false
  };

  toggleHoverOpen = () => {
    const { hover } = this.state;
    if (!hover) this.setState({ hover: true });
  };

  toggleHoverClose = () => {
    const { hover } = this.state;
    if (hover) this.setState({ hover: false });
  };

  renderActions = () => {
    const { classes, symbol, error, fetchStatus } = this.props;
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
      >
        Retry
      </Button>
    ) : (
      <React.Fragment>
        <Button
          id={`deposit-button-portfolio-tab-${symbol}`}
          disabled={loading}
          className={ClassNames(
            classes.wallet__button,
            classes.wallet__firstButton
          )}
          size="small"
          color="primary"
        >
          More Detail
        </Button>
        {/* <div className={classes.wallet__buttonBorder} />
        <Button
          id={`withdraw-button-portfolio-tab-${symbol}`}
          disabled={loading}
          className={classes.wallet__button}
          size="small"
          color="primary"
        >
          Withdraw
        </Button> */}
      </React.Fragment>
    );
  };

  render() {
    debug(`render`);

    const { classes, symbol, entity, error, fetchStatus } = this.props;
    const { hover } = this.state;
    const isError = !!error;
    const loading = fetchStatus === LOADING;

    return (
      <Card
        id={`asset-portfolio-tab-${symbol}`}
        className={ClassNames(classes.wallet__card, {
          [classes.wallet__error]: isError
        })}
        onMouseOver={this.toggleHoverOpen}
        onMouseLeave={this.toggleHoverClose}
        onFocus={this.toggleHoverOpen}
        onBlur={this.toggleHoverClose}
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
          action={getCoinMemoize(symbol, 40, 40)}
          title={covertSymbolToName(symbol)}
          subheader={"RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu"}
        />
        <CardContent className={classes.wallet__content}>
          <Typography
            variant="h1"
            className={ClassNames(classes.wallet__balance, {
              [classes.wallet__textWhite]: isError
            })}
          >
            9.16905623 {symbol}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{
              color: 'rgba(0, 0, 0, 0.54)'
            }}
          >
            1.10000002 PIZZA = 1 BEER
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
  return {};
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


// "coin": "PIZZA",
// 		"address": "RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu",
// 		"price": 1.10000002,
// 		"numutxos": 0,
// 		"avevolume": 0,
// 		"maxvolume": 9.16905623,
// 		"depth": 0,
// 		"pubkey": "c88a033b587244cd501e90709620c3ec58d9c3886e33c2e1db909d0451aa5833",
// 		"age": 5,
// 		"zcredits": 0