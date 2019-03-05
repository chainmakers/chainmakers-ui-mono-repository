// @flow
import React from 'react';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:components:JoyrideModal:JoyrideStepper'
);

type IJoyrideStepperProps = {};

class JoyrideStepper extends React.PureComponent<IJoyrideStepperProps> {
  static displayName = 'JoyrideStepper';

  render() {
    debug(`render`);
    return 'JoyrideStepper';
  }
}

export default JoyrideStepper;
