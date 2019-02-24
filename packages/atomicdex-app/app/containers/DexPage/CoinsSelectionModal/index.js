// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { List, Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Circle, Line } from '../../../components/placeholder';
import CoinSelectable from '../components/CoinSelectable';
import {
  makeSelectCoinModal,
  makeSelectPricesLoading,
  makeSelectSearchState,
  makeSelectSearchList
} from '../selectors';
import {
  closeSelectCoinModal,
  clickSelectCoinModal,
  searchSelectCoinModal,
  setupSearchApiForSelectCoinModal
} from '../actions';
import { SEARCH_STATE_READY } from '../constants';
import type { SelectCoinPayload } from '../schema';
import { makeSelectBalanceLoading } from '../../App/selectors';
import ModalContent from './ModalContent';
import InputSearch from './InputSearch';

const debug = require('debug')(
  'atomicapp:containers:DexPage:CoinsSelectionModal'
);

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
  appBar: {
    boxShadow: 'none',
    backgroundColor: theme.appbar.background,
    position: 'relative'
  },
  appBar__divider: {
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
  appBar__search: {
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
    padding: '24px 94px'
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  selectCoinModal: Map<*, *>,
  searchState: string,
  // eslint-disable-next-line flowtype/no-weak-types
  searchList: List<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchClickSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSearchSelectCoinModal: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchSetupSearchApiForSelectCoinModal: Function,
  balanceLoading: boolean,
  priceLoading: boolean
};

type State = {
  show: boolean
};

class CoinsSelectionModal extends React.Component<Props, State> {
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

  handleSelectCoin = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { value } = evt.target;
    const { dispatchClickSelectCoinModal } = this.props;
    dispatchClickSelectCoinModal({
      name: value.name,
      symbol: value.symbol
    });
  };

  handleClose = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchCloseSelectCoinModal } = this.props;
    dispatchCloseSelectCoinModal();
  };

  handleSearchRequest = input => {
    const { dispatchSearchSelectCoinModal } = this.props;
    dispatchSearchSelectCoinModal(input);
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

  render() {
    debug(`render`);
    const {
      classes,
      selectCoinModal,
      priceLoading,
      balanceLoading,
      searchState,
      searchList
    } = this.props;
    const { show } = this.state;

    return (
      <Dialog
        fullScreen
        scroll="paper"
        open={selectCoinModal.get('open')}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        onEntered={this.showContent}
        onExited={this.hideContent}
      >
        <AppBar color="default" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <ArrowBackIcon />
            </IconButton>
            <div className={classes.appBar__search}>
              <InputSearch
                ref={this.input}
                handleSearchRequest={this.handleSearchRequest}
                inputRoot={classes.appBar__inputRoot}
                inputInput={classes.appBar__inputInput}
              />
            </div>
          </Toolbar>
          <Divider className={classes.appBar__divider} />
        </AppBar>
        <DialogContent className={classes.appBar__content}>
          <Grid container spacing={24}>
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
                disabled={priceLoading || balanceLoading}
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
    dispatchCloseSelectCoinModal: () => {
      dispatch(closeSelectCoinModal());
    },
    dispatchClickSelectCoinModal: (coin: SelectCoinPayload) => {
      dispatch(clickSelectCoinModal(coin));
    },
    dispatchSearchSelectCoinModal: (input: string) => {
      dispatch(searchSelectCoinModal(input));
    },
    dispatchSetupSearchApiForSelectCoinModal: () => {
      dispatch(setupSearchApiForSelectCoinModal());
    }
  };
}

const mapStateToProps = createStructuredSelector({
  selectCoinModal: makeSelectCoinModal(),
  searchState: makeSelectSearchState(),
  searchList: makeSelectSearchList(),
  priceLoading: makeSelectPricesLoading(),
  balanceLoading: makeSelectBalanceLoading()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const CoinsSelectionModalWapper = compose(
  withConnect,
  withStyles(styles)
)(CoinsSelectionModal);

export default CoinsSelectionModalWapper;
