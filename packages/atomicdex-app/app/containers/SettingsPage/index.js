// @flow
import React, { Component } from 'react';
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

const debug = require('debug')('atomicapp:containers:SettingsPage');

class SettingsPage extends Component<> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    debug('render');
    const { value } = this.state;

    return (
      <React.Fragment>
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
                    <FormattedMessage id="atomicapp.containers.Settings.title">
                      {(...content) => content}
                    </FormattedMessage>
                  </Typography>
                }
              />
              <MDCTabBar>
                <HeaderTabs handleChange={this.handleChange} value={value} />
              </MDCTabBar>
            </MDCAppBar>
            <TabContainer selected={value === 0}>
              <AboutTab />
            </TabContainer>
          </ErrorBoundary>
        </NavigationLayout>
      </React.Fragment>
    );
  }
}

export default SettingsPage;
