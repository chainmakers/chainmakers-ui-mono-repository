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
import Content from './components/Content';
import ApplicationDialog from './components/ApplicationDialog';
import MM2Dialog from './components/MM2Dialog';
import SettingsContext, { initialState, reducer } from './reducer';

const debug = require('debug')('atomicapp:containers:SettingsPage');

type ISettingsPageProps = {};

function SettingsPage(props: ISettingsPageProps) {
  debug('render');

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
                <HeaderTabs />
              </MDCTabBar>
            </MDCAppBar>
            <Content />
            <MM2Dialog />
            <ApplicationDialog />
          </SettingsContext.Provider>
        </ErrorBoundary>
      </NavigationLayout>
    </React.Fragment>
  );
}

SettingsPage.defaultProps = {};

SettingsPage.displayName = 'SettingsPage';

export default SettingsPage;
