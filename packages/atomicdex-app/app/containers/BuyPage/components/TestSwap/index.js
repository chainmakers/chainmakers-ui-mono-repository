// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { loadSwapSuccess } from '../../../App/actions';
import { loadBuyCoinSuccess, loadRecentSwapsCoin } from '../../actions';
import {
  SWAP_STATE_ZERO,
  SWAP_STATE_ONE,
  SWAP_STATE_TWO,
  SWAP_STATE_THREE,
  SWAP_STATE_FOUR,
  SWAP_STATE_FIVE,
  LOAD_SWAP_SUCCESS
} from '../../../__tests__/fake-data';

const debug = require('debug')('atomicapp:containers:BuyPage:TestSwap');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBuyCoinSuccess: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinOne: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinTwo: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinThree: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinFour: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadRecentSwapsCoinFive: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadSwapSuccess: Function
};

class TestSwap extends React.PureComponent<Props> {
  static defaultProps = {};

  componentDidMount = () => {
    const {
      dispatchLoadBuyCoinSuccess,
      dispatchLoadRecentSwapsCoinOne,
      dispatchLoadRecentSwapsCoinTwo,
      dispatchLoadRecentSwapsCoinThree,
      dispatchLoadRecentSwapsCoinFour,
      dispatchLoadRecentSwapsCoinFive,
      dispatchLoadSwapSuccess
    } = this.props;

    window.dispatchLoadBuyCoinSuccess = dispatchLoadBuyCoinSuccess;
    window.dispatchLoadRecentSwapsCoinOne = dispatchLoadRecentSwapsCoinOne;
    window.dispatchLoadRecentSwapsCoinTwo = dispatchLoadRecentSwapsCoinTwo;
    window.dispatchLoadRecentSwapsCoinThree = dispatchLoadRecentSwapsCoinThree;
    window.dispatchLoadRecentSwapsCoinFour = dispatchLoadRecentSwapsCoinFour;
    window.dispatchLoadRecentSwapsCoinFive = dispatchLoadRecentSwapsCoinFive;
    window.dispatchLoadSwapSuccess = dispatchLoadSwapSuccess;
  };

  render() {
    debug(`render`);
    return null;
  }
}

TestSwap.displayName = 'TestSwap';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadSwapSuccess: () => dispatch(loadSwapSuccess(LOAD_SWAP_SUCCESS)),
    dispatchLoadBuyCoinSuccess: () =>
      dispatch(
        loadBuyCoinSuccess(
          Object.assign({}, SWAP_STATE_ZERO, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinOne: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_ONE, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinTwo: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_TWO, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinThree: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_THREE, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinFour: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_FOUR, {
            expiration: Date.now() / 1000 + 60
          })
        )
      ),

    dispatchLoadRecentSwapsCoinFive: () =>
      dispatch(
        loadRecentSwapsCoin(
          Object.assign({}, SWAP_STATE_FIVE, {
            expiration: Date.now() / 1000 + 60
          })
        )
      )
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default withConnect(TestSwap);
