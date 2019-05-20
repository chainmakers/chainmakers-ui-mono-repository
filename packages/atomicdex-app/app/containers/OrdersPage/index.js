// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import injectWebsocket from '../../utils/inject-websocket';
import { WEBSOCKET_DAEMON, DAEMON } from '../../utils/constants';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import MDCTabBar from '../../components/AppBar/TabBar';
import ErrorBoundary from '../../components/ErrorBoundary';
import { TabContainer } from '../../components/Tabs';
import { NavigationLayout } from '../Layout';
import HeaderTabs from './components/HeaderTabs';
import JoyrideGuilddance from './components/JoyrideGuilddance';
// import TestSwap from './components/TestSwap';
import MyOrdersTab from './MyOrdersTab';
import PlaceOrderTab from './PlaceOrderTab';
import ProgressBar from './ProgressBar';
import SwapDetailModal from './SwapDetailModal';
import CoinsSelectionModal from './CoinsSelectionModal';
import { APP_STATE_NAME } from './constants';
import { openJoyride } from './actions';
import reducer from './reducer';
import handleTimeoutEvent from './saga/handle-timeout-event';
import handleUpdateSwapEvent from './saga/handle-update-swap-event';
import saga from './saga';
import subscribe from './subscribe';

const debug = require('debug')('atomicapp:containers:DexPage');

type IDexPageProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenJoyride: Function
};

type IDexPageState = {
  value: number
};

class DexPage extends React.Component<IDexPageProps, IDexPageState> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  openJoyride = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchOpenJoyride } = this.props;
    dispatchOpenJoyride();
  };

  render() {
    debug('render');
    const { value } = this.state;

    return (
      <React.Fragment>
        <ProgressBar />
        <SwapDetailModal />
        <JoyrideGuilddance />
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
                    <FormattedMessage id="atomicapp.containers.DexPage.title">
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
            <TabContainer selected={value === 0}>
              <PlaceOrderTab />
            </TabContainer>
            <TabContainer selected={value === 1}>
              <MyOrdersTab />
            </TabContainer>
          </ErrorBoundary>
          {/* <TestSwap /> */}

          <CoinsSelectionModal />
        </NavigationLayout>
      </React.Fragment>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchOpenJoyride: () => dispatch(openJoyride())
  };
}

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withConnect = connect(
  null,
  mapDispatchToProps
);
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withSagaTimeout = injectSaga({
  key: `${APP_STATE_NAME}_timeout`,
  mode: DAEMON,
  saga: handleTimeoutEvent
});
const withSagaUpdateSwap = injectSaga({
  key: `${APP_STATE_NAME}_update_swap`,
  mode: DAEMON,
  saga: handleUpdateSwapEvent
});
const withWebsocket = injectWebsocket({
  key: APP_STATE_NAME,
  mode: WEBSOCKET_DAEMON,
  subscribe
});

export default compose(
  withReducer,
  withConnect,
  withSaga,
  withSagaTimeout,
  withSagaUpdateSwap,
  withWebsocket
)(DexPage);
