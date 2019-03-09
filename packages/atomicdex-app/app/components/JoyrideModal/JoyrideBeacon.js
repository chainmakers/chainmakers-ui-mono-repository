// @flow
import React from 'react';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:components:JoyrideModal:JoyrideBeacon'
);

type IJoyrideStepperProps = {};

class JoyrideBeacon extends React.PureComponent<IJoyrideStepperProps> {
  static displayName = 'JoyrideBeacon';

  componentDidUpdate = () => {};

  componentDidMount = () => {};

  render() {
    debug(`render`);
    console.log(this.props, 'this.props');
    return null;
  }
}

export default JoyrideBeacon;
