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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { LOADING } from '../../../constants';
import getCoinMemoize from '../../../components/CryptoIcons';
import { covertSymbolToName } from '../../../utils/coin';
import {
  makeSelectBalanceFetchStatus,
  makeSelectBalanceErrors
} from '../../App/selectors';
import {
  makeSelectOrderbookDeposit,
  makeSelectOrderbookRecevie
} from '../selectors';
import { openDetailModal, openCancelingOrderModal } from '../actions';

const debug = require('debug')('atomicapp:containers:OrdersPage:Asset');

const styles = theme => ({
  wallet__card: {
    border: '1px solid #dadce0',
    boxShadow: 'none',
    position: 'relative',
    overflow: 'inherit'
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
  },

  root__selected: {
    position: 'absolute',
    top: -12,
    right: -12,
    borderColor: '#fff',
    backgroundColor: '#80BB41',
    color: '#fff',
    borderRadius: 12
  },

  root__orderSelected: {
    // backgroundColor: '#80BB41',
    border: '1px solid #80BB41'
  }
});

type IOrderProps = {
  selected: boolean,
  classes: Styles,
  // eslint-disable-next-line flowtype/no-weak-types
  fetchStatus: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  error: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  data: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenDetailModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenCancelingOrderModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  deposit: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  recevie: Map<*, *>
};

type IOrderState = {
  hover: boolean
};

class Order extends React.PureComponent<IOrderProps, IOrderState> {
  static displayName = 'Order';

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

  onClickDetailButton = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenDetailModal } = this.props;
    dispatchOpenDetailModal();
  };

  onClickCancelButton = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenCancelingOrderModal, data } = this.props;
    dispatchOpenCancelingOrderModal(data.get('id'));
  };

  renderActions = () => {
    const { classes, data, error, fetchStatus, selected } = this.props;
    const loading = fetchStatus === LOADING;
    const symbol = data.get('base');

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
        {/* <Button
          id={`more-detail-button-sellorder-tab-${symbol}`}
          disabled={loading}
          className={ClassNames(
            classes.wallet__button,
            classes.wallet__firstButton
          )}
          size="small"
          color="primary"
          onClick={this.onClickDetailButton}
        >
          More Detail
        </Button> */}
        {selected && (
          <>
            {/* <div className={classes.wallet__buttonBorder} /> */}
            <Button
              id={`cancel-order-button-sellorder-tab-${symbol}`}
              disabled={loading}
              className={ClassNames(
                classes.wallet__button,
                classes.wallet__firstButton
              )}
              size="small"
              color="primary"
              onClick={this.onClickCancelButton}
            >
              Cancel Order
            </Button>
          </>
        )}
      </React.Fragment>
    );
  };

  render() {
    debug(`render`);

    const { classes, error, data, deposit, recevie, selected } = this.props;
    const isError = !!error;
    const symbol = data.get('rel');

    return (
      <Card
        id={`asset-portfolio-tab-${symbol}`}
        className={ClassNames(classes.wallet__card, {
          [classes.wallet__error]: isError,
          [classes.root__orderSelected]: selected
        })}
        onMouseOver={this.toggleHoverOpen}
        onMouseLeave={this.toggleHoverClose}
        onFocus={this.toggleHoverOpen}
        onBlur={this.toggleHoverClose}
      >
        {selected && (
          <CheckCircleOutlineIcon className={classes.root__selected} />
        )}
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
          subheader={data.get('address')}
        />
        <CardContent className={classes.wallet__content}>
          <Typography
            variant="h1"
            className={ClassNames(classes.wallet__balance, {
              [classes.wallet__textWhite]: isError
            })}
          >
            {data.get('maxvolume')} {symbol}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{
              color: 'rgba(0, 0, 0, 0.54)'
            }}
          >
            {data.get('price')} {deposit} = 1 {recevie}
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
    dispatchOpenDetailModal: () => dispatch(openDetailModal()),
    dispatchOpenCancelingOrderModal: (id: string) =>
      dispatch(openCancelingOrderModal(id))
  };
}

const mapStateToProps = createSelector(
  (_, { data }) => data.get('coin'),
  makeSelectBalanceFetchStatus(),
  makeSelectBalanceErrors(),
  makeSelectOrderbookDeposit(),
  makeSelectOrderbookRecevie(),
  (symbol, fetchStatus, errors, deposit, recevie) => ({
    fetchStatus: fetchStatus.get(symbol),
    error: errors.get(symbol),
    deposit,
    recevie
  })
);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Order);
