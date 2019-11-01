import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getInjectors from './websocket-injectors';

const debug = require('debug')('atomicapp:utils:inject-websocket');

export default ({ key, subscribe, mode }) => WrappedComponent => {
  class InjectWebsocket extends React.PureComponent {
    static WrappedComponent = WrappedComponent;

    static displayName = `withWebsocket(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    static contextTypes = {
      // eslint-disable-next-line react/forbid-prop-types
      store: PropTypes.object.isRequired
    };

    componentWillMount() {
      const { injectWebsocket } = this.injectors;

      debug(`injectWebsocket ${key}`);
      injectWebsocket(key, { subscribe, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectWebsocket } = this.injectors;

      debug(`ejectWebsocket ${key}`);
      ejectWebsocket(key);
    }

    // eslint-disable-next-line react/destructuring-assignment
    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectWebsocket, WrappedComponent);
};
