/* eslint-disable import/no-named-as-default */
// @flow
import React, { Component } from 'react';
// import classNames from 'classnames';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import injectWebsocket from '../../utils/inject-websocket';
import ErrorBoundary from '../../components/ErrorBoundary';
import { TabContainer } from '../../components/Tabs';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import MDCTabBar from '../../components/AppBar/TabBar';
import PageSectionTitle from '../../components/PageSectionTitle';
import { WEBSOCKET_DAEMON } from '../../utils/constants';
import { NavigationLayout } from '../Layout';
import HeaderTabs from './components/HeaderTabs';
import TransactionsTab from './TransactionsTab';
import WithdrawModal from './WithdrawModal';
import DepositModal from './DepositModal';
import PortfolioTab from './PortfolioTab';
import ProgressBar from './ProgressBar';
import reducer from './reducer';
import saga from './saga';
import { APP_STATE_NAME } from './constants';
import subscribe from './subscribe';

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

type State = {
  value: number
};

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
  }
});

const debug = require('debug')('atomicapp:containers:WalletPage');

class WalletPage extends Component<Props, State> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  switchToPortfolioTab = () => {
    this.setState({ value: 0 });
  };

  switchToTransactionsTab = () => {
    this.setState({ value: 1 });
  };

  render() {
    debug(`render`);

    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <ProgressBar />
        <NavigationLayout>
          <ErrorBoundary>
            <MDCAppBar>
              <MDCHeader
                title={
                  <FormattedMessage id="atomicapp.containers.Wallet.title">
                    {(...content) => content}
                  </FormattedMessage>
                }
              />
              <MDCTabBar>
                <HeaderTabs handleChange={this.handleChange} value={value} />
              </MDCTabBar>
            </MDCAppBar>
            <TabContainer selected={value === 0} className={classes.container}>
              <PageSectionTitle
                title={
                  <FormattedMessage id="atomicapp.containers.Wallet.overview">
                    {(...content) => content}
                  </FormattedMessage>
                }
              />
              <PortfolioTab />
            </TabContainer>
            <TabContainer selected={value === 1} className={classes.container}>
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
          </ErrorBoundary>
        </NavigationLayout>
        <WithdrawModal />
        <DepositModal />
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

const WalletPageWapper = compose(
  withReducer,
  withSaga,
  withWebsocket,
  withStyles(styles)
)(WalletPage);

export default WalletPageWapper;
/* eslint-enable import/no-named-as-default */
