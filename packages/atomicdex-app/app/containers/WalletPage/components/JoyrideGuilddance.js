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
  'atomicapp:containers:WalletPage:components:JoyrideGuilddance'
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
          id="#app-bar"
          title="This is the App Bar"
          // onOpen={this.openDepositModal}
          // onClose={this.closeDepositModal}
        >
          <JoyrideBeacon id="#portfolio-tab" goTo={6} />
        </JoyrideStepper>
        <JoyrideStepper
          id="#asset-portfolio-tab-BTC"
          title="This is your BTC asset"
          message="Note: BTC and KMD asset are enabled by default"
        />
        <JoyrideStepper
          id="#asset-portfolio-tab-BTC"
          title={`Click "Deposit" button to deposit your funds`}
          idBeacon="#deposit-button-portfolio-tab-BTC"
        >
          <JoyrideBeacon id="#deposit-button-portfolio-tab-BTC" goTo={6} />
        </JoyrideStepper>
        <JoyrideStepper
          id="#asset-portfolio-tab-BTC"
          title={`Click "Withdraw" button to withdraw your funds`}
          idBeacon="#withdraw-button-portfolio-tab-BTC"
        >
          <JoyrideBeacon id="#withdraw-button-portfolio-tab-BTC" goTo={6} />
        </JoyrideStepper>
        <JoyrideStepper
          id="#asset-portfolio-tab-KMD"
          title="This is your KMD asset"
        />
        <JoyrideStepper
          id="#add-electrum-placeholer"
          title={`Click "plus icon" to add new asset`}
        />
        <JoyrideStepper
          id="#dex-drawer-navigation-layout"
          title={`Click "Swap" to go to DEX page`}
          next={2}
          prev={0}
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
