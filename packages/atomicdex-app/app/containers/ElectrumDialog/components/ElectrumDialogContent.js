// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Chip from '@material-ui/core/Chip';
import { Circle, Line } from '../../../components/placeholder';
import injectReducer from '../../../utils/inject-reducer';
import search from '../../../utils/search';
import { FAILED, LOADED, SELECTED, UNSELECTED } from '../../../constants';
import { makeSelectBalanceFetchStatus } from '../../App/selectors';
import reducer from '../reducer';
import { hideElectrumDialog, addElectrum, removeElectrum } from '../actions';
import { APP_STATE_NAME } from '../constants';
import CryptoCurrencyChip from './CryptoCurrencyChip';
import InputSearch from './InputSearch';

const debug = require('debug')('atomicapp:containers:ElectrumDialog');

const styles = theme => ({
  electrumDialog__appBar: {
    boxShadow: 'none',
    backgroundColor: theme.appbar.background,
    position: 'relative'
  },
  electrumDialog__search: {
    flex: 1,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 6,
      marginRight: theme.spacing.unit * 6,
      width: 'auto'
    }
  },

  electrumDialog__inputRoot: {
    color: 'inherit',
    width: '100%',
    height: 48,
    margin: '12px 0'
  },

  electrumDialog__inputInput: {
    padding: `${theme.spacing.unit}px 0px`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
    '&:before': {
      borderBottom: 'none !important',
      bottom: -12
    },
    '&:after': {
      bottom: -12
    }
  },

  electrumDialog__inputHTMLInput: {
    textAlign: 'center'
  },

  electrumDialog__content: {
    padding: theme.spacing.unit * 3
  },

  electrumDialog__textSupportedCoins: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  }
});

const circle = (
  <Circle
    style={{
      width: 32,
      height: 32
    }}
  />
);

const line = (
  <Line
    width={60}
    style={{
      margin: '10px auto'
    }}
  />
);

const chipPreloader = (
  <Chip
    clickable
    icon={circle}
    label={line}
    style={{
      margin: 8,
      borderRadius: 32,
      height: 40
    }}
    variant="outlined"
  />
);

type ILogoutDialogProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchHideElectrumDialog: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchAddElectrum: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchRemoveElectrum: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  balanceFetchStatus: Map<*, *>,
  show: boolean
};

type ILogoutDialogState = {
  // eslint-disable-next-line flowtype/no-weak-types
  input: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  selected: Map<*, *>
};

class ElectrumDialogContent extends React.Component<
  ILogoutDialogProps,
  ILogoutDialogState
> {
  constructor(props) {
    super(props);

    this.state = {
      input: search(''),
      selected: props.balanceFetchStatus
    };
  }

  handleSearchRequest = input => {
    const data = search(input);
    this.setState({
      input: data
    });
  };

  onCancelElectrumDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchHideElectrumDialog } = this.props;
    dispatchHideElectrumDialog();
  };

  onAgreeLogoutDialog = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const {
      dispatchHideElectrumDialog,
      dispatchAddElectrum,
      dispatchRemoveElectrum,
      balanceFetchStatus
    } = this.props;
    const { selected } = this.state;
    if (selected !== balanceFetchStatus) {
      const list = selected
        .filter(e => e === SELECTED)
        .keySeq()
        .toArray();
      const unselectedlist = selected
        .filter(e => e === UNSELECTED)
        .keySeq()
        .toArray();
      dispatchAddElectrum(list);
      dispatchRemoveElectrum(unselectedlist);
    }
    dispatchHideElectrumDialog();
  };

  onClickCryptoCurrency = (coin: string) => {
    let { selected } = this.state;
    const { balanceFetchStatus } = this.props;
    const valueS = selected.get(coin);
    const valueP = balanceFetchStatus.get(coin);
    if (valueS === LOADED || valueS === SELECTED) {
      // unselect
      if (valueP === FAILED) {
        selected = selected.set(coin, FAILED);
      } else selected = selected.set(coin, UNSELECTED);
    } else if (valueP === LOADED) selected = selected.set(coin, LOADED);
    // select
    else selected = selected.set(coin, SELECTED);
    this.setState({
      selected
    });
  };

  render() {
    debug('render');
    const { classes, show, balanceFetchStatus } = this.props;
    const { input, selected } = this.state;

    return (
      <React.Fragment>
        <AppBar color="default" className={classes.electrumDialog__appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.onCancelElectrumDialog}
              aria-label="Close"
            >
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.electrumDialog__content}>
          <div className={classes.electrumDialog__search}>
            <InputSearch
              ref={this.input}
              handleSearchRequest={this.handleSearchRequest}
              inputRoot={classes.electrumDialog__inputRoot}
              inputInput={classes.electrumDialog__inputInput}
              inputHTMLInput={classes.electrumDialog__inputHTMLInput}
            />
          </div>
          <br />
          <br />
          <Typography
            variant="overline"
            gutterBottom
            className={classes.electrumDialog__textSupportedCoins}
          >
            SUPPORTED COINS
          </Typography>
          {!show && chipPreloader}
          {!show && chipPreloader}
          {!show && chipPreloader}
          {show &&
            input.map(value => (
              <CryptoCurrencyChip
                key={`crypto_currency_chip_${value.coin}`}
                onClick={this.onClickCryptoCurrency}
                selected={
                  selected.get(value.coin) === LOADED ||
                  selected.get(value.coin) === SELECTED
                }
                data={value}
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCancelElectrumDialog} color="primary">
            <FormattedMessage id="atomicapp.containers.LogoutDialog.cancel">
              {(...content) => content}
            </FormattedMessage>
          </Button>
          <Button
            onClick={this.onAgreeLogoutDialog}
            disabled={selected.equals(balanceFetchStatus)}
            autoFocus
            color="primary"
            variant="contained"
            style={{
              boxShadow: 'none',
              marginLeft: 20,
              minWidth: 100
            }}
          >
            <FormattedMessage id="atomicapp.containers.LogoutDialog.submit">
              {(...content) => content}
            </FormattedMessage>
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchHideElectrumDialog: () => dispatch(hideElectrumDialog()),
    dispatchAddElectrum: (coins: Array<string>) =>
      dispatch(
        addElectrum({
          coins
        })
      ),
    dispatchRemoveElectrum: (coins: Array<string>) =>
      dispatch(
        removeElectrum({
          coins
        })
      )
  };
}

const mapStateToProps = createStructuredSelector({
  balanceFetchStatus: makeSelectBalanceFetchStatus()
});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withConnect,
  withStyles(styles)
)(ElectrumDialogContent);
