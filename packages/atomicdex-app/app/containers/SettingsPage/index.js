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
import ApplicationDialog from './components/ApplicationDialog';
import MM2Dialog from './components/MM2Dialog';
import SettingsContext from './reducer';

const debug = require('debug')('atomicapp:containers:SettingsPage');

type ISettingsPageProps = {};

type ISettingsPageState = {
  value: number,
  applicationDialog: Object,
  mm2Dialog: Object
};

class SettingsPage extends Component<ISettingsPageProps, ISettingsPageState> {
  state = {
    value: 0,
    applicationDialog: {
      open: false
    },
    mm2Dialog: {
      open: false
    }
  };

  closeApplicationDialog = () => {
    this.setState({
      applicationDialog: {
        open: false
      }
    });
  };

  openApplicationDialog = () => {
    this.setState({
      applicationDialog: {
        open: true
      }
    });
  };

  closeMM2Dialog = () => {
    this.setState({
      mm2Dialog: {
        open: false
      }
    });
  };

  openMM2Dialog = () => {
    this.setState({
      mm2Dialog: {
        open: true
      }
    });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    debug('render');

    const { value, mm2Dialog, applicationDialog } = this.state;

    return (
      <React.Fragment>
        <NavigationLayout>
          <ErrorBoundary>
            <SettingsContext.Provider>
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
                <AboutTab
                  openApplicationDialog={this.openApplicationDialog}
                  openMM2Dialog={this.openMM2Dialog}
                />
              </TabContainer>
              <MM2Dialog
                open={mm2Dialog.open}
                closeDialog={this.closeMM2Dialog}
              />
              <ApplicationDialog
                open={applicationDialog.open}
                closeDialog={this.closeApplicationDialog}
              />
            </SettingsContext.Provider>
          </ErrorBoundary>
        </NavigationLayout>
      </React.Fragment>
    );
  }
}

export default SettingsPage;
