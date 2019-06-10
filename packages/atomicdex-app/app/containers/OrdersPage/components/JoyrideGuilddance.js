// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  JoyrideModal,
  JoyrideStepper,
  JoyrideBeacon
} from '../../../components/JoyrideModal';
import { makeSelectJoyrideOpenState } from '../selectors';
import { closeJoyride } from '../actions';

const debug = require('debug')(
  'atomicapp:containers:DexPage:components:JoyrideGuilddance'
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
        {/* <JoyrideStepper
          id="#asset-portfolio-tab-BTC"
          title="This is your BTC asset"
          message="Note: BTC and KMD asset are enabled by default"
        /> */}
        <JoyrideStepper
          id="#add-icon-placeorder-dexpage"
          title={`Step 1: Click "plus icon" to select coin that you want to buy`}
        />
        <JoyrideStepper
          id="#payment-section-placeorder-dexpage"
          title="Step 2: Select the coin in payment section that you want to exchange"
        />
        <JoyrideStepper
          id="#amount-section-placeorder-dexpage"
          title={`Step 3: Click "plus icon" to select coin that you want to buy`}
        />
        <JoyrideStepper
          id="#wallet-drawer-navigation-layout"
          title={`Click "wallet" to go to WALLET page`}
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
