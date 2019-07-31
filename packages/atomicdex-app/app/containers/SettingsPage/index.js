// @flow
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import ErrorBoundary from '../../components/ErrorBoundary';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import MDCTabBar from '../../components/AppBar/TabBar';
import { TabContainer } from '../../components/Tabs';
import { NavigationLayout } from '../Layout';
import HeaderTabs from './components/HeaderTabs';
import AboutTab from './components/AboutTab';
import ApplicationDialog from './components/ApplicationDialog';
import MM2Dialog from './components/MM2Dialog';
import SettingsContext, { initialState, reducer } from './reducer';

const debug = require('debug')('atomicapp:containers:SettingsPage');

type ISettingsPageProps = {};

function SettingsPage(props: ISettingsPageProps) {
  // state = {
  //   value: 0,
  //   applicationDialog: {
  //     open: false
  //   },
  //   mm2Dialog: {
  //     open: false
  //   }
  // };

  // closeApplicationDialog = () => {
  //   this.setState({
  //     applicationDialog: {
  //       open: false
  //     }
  //   });
  // };

  // closeMM2Dialog = () => {
  //   this.setState({
  //     mm2Dialog: {
  //       open: false
  //     }
  //   });
  // };

  // handleChange = (event, value) => {
  //   this.setState({ value });
  // };

  // render() {
  debug('render');

  // const { value, mm2Dialog, applicationDialog } = this.state;

  const contextValue = React.useReducer(reducer, initialState);

  return (
    <React.Fragment>
      <NavigationLayout>
        <ErrorBoundary>
          <SettingsContext.Provider value={contextValue}>
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
                    <FormattedMessage id="atomicapp.containers.Settings.title">
                      {(...content) => content}
                    </FormattedMessage>
                  </Typography>
                }
              />
              <MDCTabBar>
                <HeaderTabs
                  // handleChange={this.handleChange}
                  value={0}
                />
              </MDCTabBar>
            </MDCAppBar>
            {/* <TabContainer selected={value === 0}> */}
            <TabContainer selected={0 === 0}>
              <AboutTab />
            </TabContainer>
            <MM2Dialog
              // open={mm2Dialog.open}
              open={false}
              // closeDialog={this.closeMM2Dialog}
            />
            <ApplicationDialog
              // open={applicationDialog.open}
              open={false}
              // closeDialog={this.closeApplicationDialog}
            />
          </SettingsContext.Provider>
        </ErrorBoundary>
      </NavigationLayout>
    </React.Fragment>
  );
}

SettingsPage.defaultProps = {};

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
