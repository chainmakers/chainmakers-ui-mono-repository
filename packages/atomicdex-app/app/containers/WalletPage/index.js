/* eslint-disable import/no-named-as-default */
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import injectWebsocket from '../../utils/inject-websocket';
import ErrorBoundary from '../../components/ErrorBoundary';
import { TabContainer } from '../../components/Tabs';
import Placeholder from '../../components/placeholder';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import MDCTabBar from '../../components/AppBar/TabBar';
import PageSectionTitle from '../../components/PageSectionTitle';
import { WEBSOCKET_DAEMON } from '../../utils/constants';
import { makeSelectGlobalLoadedDataFromDB } from '../App/selectors';
import { loadDataFromDB, loadElectrums } from '../App/actions';
import { NavigationLayout } from '../Layout';
import HeaderTabs from './components/HeaderTabs';
import JoyrideGuilddance from './components/JoyrideGuilddance';
import { openJoyride } from './actions';
import TransactionsTab from './TransactionsTab';
import RemovingElectrumModal from './RemovingElectrumModal';
import AssetModal from './AssetModal';
import PortfolioTab from './PortfolioTab';
import ProgressBar from './ProgressBar';
import reducer from './reducer';
import saga from './saga';
import subscribe from './subscribe';
import { APP_STATE_NAME } from './constants';

const debug = require('debug')('atomicapp:containers:WalletPage');

// const styles = theme => ({
const styles = () => ({
  container: {
    // marginTop: 65,
    marginTop: 112,
    padding: '40px 24px 24px 24px',
    flexGrow: 1
  },

  containerSection: {
    paddingBottom: 25
  },

  placeholder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-100px',
    width: '200px',
    textAlign: 'center'
  }
});

type IWalletPageProps = {
  globalLoadedDataFromDB: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadDataFromDB: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadElectrums: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenJoyride: Function
};

type IWalletPageState = {
  value: number
};

class WalletPage extends React.PureComponent<
  IWalletPageProps,
  IWalletPageState
> {
  state = {
    value: 0
  };

  componentDidMount = () => {
    const {
      globalLoadedDataFromDB,
      dispatchLoadDataFromDB,
      dispatchLoadElectrums
    } = this.props;
    if (!globalLoadedDataFromDB) dispatchLoadDataFromDB();
    else {
      dispatchLoadElectrums();
    }
  };

  componentDidUpdate(prevProps) {
    const { dispatchLoadElectrums, globalLoadedDataFromDB } = this.props;
    if (
      prevProps.globalLoadedDataFromDB === false &&
      globalLoadedDataFromDB === true
    ) {
      dispatchLoadElectrums();
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  switchToPortfolioTab = () => {
    this.setState({ value: 0 });
  };

  switchToTransactionsTab = () => {
    this.setState({ value: 1 });
  };

  openJoyride = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenJoyride } = this.props;
    dispatchOpenJoyride();
  };

  render() {
    debug(`render`);

    const { classes, globalLoadedDataFromDB } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <ProgressBar />
        <NavigationLayout>
          <ErrorBoundary>
            <MDCAppBar>
              <MDCHeader
                title={
                  <Typography
                    style={{
                      flexGrow: 1
                    }}
                    variant="h6"
                    color="inherit"
                  >
                    <FormattedMessage id="atomicapp.containers.Wallet.title">
                      {(...content) => content}
                    </FormattedMessage>
                  </Typography>
                }
              >
                <IconButton
                  color="primary"
                  component="span"
                  onClick={this.openJoyride}
                >
                  <HelpOutlineIcon />
                </IconButton>
              </MDCHeader>
              <MDCTabBar>
                <HeaderTabs handleChange={this.handleChange} value={value} />
              </MDCTabBar>
            </MDCAppBar>
            <Placeholder
              ready={globalLoadedDataFromDB}
              placeholder={
                <div className={classes.placeholder}>
                  <Typography variant="overline" gutterBottom>
                    LOADING DATA FROM DB
                  </Typography>
                  <LinearProgress />
                </div>
              }
            >
              <TabContainer
                selected={value === 0}
                className={classes.container}
              >
                <PageSectionTitle
                  title={
                    <FormattedMessage id="atomicapp.containers.Wallet.overview">
                      {(...content) => content}
                    </FormattedMessage>
                  }
                />
                <PortfolioTab />
              </TabContainer>
              <TabContainer
                selected={value === 1}
                className={classes.container}
              >
                <PageSectionTitle
                  title={
                    <FormattedMessage id="atomicapp.containers.Wallet.last_transactions">
                      {(...content) => content}
                    </FormattedMessage>
                  }
                />
                <TransactionsTab
                  switchToPortfolioTab={this.switchToPortfolioTab}
                />
              </TabContainer>
            </Placeholder>
          </ErrorBoundary>
        </NavigationLayout>
        <AssetModal />
        <RemovingElectrumModal />
        <JoyrideGuilddance />
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

const withWebsocket = injectWebsocket({
  key: APP_STATE_NAME,
  mode: WEBSOCKET_DAEMON,
  subscribe
});

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchOpenJoyride: () => dispatch(openJoyride()),
    dispatchLoadDataFromDB: () => dispatch(loadDataFromDB()),
    dispatchLoadElectrums: () => dispatch(loadElectrums())
  };
}

const mapStateToProps = createStructuredSelector({
  globalLoadedDataFromDB: makeSelectGlobalLoadedDataFromDB()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withWebsocket,
  withStyles(styles)
)(WalletPage);
/* eslint-enable import/no-named-as-default */
