// @flow
import React from 'react';

const debug = require('debug')(
  'atomicapp:containers:WalletPage:components:JoyrideModal:JoyrideStepper'
);

type IJoyrideStepperProps = {
  index: number,
  selected: boolean,
  id: string,
  title: string,
  message: string,
  // eslint-disable-next-line flowtype/no-weak-types
  setData: Function
};

class JoyrideStepper extends React.PureComponent<IJoyrideStepperProps> {
  static displayName = 'JoyrideStepper';

  componentDidMount = () => {
    const { setData, index, id, title, idBeacon, message } = this.props;
    setData(index, {
      id,
      title,
      message,
      idBeacon
    });
  };

  componentDidUpdate = () => {};

  render() {
    debug(`render`);
    return null;
  }
}

export default JoyrideStepper;
