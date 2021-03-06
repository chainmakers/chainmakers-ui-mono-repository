// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import { Circle, Line } from '../../components/placeholder';
import CoinSelectable from '../../components/CoinSelectable';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import { makeSelectBalanceLoading } from '../App/selectors';
import InputSearch from './components/InputSearch';
import ModalContent from './components/ModalContent';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSearchState, makeSelectSearchList } from './selectors';
import { APP_STATE_NAME, SEARCH_STATE_READY } from './constants';
import {
  setupSearchApiForSelectCoinModal,
  searchSelectCoinModal
} from './actions';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const debug = require('debug')('atomicapp:containers:CoinsSelectionDialog');

const circle = <Circle />;

const line = (
  <Line
    width={60}
    style={{
      margin: '10px auto'
    }}
  />
);

const styles = theme => ({
  root__appBar: {
    boxShadow: 'none',
    backgroundColor: theme.appbar.background,
    position: 'relative'
  },

  root_appBarDivider: {
    bottom: -5,
    boxShadow: 'inset 0px 4px 8px -3px rgba(17, 17, 17, .06)',
    height: 5,
    left: 0,
    opacity: 1,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    backgroundColor: 'transparent'
  },

  root__appBarSearch: {
    flex: 1,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: 68,
      width: 'auto'
    }
  },

  appBar__inputRoot: {
    color: 'inherit',
    width: '100%',
    height: 48,
    margin: '12px 0'
  },

  appBar__inputInput: {
    padding: `${theme.spacing.unit}px 0px`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
    '&:before': {
      borderBottom: 'none !important'
    },
    '&:after': {
      bottom: -12
    }
  },

  appBar__button: {
    width: '100%',
    height: '100%',
    minHeight: 152,
    '&:hover': {
      borderColor: '#80BB41'
    }
  },

  appBar__content: {
    padding: '32px 94px'
  }
});

type ICoinsSelectionModalProps = {
  open: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSetupSearchApiForSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onSelect: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSearchSelectCoinModal: Function
};

type ICoinsSelectionModalState = {
  show: boolean
};

class CoinsSelectionModal extends React.PureComponent<
  ICoinsSelectionModalProps,
  ICoinsSelectionModalState
> {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.input = React.createRef();
  }

  componentDidMount = () => {
    const { dispatchSetupSearchApiForSelectCoinModal } = this.props;
    dispatchSetupSearchApiForSelectCoinModal();
  };

  showContent = () => {
    this.setState({
      show: true
    });
  };

  hideContent = () => {
    this.setState({
      show: false
    });
  };

  handleSelectCoin = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;

    const { onSelect } = this.props;

    onSelect({
      name: value.name,
      symbol: value.symbol
    });

    this.onClose();
  };

  handleSearchRequest = input => {
    const { dispatchSearchSelectCoinModal } = this.props;
    dispatchSearchSelectCoinModal(input);
  };

  onClose = () => {
    const { onClose, dispatchSearchSelectCoinModal } = this.props;
    onClose();
    setTimeout(() => {
      dispatchSearchSelectCoinModal('');
    }, 350);
  };

  render() {
    debug(`render`);

    const {
      open,
      classes,
      searchState,
      searchList,
      balanceLoading
    } = this.props;
    const { show } = this.state;

    return (
      <Dialog
        fullScreen
        scroll="paper"
        open={open}
        onClose={this.onClose}
        TransitionComponent={Transition}
        onEntered={this.showContent}
        onExited={this.hideContent}
      >
        <AppBar color="default" className={classes.root__appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.onClose}
              aria-label="Close"
            >
              <ArrowBackIcon />
            </IconButton>
            <div className={classes.root__appBarSearch}>
              <InputSearch
                ref={this.input}
                handleSearchRequest={this.handleSearchRequest}
                inputRoot={classes.appBar__inputRoot}
                inputInput={classes.appBar__inputInput}
              />
            </div>
          </Toolbar>
          <Divider className={classes.root_appBarDivider} />
        </AppBar>
        <DialogContent className={classes.appBar__content}>
          <Typography variant="overline" gutterBottom>
            COINS
          </Typography>
          <br />
          <br />
          <Grid container spacing={3}>
            {!show || searchState !== SEARCH_STATE_READY ? (
              <React.Fragment>
                <Grid item xs={3}>
                  <CoinSelectable
                    className={classes.appBar__button}
                    icon={circle}
                    subTitle={line}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CoinSelectable
                    className={classes.appBar__button}
                    icon={circle}
                    subTitle={line}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CoinSelectable
                    className={classes.appBar__button}
                    icon={circle}
                    subTitle={line}
                  />
                </Grid>
                <Grid item xs={3}>
                  <CoinSelectable
                    className={classes.appBar__button}
                    icon={circle}
                    subTitle={line}
                  />
                </Grid>
              </React.Fragment>
            ) : (
              <ModalContent
                data={searchList.toJS()}
                disabled={balanceLoading}
                // disabled={priceLoading || balanceLoading}
                className={classes.appBar__button}
                handleSelectCoin={this.handleSelectCoin}
              />
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchSetupSearchApiForSelectCoinModal: () => {
      dispatch(setupSearchApiForSelectCoinModal());
    },
    dispatchSearchSelectCoinModal: (input: string) => {
      dispatch(searchSelectCoinModal(input));
    }
  };
}

const mapStateToProps = createStructuredSelector({
  searchState: makeSelectSearchState(),
  searchList: makeSelectSearchList(),
  // priceLoading: makeSelectPricesLoading(),
  balanceLoading: makeSelectBalanceLoading()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });

const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
  withStyles(styles)
)(CoinsSelectionModal);
