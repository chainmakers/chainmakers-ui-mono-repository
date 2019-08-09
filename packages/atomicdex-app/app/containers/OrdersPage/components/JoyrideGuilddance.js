// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  JoyrideModal,
  JoyrideStepper
  // JoyrideBeacon
} from '../../../components/JoyrideModal';
import { makeSelectJoyrideOpenState } from '../selectors';
import { closeJoyride } from '../actions';

const debug = require('debug')(
  'atomicapp:containers:OrderPage:components:JoyrideGuilddance'
);

type IJoyrideGuilddanceProps = {
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchCloseJoyride: Function,
  joyrideState: boolean
};

class JoyrideGuilddance extends React.PureComponent<IJoyrideGuilddanceProps> {
  static displayName = 'JoyrideGuilddance';

  render() {
    debug(`render`);
    const { dispatchCloseJoyride, joyrideState } = this.props;

    return (
      <JoyrideModal
        dispatchCloseJoyride={dispatchCloseJoyride}
        joyrideState={joyrideState}
      >
        <JoyrideStepper
          id="#deposit-add-icon-placeorder-orderpage"
          title={`Step 1: Click "plus icon" in Deposit section to select coin that you want to exchange`}
        />
        <JoyrideStepper
          id="#recevie-add-icon-placeorder-orderpage"
          title={`Step 1: Click "plus icon" in Recevie section to select coin that you want to buy`}
        />
        <JoyrideStepper
          id="#place-new-order-button-orderpage"
          title="Step 3: Click here to make a new oder"
          idBeacon="#place-new-order-button-orderpage"
        />
      </JoyrideModal>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchCloseJoyride: () => dispatch(closeJoyride())
  };
}

const mapStateToProps = createStructuredSelector({
  joyrideState: makeSelectJoyrideOpenState()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(JoyrideGuilddance);
