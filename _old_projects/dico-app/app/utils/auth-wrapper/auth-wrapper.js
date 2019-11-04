// @flow

import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

const defaults = {
  AuthenticatingComponent: () => null, // dont render anything while authenticating
  FailureComponent: () => null, // dont render anything on failure of the predicate
  wrapperDisplayName: 'AuthWrapper'
};

const debug = require('debug')('dicoapp:utils:auth-wrapper');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  isAuthenticated: boolean,
  isAuthenticating?: boolean
};

export default args => {
  const { AuthenticatingComponent, FailureComponent, wrapperDisplayName } = {
    ...defaults,
    ...args
  };

  // Wraps the component that needs the auth enforcement
  function wrapComponent(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    class UserAuthWrapper extends React.PureComponent<Props> {
      static displayName = `${wrapperDisplayName}(${displayName})`;

      static defaultProps = {
        isAuthenticating: false
      };

      render() {
        debug(`render`);
        const { isAuthenticated, isAuthenticating } = this.props;
        debug(
          `isAuthenticated=${isAuthenticated}, isAuthenticating=${isAuthenticating}`
        );

        if (isAuthenticated) {
          return <DecoratedComponent {...this.props} />;
          // eslint-disable-next-line no-else-return
        } else if (isAuthenticating && AuthenticatingComponent) {
          return <AuthenticatingComponent {...this.props} />;
        }
        return <FailureComponent {...this.props} />;
      }
    }

    return hoistStatics(UserAuthWrapper, DecoratedComponent);
  }

  return wrapComponent;
};
