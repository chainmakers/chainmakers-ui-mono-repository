// @flow
import React, { Component } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import { NavigationLayout } from '../Layout';

class SettingsPage extends Component<> {

  render() {

    return (
      <React.Fragment>
        <NavigationLayout>
          <ErrorBoundary>
            <div>SettingsPage</div>
          </ErrorBoundary>
        </NavigationLayout>
      </React.Fragment>
    );
  }
}

export default SettingsPage;