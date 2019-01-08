import { connect } from 'react-redux';
import authWrapper from './auth-wrapper';

const connectedDefaults = {
  authenticatingSelector: () => false,
  allowRedirectBack: false,
  reRunWhenStateChanges: false
};

// const debug = require('debug')('atomicapp:utils:connected-router-redirect');

const connectedRouterRedirect = args => {
  const allArgs = { ...connectedDefaults, ...args };
  const {
    authenticatedSelector,
    authenticatingSelector,
    reRunWhenStateChanges
  } = allArgs;

  return (DecoratedComponent, FailureComponent) =>
    connect(
      (state, ownProps) => ({
        isAuthenticated: authenticatedSelector(state, ownProps),
        isAuthenticating: authenticatingSelector(state, ownProps)
      }),
      null,
      null,
      {
        // https://github.com/reduxjs/react-redux/blob/d769be59dafde13cee509185f1bab385b90dd9e7/docs/api.md#arguments-1
        shouldHandleStateChanges: reRunWhenStateChanges
      }
    )(authWrapper({ ...allArgs, FailureComponent })(DecoratedComponent));
};

export default connectedRouterRedirect;
